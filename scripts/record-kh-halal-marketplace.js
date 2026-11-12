// Records the raw KH Halal Marketplace demo from the LIVE site as a guest (VIDEOS.md, Method C).
//   NODE_PATH=<folder with playwright>/node_modules node scripts/record-kh-halal-marketplace.js
// Guest only: no login, no sign-up. The cart lives in this throwaway browser (localStorage);
// the script stops at the cart page and never opens checkout or payment.
// Output: assets/videos/kh-halal-marketplace-raw/kh-<time>.mp4 + .taps.txt (clicks and cursor path)
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const { chromium } = require('playwright');

const SITE = 'https://kh-halal-marketplace.onrender.com';
const W = 1600, H = 1000;
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets/videos/kh-halal-marketplace-raw');
const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const work = path.join(require('os').tmpdir(), 'kh-screencast-' + stamp);
fs.mkdirSync(work, { recursive: true }); fs.mkdirSync(outDir, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, locale: 'en-US', colorScheme: 'light' });
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  // Warm up first (Render's free tier can take ~30 s to wake): this part is not recorded.
  await page.goto(SITE + '/', { waitUntil: 'networkidle', timeout: 120000 });
  await sleep(1500);

  // --- screencast: sharp JPEG frames with timestamps, only when the page changes
  const cdp = await ctx.newCDPSession(page), frames = [];
  let t0 = null;
  cdp.on('Page.screencastFrame', async f => {
    const ts = f.metadata.timestamp; if (t0 === null) t0 = ts;
    const file = path.join(work, `s_${String(frames.length).padStart(5, '0')}.jpg`);
    fs.writeFileSync(file, Buffer.from(f.data, 'base64')); frames.push({ file, t: ts - t0 });
    await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  const log = [];
  const now = () => (t0 === null ? 0 : Date.now() / 1000 - t0);
  let mx = W - 200, my = H - 150;
  await page.mouse.move(mx, my);
  // move: eased mouse path, every step logged so the video can draw the cursor
  const move = async (x, y, ms = 700) => {
    const sx = mx, sy = my, n = Math.max(8, Math.round(ms / 16));
    for (let i = 1; i <= n; i++) {
      const u = i / n, e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
      mx = sx + (x - sx) * e; my = sy + (y - sy) * e;
      await page.mouse.move(mx, my); log.push(`${now().toFixed(3)} move ${Math.round(mx)} ${Math.round(my)}`);
      await sleep(ms / n);
    }
  };
  const target = async loc => { await loc.waitFor({ state: 'visible', timeout: 30000 }); const b = await loc.boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
  const click = async (loc, ms = 700) => {
    const [x, y] = await target(loc); await move(x, y, ms); await sleep(250);
    log.push(`${now().toFixed(3)} tap ${Math.round(x)} ${Math.round(y)} click`); await page.mouse.click(x, y);
  };
  const scroll = async (dy, ms = 1200) => { const n = Math.round(ms / 16); for (let i = 0; i < n; i++) { await page.mouse.wheel(0, dy / n); await sleep(16); } };

  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
  await sleep(300); await page.mouse.move(mx + 1, my); await sleep(2200);   // home, first frames

  await move(1100, 520, 900); await scroll(760, 1500); await sleep(1300);   // to Featured Products
  await click(page.locator('a[href="/app/products/1"]').filter({ hasText: 'Black Hijab' }).first());
  await page.waitForLoadState('networkidle'); await sleep(2200);           // product page, price in riel + dollars
  await click(page.getByRole('button', { name: /^add to cart$/i }).first()); await sleep(1800);
  await click(page.locator('header a[href="/customer/cart"]:visible').first(), 900);
  await page.waitForLoadState('networkidle'); await sleep(2600);           // cart (stop here, no checkout)

  await click(page.getByRole('link', { name: 'Home', exact: true }).first(), 900);
  await page.waitForLoadState('networkidle'); await sleep(1500);
  await click(page.getByRole('button', { name: 'ខ្មែរ' }).first(), 900); await sleep(2600);   // Khmer
  await click(page.getByRole('button', { name: 'English' }).first(), 500); await sleep(1500);
  await click(page.locator('nav a[href="/mosques"]:visible, a[href="/mosques"]:visible').first(), 900);
  await page.waitForLoadState('networkidle'); await sleep(2200);           // mosques list
  await move(800, 640, 700); await scroll(420, 1200); await sleep(2000);

  await cdp.send('Page.stopScreencast'); await sleep(300);
  await browser.close();
  if (errors.length) console.log('page errors (site, not recording):', errors.slice(0, 3));

  // frames (variable timing) -> one high-quality raw mp4 with the same timing
  const list = frames.map((f, i) => `file '${f.file.replace(/\\/g, '/')}'\nduration ${((frames[i + 1] || { t: f.t + 1 }).t - f.t).toFixed(4)}`).join('\n')
    + `\nfile '${frames[frames.length - 1].file.replace(/\\/g, '/')}'\n`;
  fs.writeFileSync(path.join(work, 'list.txt'), list);
  const out = path.join(outDir, `kh-${stamp}`);
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(work, 'list.txt'),
    '-vf', 'fps=30', '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', '-pix_fmt', 'yuv420p', out + '.mp4'], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('ffmpeg failed');
  fs.writeFileSync(out + '.taps.txt', log.join('\n') + '\n');
  console.log(`${frames.length} frames, ${frames[frames.length - 1].t.toFixed(1)} s -> ${out}.mp4`);
})();
