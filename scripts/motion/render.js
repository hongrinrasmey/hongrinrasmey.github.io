// Renders a demo video from a raw recording + a scene config (VIDEOS.md).
//   node scripts/motion/render.js scripts/motion/rieltrack.json [--from 0 --to 8] [--out file.mp4] [--poster-only]
// Needs ffmpeg on PATH and Playwright (npm i playwright@1.49.1 in any folder, then set NODE_PATH
// to that folder's node_modules). Writes assets/videos/<slug>.mp4 and <slug>-poster.webp.
const fs = require('fs'), path = require('path'), { spawnSync, spawn } = require('child_process');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '../..');
const args = process.argv.slice(2), cfgPath = path.resolve(args[0]);
const opt = k => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : null; };
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const FPS = 30;

// 1. recorded frames, extracted once at a constant 30 fps (screenrecord files have a variable rate)
const raw = path.join(root, cfg.raw);
const work = path.join(require('os').tmpdir(), 'demo-frames', cfg.slug + '-' + path.basename(raw, '.mp4'));
if (!fs.existsSync(path.join(work, 'f_00001.jpg'))) {
  fs.mkdirSync(work, { recursive: true });
  const r = spawnSync('ffmpeg', ['-v', 'error', '-i', raw, '-vf', `fps=${FPS},scale=${cfg.frameWidth}:-2`, '-q:v', '2',
    path.join(work, 'f_%05d.jpg')], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('frame extraction failed');
}
cfg.frames = 'file:///' + work.replace(/\\/g, '/');
cfg.nFrames = fs.readdirSync(work).filter(f => f.endsWith('.jpg')).length;
cfg.fps = FPS;

// 2. tap log from the recording script: "seconds kind x y label"
cfg.taps = []; cfg.cursor = [];
if (cfg.tapLog) for (const line of fs.readFileSync(path.join(root, cfg.tapLog), 'utf8').split('\n')) {
  const [s, kind, x, y] = line.trim().split(' ');
  if (kind === 'tap') cfg.taps.push({ s: +s + (cfg.tapOffset || 0), x: +x, y: +y });
  if (kind === 'move') cfg.cursor.push({ s: +s, x: +x, y: +y });   // mouse path (web recordings)
}
cfg.device.k = cfg.device.sw / cfg.device.srcW;        // recorded px -> screen px on stage

(async () => {
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
  // scale: the stage is laid out at W x H and rendered at W*scale x H*scale (1.5 -> 720x1560 becomes 1080x2340)
  const page = await browser.newPage({ viewport: { width: cfg.W, height: cfg.H }, deviceScaleFactor: cfg.scale || 1 });
  page.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
  await page.goto('file:///' + path.join(__dirname, 'compose.html').replace(/\\/g, '/'));
  await page.evaluate(() => document.fonts.ready);
  const { total, poster } = await page.evaluate(c => window.init(c), cfg);
  await page.evaluate(() => Promise.all([...document.fonts].map(f => f.load())));
  const from = +(opt('from') || 0), to = Math.min(+(opt('to') || total), total);
  const out = path.resolve(opt('out') || path.join(root, 'assets/videos', cfg.slug + '.mp4'));
  const crf = opt('crf') || String(cfg.crf || 18);
  console.log(`${cfg.slug}: ${from}-${to.toFixed(2)}s of ${total.toFixed(2)}s, ${cfg.nFrames} source frames -> ${out}`);

  if (!args.includes('--poster-only')) {   // --poster-only: leaves the video file alone, makes just the poster
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', crf, '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', out],
      { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c))));
    const n = Math.round((to - from) * FPS);
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.renderAt(t), from + i / FPS);
      const png = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 60 === 0) process.stdout.write(`\r  frame ${i}/${n}`);
    }
    ff.stdin.end(); await done;
    console.log(`\r  frames ${n}/${n} done, ${(fs.statSync(out).size / 1e6).toFixed(2)} MB`);
  }

  // 3. poster: one still frame (the best-looking screen), as WebP
  if (poster != null && !opt('from')) {
    await page.evaluate(t => window.renderAt(t, true), poster);
    const png = path.join(work, 'poster.png');
    await page.screenshot({ path: png });
    const p = path.join(root, 'assets/videos', cfg.slug + '-poster.webp');
    spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-q:v', '80', p], { stdio: 'inherit' });
    console.log('  poster', p, (fs.statSync(p).size / 1e3).toFixed(0) + ' KB');
  }
  await browser.close();
})();
