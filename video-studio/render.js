// Renders one promo video from a real recording + a storyboard file (video-studio/README.md).
//   node video-studio/render.js video-studio/rieltrack.json                 -> assets/videos/rieltrack-promo.mp4 + -promo-poster.webp
//   ... --out test.mp4 [--from 3 --to 9]     test render (never touches assets/videos)
//   ... --stills 1.5,8,12 [--dir folder]     PNG stills at those seconds (QA)
//   ... --sheet 1 [--dir folder]             one contact sheet, a small frame every N seconds (QA)
//   ... --poster-only                        only the poster
//   ... --preview                            opens a window with a scrub bar (play / drag)
//   ... --events out.json                    the times of cuts, taps, labels, flip and outro (audio.py)
// Needs ffmpeg on PATH and Playwright 1.49.1 (npm i playwright@1.49.1 in any folder OUTSIDE the website,
// then set NODE_PATH to that folder's node_modules).
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync, spawn } = require('child_process');
const { chromium } = require('playwright');

const FPS = 30;
const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2), cfgPath = path.resolve(args[0]);
// A flag without its value used to fall through to a full render over the live video (2026-11-15): stop instead
const opt = k => {
  const i = args.indexOf('--' + k); if (i < 0) return null;
  const v = args[i + 1]; if (v == null || v.startsWith('--')) throw new Error(`--${k} needs a value`);
  return v;
};
const has = k => args.includes('--' + k);
['events', 'out', 'from', 'to', 'crf', 'dir', 'stills', 'sheet'].forEach(opt);   // check every value at once, before any work
if ((has('from') || has('to')) && !has('out')) throw new Error('--from / --to need --out <test file>: they would cut the live video');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
if (args.includes('--portrait')) cfg.portrait = true;   // phones: 1080x2340, writes <name>-mobile.mp4
// outro "qr": the address as a QR code (OpenCV, error correction M, 4-module white border), checked by decoding it back
if (cfg.outro && cfg.outro.qr) {
  const py = `import cv2,sys,base64\np=cv2.QRCodeEncoder_Params();p.correction_level=cv2.QRCodeEncoder_CORRECT_LEVEL_M\nq=cv2.QRCodeEncoder.create(p).encode(sys.argv[1])\n` +
    `big=cv2.resize(q,(q.shape[1]*10,)*2,interpolation=cv2.INTER_NEAREST)\nassert cv2.QRCodeDetector().detectAndDecode(big)[0]==sys.argv[1]\n` +
    `print(q.shape[0],base64.b64encode(cv2.imencode('.png',q)[1]).decode())`;
  const r = spawnSync('python', ['-c', py, cfg.outro.qr], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error('QR code failed: ' + r.stderr);
  const [n, b64] = r.stdout.trim().split(' ');
  Object.assign(cfg.outro, { qrN: +n, qrSrc: 'data:image/png;base64,' + b64 });
}

// 1. recorded frames at a constant 30 fps, full size, extracted once (screenrecord files have a variable rate).
//    "takes": extra recordings a beat can use ("take": "<name>"); the top-level "raw" is the take "main".
// 2. tap / mouse log from each recording script: "seconds kind x y label"
const takes = Object.assign({ main: { raw: cfg.raw, tapLog: cfg.tapLog, tapOffset: cfg.tapOffset, tapShift: cfg.tapShift, smooth: cfg.smooth } }, cfg.takes || {});
cfg.tk = {};
let work;
for (const [name, t] of Object.entries(takes)) {
  const raw = path.join(root, t.raw), dir = path.join(os.tmpdir(), 'promo-frames', path.basename(raw, '.mp4'));
  if (!fs.existsSync(path.join(dir, 'done'))) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('extracting frames ->', dir);
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', `fps=${FPS}`, '-q:v', '2', path.join(dir, 'f_%05d.jpg')], { stdio: 'inherit' });
    if (r.status !== 0) throw new Error('frame extraction failed: ' + t.raw);
    fs.writeFileSync(path.join(dir, 'done'), '');
  }
  const tapLines = [];
  if (t.tapLog) for (const line of fs.readFileSync(path.join(root, t.tapLog), 'utf8').split('\n')) {
    const [s, kind, x, y, ...label] = line.trim().split(' ');
    if (kind === 'tap' || kind === 'move' || kind === 'swipe') tapLines.push({ s: +s, kind, x: +x, y: +y, label: label.join(' ') });
  }
  // "smooth": true (top level: every take) = use the frames smooth.py made (single repeated frames inside motion blended: no scroll judder)
  const fdir = (t.smooth || cfg.smooth) ? dir + '-smooth' : dir;
  if ((t.smooth || cfg.smooth) && !fs.existsSync(path.join(fdir, 'done'))) throw new Error('run: python video-studio/smooth.py ' + t.raw);
  cfg.tk[name] = { frames: 'file:///' + fdir.replace(/\\/g, '/'), nFrames: fs.readdirSync(fdir).filter(f => f.endsWith('.jpg')).length,
    tapLines, tapOffset: t.tapOffset || 0, tapShift: t.tapShift || [] };
  if (name === 'main') work = dir;
}
cfg.nFrames = cfg.tk.main.nFrames;

