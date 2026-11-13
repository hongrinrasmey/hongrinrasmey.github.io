// Records the raw KH Halal Marketplace demo from the LIVE site (VIDEOS.md, Method C), in three parts:
//   1. guest:    home, product, add to cart (browser-only cart), cart page, Khmer
//   2. customer: signed in OFF camera, then the wishlist
//   3. seller:   signed in OFF camera, then dashboard, products, the add-product form: types a demo
//                product name, presses no button, never saves (the page keeps drafts in the browser only)
// Logins come only from environment variables, never from a file:
//   KH_CUSTOMER_EMAIL, KH_CUSTOMER_PASSWORD, KH_SELLER_EMAIL, KH_SELLER_PASSWORD
//   NODE_PATH=<folder with playwright>/node_modules node scripts/record-kh-halal-marketplace.js
// Never opens: checkout, payment, messages (opening them marks chats read), notifications,
// orders with buyer names, payouts (bank account), verification, profile pages (email).
// Output: assets/videos/kh-halal-marketplace-raw/kh-<time>.mp4 + .taps.txt (clicks and cursor path)
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const { chromium } = require('playwright');

const SITE = 'https://kh-halal-marketplace.onrender.com';
// 1920x1080: a real Full HD desktop window (owner, 2026-11-13), so the site shows its full desktop layout
const W = 1920, H = 1080, GAP = 0.5;               // GAP: seconds of "nothing" between the parts
const env = k => { const v = process.env[k]; if (!v) { console.error('Missing env var ' + k); process.exit(1); } return v; };
const PARTS = (process.env.KH_PARTS || 'guest,customer,seller').split(',');   // KH_PARTS=guest: test run, no logins
const LOGIN = PARTS.length === 1 && PARTS[0] === 'guest' ? {} : { customer: [env('KH_CUSTOMER_EMAIL'), env('KH_CUSTOMER_PASSWORD')], seller: [env('KH_SELLER_EMAIL'), env('KH_SELLER_PASSWORD')] };
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets/videos/kh-halal-marketplace-raw');
const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const work = path.join(require('os').tmpdir(), 'kh-screencast-' + stamp);
fs.mkdirSync(work, { recursive: true }); fs.mkdirSync(outDir, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const frames = [], log = [];
let base = 0;                                      // time offset of the current part in the joined video

async function part(browser, name, role, setupUrl, act) {
  if (!PARTS.includes(name)) return;
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, locale: 'en-US', colorScheme: 'light' });
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  // every request that could change data on the server is listed at the end of the part
  const writes = []; page.on('request', r => { if (!['GET', 'HEAD', 'OPTIONS'].includes(r.method())) writes.push(r.method() + ' ' + r.url().replace(SITE, '')); });
  if (role) {                                      // sign in before the recording starts
    await page.goto(SITE + '/login', { waitUntil: 'networkidle', timeout: 120000 });
    await page.locator('#login-email').fill(LOGIN[role][0]);
    await page.locator('#login-password').fill(LOGIN[role][1]);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL(u => !/\/login/.test(u.toString()), { timeout: 30000 });
  }
  await page.goto(SITE + setupUrl, { waitUntil: 'networkidle', timeout: 120000 });
  await sleep(1500);

  const cdp = await ctx.newCDPSession(page);
  let t0 = null; const start = frames.length;
  cdp.on('Page.screencastFrame', async f => {
    if (t0 === null) t0 = f.metadata.timestamp;
    const file = path.join(work, `s_${String(frames.length).padStart(5, '0')}.jpg`);
    fs.writeFileSync(file, Buffer.from(f.data, 'base64')); frames.push({ file, t: base + f.metadata.timestamp - t0 });
    await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  const now = () => base + (t0 === null ? 0 : Date.now() / 1000 - t0);
  let mx = W - 160, my = H - 120;
  await page.mouse.move(mx, my);
  const h = {
    page,
    sleep,
    // eased mouse path, every step logged so the video can draw the cursor
    move: async (x, y, ms = 450) => {
      const sx = mx, sy = my, n = Math.max(8, Math.round(ms / 16));
      for (let i = 1; i <= n; i++) {
        const u = i / n, e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        mx = sx + (x - sx) * e; my = sy + (y - sy) * e;
        await page.mouse.move(mx, my); log.push(`${now().toFixed(3)} move ${Math.round(mx)} ${Math.round(my)}`);
        await sleep(ms / n);
      }
    },
    click: async (loc, ms = 450) => {
      await loc.waitFor({ state: 'visible', timeout: 30000 }); await loc.scrollIntoViewIfNeeded();
      const b = await loc.boundingBox(), x = b.x + b.width / 2, y = b.y + b.height / 2;
      await h.move(x, y, ms); await sleep(200);
      log.push(`${now().toFixed(3)} tap ${Math.round(x)} ${Math.round(y)} click`); await page.mouse.click(x, y);
    },
    scroll: async (dy, steps = 30) => { for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, dy / steps); await sleep(20); } },
    mark: label => log.push(`${now().toFixed(3)} mark 0 0 ${label}`),
  };
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
  await sleep(300); await page.mouse.move(mx + 1, my);
  h.mark(name + '-start');
  log.push(`${now().toFixed(3)} move ${mx} ${my}`);         // where the mouse really starts, so the drawn cursor never carries over from the last part
  await act(h);
  h.mark(name + '-end');
  const end = now();
  await cdp.send('Page.stopScreencast'); await sleep(300);
  if (frames.length === start) throw new Error(name + ': no frames');
  // the screencast only sends frames when something changes: repeat the last one at the real end
  frames.push({ file: frames[frames.length - 1].file, t: end });
  base = end + GAP;
  if (errors.length) console.log(name + ' page errors (site, not recording):', errors.slice(0, 2));
  console.log(name + ' server writes:', [...new Set(writes)].filter(w => !/ws-ticket/.test(w)));
  await ctx.close();
  console.log(`${name}: ${frames.length - start} frames, ends at ${base.toFixed(1)} s`);
}

