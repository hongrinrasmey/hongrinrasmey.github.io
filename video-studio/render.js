// Renders one promo video from a real recording + a storyboard file (video-studio/README.md).
//   node video-studio/render.js video-studio/rieltrack.json                 -> assets/videos/rieltrack-promo.mp4 + -promo-poster.webp
//   ... --out test.mp4 [--from 3 --to 9]     test render (never touches assets/videos)
//   ... --stills 1.5,8,12 [--dir folder]     PNG stills at those seconds (QA)
//   ... --sheet 1 [--dir folder]             one contact sheet, a small frame every N seconds (QA)
//   ... --poster-only                        only the poster
//   ... --preview                            opens a window with a scrub bar (play / drag)
// Needs ffmpeg on PATH and Playwright 1.49.1 (npm i playwright@1.49.1 in any folder OUTSIDE the website,
// then set NODE_PATH to that folder's node_modules).
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync, spawn } = require('child_process');
const { chromium } = require('playwright');

const FPS = 30;
const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2), cfgPath = path.resolve(args[0]);
const opt = k => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : null; };
const has = k => args.includes('--' + k);
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));

// 1. recorded frames at a constant 30 fps, full size, extracted once (screenrecord files have a variable rate)
const raw = path.join(root, cfg.raw);
const work = path.join(os.tmpdir(), 'promo-frames', path.basename(raw, '.mp4'));
if (!fs.existsSync(path.join(work, 'done'))) {
  fs.mkdirSync(work, { recursive: true });
  console.log('extracting frames ->', work);
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', `fps=${FPS}`, '-q:v', '2', path.join(work, 'f_%05d.jpg')], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('frame extraction failed');
  fs.writeFileSync(path.join(work, 'done'), '');
}
cfg.frames = 'file:///' + work.replace(/\\/g, '/');
cfg.nFrames = fs.readdirSync(work).filter(f => f.endsWith('.jpg')).length;

// 2. tap / mouse log from the recording script: "seconds kind x y label"
cfg.tapLines = [];
if (cfg.tapLog) for (const line of fs.readFileSync(path.join(root, cfg.tapLog), 'utf8').split('\n')) {
  const [s, kind, x, y] = line.trim().split(' ');
  if (kind === 'tap' || kind === 'move') cfg.tapLines.push({ s: +s, kind, x: +x, y: +y });
}

(async () => {
  const preview = has('preview');
  const browser = await chromium.launch({ headless: !preview, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: preview ? 1140 : 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
  await page.goto('file:///' + path.join(__dirname, 'promo.html').replace(/\\/g, '/'));
  await page.evaluate(() => Promise.all([...document.fonts].map(f => f.load())));
  const { total, poster } = await page.evaluate(c => window.init(c), cfg);
  console.log(`${cfg.slug}: ${total.toFixed(2)} s, ${cfg.nFrames} source frames`);
  const stage = page.locator('#stage');
  const shot = async t => { await page.evaluate(t => window.renderAt(t), t); return stage.screenshot({ type: 'png' }); };

  if (preview) { await page.evaluate(() => window.preview()); console.log('preview open: close the window to stop'); return; }

  const dir = path.resolve(opt('dir') || path.join(os.tmpdir(), 'promo-qa', cfg.slug));
  if (opt('stills')) {
    fs.mkdirSync(dir, { recursive: true });
    for (const t of opt('stills').split(',').map(Number)) {
      const f = path.join(dir, `${cfg.slug}-${t.toFixed(2)}.png`); fs.writeFileSync(f, await shot(t)); console.log('  still', f); }
    return browser.close();
  }
  if (opt('sheet')) {                       // contact sheet: 480x270 frames, timestamps burned in by ffmpeg
    fs.mkdirSync(dir, { recursive: true }); const step = +opt('sheet'), tmp = path.join(dir, 'sheet'); fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp);
    let n = 0; for (let t = 0; t < total; t += step) fs.writeFileSync(path.join(tmp, `s_${String(n++).padStart(4, '0')}.png`), await shot(t));
    const cols = 6, out = path.join(dir, `${cfg.slug}-sheet.png`);
    spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(tmp, 's_%04d.png'), '-vf',
      `scale=480:-2,drawtext=text='%{eif\\:n*${step}\\:d}s':x=8:y=8:fontcolor=white:fontsize=22:box=1:boxcolor=red,tile=${cols}x${Math.ceil(n / cols)}`,
      '-frames:v', '1', out], { stdio: 'inherit' });
    console.log('  sheet', out); return browser.close();
  }

  const test = !!opt('out');
  const out = path.resolve(opt('out') || path.join(root, 'assets/videos', cfg.slug + '-promo.mp4'));
  if (!has('poster-only')) {
    const from = +(opt('from') || 0), to = Math.min(+(opt('to') || total), total);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(opt('crf') || cfg.crf || 20), '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-r', String(FPS), '-an', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c))));
    const n = Math.round((to - from) * FPS), t0 = Date.now();
    for (let i = 0; i < n; i++) {
      const png = await shot(from + i / FPS);
      if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 90 === 0) process.stdout.write(`\r  frame ${i}/${n}`);
    }
    ff.stdin.end(); await done;
    console.log(`\r  ${n} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s -> ${out} ${(fs.statSync(out).size / 1e6).toFixed(2)} MB`);
  }
  // poster: the key moment, without spotlight, callouts, taps or cursor
  if (!test && poster != null) {
    await page.evaluate(t => window.renderAt(t, true), poster);
    const png = path.join(work, 'poster.png'); await stage.screenshot({ path: png });
    const p = path.join(root, 'assets/videos', cfg.slug + '-promo-poster.webp');
    spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-q:v', '82', p], { stdio: 'inherit' });
    console.log('  poster', p, (fs.statSync(p).size / 1e3).toFixed(0) + ' KB');
  }
  await browser.close();
})();