(async () => {
  const preview = has('preview');
  const browser = await chromium.launch({ headless: !preview, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: cfg.portrait ? 1080 : 1920, height: (cfg.portrait ? 2340 : 1080) + (preview ? 60 : 0) }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
  await page.goto('file:///' + path.join(__dirname, 'promo.html').replace(/\\/g, '/'));
  await page.evaluate(() => Promise.all([...document.fonts].map(f => f.load())));
  const { total, poster } = await page.evaluate(c => window.init(c), cfg);
  console.log(`${cfg.slug}: ${total.toFixed(2)} s, ${cfg.nFrames} source frames`);
  const stage = page.locator('#stage');
  const shot = async t => { await page.evaluate(t => window.renderAt(t), t); return stage.screenshot({ type: 'png' }); };

  if (opt('events')) { fs.writeFileSync(path.resolve(opt('events')), JSON.stringify(await page.evaluate(() => window.events()))); return browser.close(); }   // for audio.py
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
  const name = (cfg.out || cfg.slug + '-promo') + (cfg.portrait ? '-mobile' : '');                 // "out": file name in assets/videos (full demo: <slug>)
  const out = path.resolve(opt('out') || path.join(root, 'assets/videos', name + '.mp4'));
  const part = out.replace(/\.mp4$/i, '') + '.part.mp4';   // written here, renamed to out only when ffmpeg finished: a stopped render never leaves a broken video
  if (!has('poster-only')) {
    const from = +(opt('from') || 0), to = Math.min(+(opt('to') || total), total);
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(opt('crf') || cfg.crf || 20), '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-g', String(2 * FPS),   // a keyframe at least every 2 s (seeking lands where you click); scene-cut keyframes stay on
      '-r', String(FPS), '-an', '-movflags', '+faststart', part], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c))));
    const n = Math.round((to - from) * FPS), t0 = Date.now();
    for (let i = 0; i < n; i++) {
      const png = await shot(from + i / FPS);
      if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 90 === 0) process.stdout.write(`\r  frame ${i}/${n}`);
    }
    ff.stdin.end(); await done; fs.renameSync(part, out);
    console.log(`\r  ${n} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s -> ${out} ${(fs.statSync(out).size / 1e6).toFixed(2)} MB`);
  }
  // poster: the key moment, without spotlight, callouts, taps or cursor
  if (!test && poster != null) {
    await page.evaluate(t => window.renderAt(t, true), poster);
    const png = path.join(work, 'poster.png'); await stage.screenshot({ path: png });
    const p = path.join(root, 'assets/videos', name + '-poster.webp');
    if (spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-q:v', '82', p], { stdio: 'inherit' }).status !== 0) throw new Error('poster failed: the old poster is still there');
    console.log('  poster', p, (fs.statSync(p).size / 1e3).toFixed(0) + ' KB');
  }
  await browser.close();
})();