(async () => {
  const browser = await chromium.launch();

  // slow on purpose (owner, 2026-11-13): every result stays on screen 3-5 s so the video can explain it
  await part(browser, 'guest', null, '/', async ({ page, sleep, move, click, scroll }) => {
    await sleep(4000);                                                         // home: hero, verified sellers
    await move(960, 600, 1000); await scroll(700, 60); await sleep(4500);      // Featured Products: riel + dollars
    await click(page.getByRole('link', { name: /view all/i }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(4500);             // All Products: filters + grid
    await move(960, 500, 700); await scroll(-2000, 30); await sleep(600);
    await click(page.locator('a[href*="/products/1"]').filter({ hasText: 'Black Hijab' }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(5000);             // product: price, verified seller
    await click(page.getByRole('button', { name: /^add to cart$/i }).first(), 900); await sleep(3000);
    await click(page.locator('header a[href="/customer/cart"]:visible').first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(4500);             // cart (no checkout)
    await click(page.getByRole('link', { name: 'Home', exact: true }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(1500);
    await click(page.getByRole('button', { name: 'ខ្មែរ' }).first(), 900); await sleep(3500);   // Khmer
    await move(960, 600, 700); await scroll(700, 60); await sleep(3500);       // Khmer product cards
    await click(page.getByRole('button', { name: 'English' }).first(), 500); await sleep(800);  // back (off the cut)
  });

  await part(browser, 'customer', 'customer', '/', async ({ page, sleep, click }) => {
    await sleep(3000);                                                         // home, signed in (role card on top)
    await click(page.locator('header a[href="/customer/wishlist"]:visible').first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(4500);             // wishlist
  });

  await part(browser, 'seller', 'seller', '/seller/dashboard', async ({ page, sleep, move, click, scroll }) => {
    await sleep(6000);                                                         // dashboard (role card, then time to read)
    await click(page.getByRole('link', { name: 'Products', exact: true }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(4500);             // product list + status
    await click(page.getByRole('link', { name: /add new product/i }).first()
      .or(page.getByRole('button', { name: /add new product/i }).first()).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(3500);             // add-product form
    const name = page.getByPlaceholder(/Premium Halal Beef Jerky/i).first();  // demo text only; no button is pressed
    await click(name, 900); await sleep(400);
    await page.keyboard.type('Halal Beef Jerky 200g', { delay: 110 }); await sleep(3500);
  });

  await browser.close();

  // frames (variable timing) -> one high-quality raw mp4 with the same timing
  const list = frames.map((f, i) => `file '${f.file.replace(/\\/g, '/')}'\nduration ${Math.max(0.001, ((frames[i + 1] || { t: f.t + 1 }).t - f.t)).toFixed(4)}`).join('\n')
    + `\nfile '${frames[frames.length - 1].file.replace(/\\/g, '/')}'\n`;
  fs.writeFileSync(path.join(work, 'list.txt'), list);
  const out = path.join(outDir, `kh-${stamp}`);
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(work, 'list.txt'),
    '-vf', 'fps=30', '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', '-pix_fmt', 'yuv420p', out + '.mp4'], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('ffmpeg failed');
  fs.writeFileSync(out + '.taps.txt', log.join('\n') + '\n');
  console.log(`${frames.length} frames, ${frames[frames.length - 1].t.toFixed(1)} s -> ${out}.mp4`);
})().catch(e => { console.error(e.message); process.exit(1); });
