// Records the raw KH Halal Marketplace demo from the LIVE site at a real PHONE size (Pixel 7, mobile layout),
// for the phone version of the promo (owner, 2026-11-13: "it is a web app, it is responsive too").
// Same three parts and the same safety rules as scripts/record-kh-halal-marketplace.js:
//   1. guest:    home, products + Filters sheet, product, add to cart, cart, Khmer (Account > ខ្មែរ > Home)
//   2. customer: signed in OFF camera (one item put in the cart off camera), then wishlist, cart, checkout and the
//                payment page. Picks the KHR QR and STOPS before "Place order": no order, no money moves.
//                Order/payment requests are blocked as a safety net. The Account tab is NEVER opened on camera
//                (it shows email, username, address, phone). Email, phone and address are blurred in the video.
//   3. seller:   signed in OFF camera, then dashboard (top only: lower down are recent orders), products and the
//                3 add-product steps; submits ONE demo product (draft = waiting for admin review), shows it in the
//                list, then deletes it OFF camera and checks it is gone.
// Logins only from environment variables (run from PowerShell, see CLAUDE.md):
//   KH_CUSTOMER_EMAIL, KH_CUSTOMER_PASSWORD, KH_SELLER_EMAIL, KH_SELLER_PASSWORD
//   NODE_PATH=<folder with playwright>/node_modules node scripts/record-kh-halal-mobile.js
// Output: assets/videos/kh-halal-marketplace-raw/khm-<time>.mp4 (1080x2400) + .taps.txt (taps in video pixels)
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const { chromium, devices } = require('playwright');

const SITE = 'https://kh-halal-marketplace.onrender.com';
const DEV = devices['Pixel 7'];                    // 412x915 CSS px at 2.625x = about 1080x2400, like the Android takes
const VW = 1080, VH = 2400, K = VW / DEV.viewport.width, GAP = 0.5;
const env = k => { const v = process.env[k]; if (!v) { console.error('Missing env var ' + k); process.exit(1); } return v; };
const PARTS = (process.env.KH_PARTS || 'guest,customer,seller').split(',');
const LOGIN = PARTS.length === 1 && PARTS[0] === 'guest' ? {} : { customer: [env('KH_CUSTOMER_EMAIL'), env('KH_CUSTOMER_PASSWORD')], seller: [env('KH_SELLER_EMAIL'), env('KH_SELLER_PASSWORD')] };
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets/videos/kh-halal-marketplace-raw');
const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const work = path.join(require('os').tmpdir(), 'khm-screencast-' + stamp);
fs.mkdirSync(work, { recursive: true }); fs.mkdirSync(outDir, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const frames = [], log = [];
let base = 0;

async function part(browser, name, role, setupUrl, act, { prep, after } = {}) {
  if (!PARTS.includes(name)) return;
  const ctx = await browser.newContext({ ...DEV, locale: 'en-US', colorScheme: 'light' });
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  const writes = []; page.on('request', r => { if (!['GET', 'HEAD', 'OPTIONS'].includes(r.method())) writes.push(r.method() + ' ' + r.url().replace(SITE, '')); });
  await page.route('**/api/v1/**', r => {           // safety net: an order or a payment can never be created
    const m = r.request().method(), u = r.request().url();
    if (m !== 'GET' && /\/orders|\/payments?\b|\/khqr|\/bakong/i.test(u)) { console.error('BLOCKED ' + m + ' ' + u); return r.abort(); }
    return r.continue();
  });
  if (role) {                                      // sign in before the recording starts
    await page.goto(SITE + '/login', { waitUntil: 'networkidle', timeout: 120000 });
    await page.locator('#login-email').fill(LOGIN[role][0]);
    await page.locator('#login-password').fill(LOGIN[role][1]);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await page.waitForURL(u => !/\/login/.test(u.toString()), { timeout: 30000 });
  }
  if (prep) await prep(page);
  await page.goto(SITE + setupUrl, { waitUntil: 'networkidle', timeout: 120000 });   // never the Account page
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
  const h = {
    page, sleep,
    // a finger tap on the element's centre, logged in video pixels so the edit draws a tap ring
    tap: async (loc, wait = 0) => {
      // close the keyboard first: the site hides its bottom action bar while a text field has focus
      await page.evaluate(() => { const a = document.activeElement; if (a && /^(INPUT|TEXTAREA)$/.test(a.tagName)) a.blur(); });
      await loc.waitFor({ state: 'visible', timeout: 30000 }); await loc.scrollIntoViewIfNeeded(); await sleep(250);
      const b = await loc.boundingBox(), x = b.x + b.width / 2, y = b.y + b.height / 2;
      log.push(`${now().toFixed(3)} tap ${Math.round(x * K)} ${Math.round(y * K)} tap`);
      await page.touchscreen.tap(x, y); if (wait) await sleep(wait);
    },
    // smooth scroll like a finger swipe
    scroll: async (dy, ms = 700) => { log.push(`${now().toFixed(3)} mark 0 0 scroll${dy}`); await page.evaluate(d => window.scrollBy({ top: d, behavior: 'smooth' }), dy); await sleep(ms); },
    mark: label => log.push(`${now().toFixed(3)} mark 0 0 ${label}`),
  };
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: Math.round(DEV.viewport.width * DEV.deviceScaleFactor), maxHeight: Math.round(DEV.viewport.height * DEV.deviceScaleFactor), everyNthFrame: 1 });
  await sleep(300); await page.evaluate(() => window.scrollBy(0, 1)); await page.evaluate(() => window.scrollBy(0, -1));
  h.mark(name + '-start');
  // if a step fails, still run the off-camera clean-up (never leave the demo product behind)
  try { await act(h); } catch (e) { if (after) await after(page).catch(x => console.error('clean-up failed: ' + x.message)); throw e; }
  h.mark(name + '-end');
  const end = now();
  await cdp.send('Page.stopScreencast'); await sleep(300);
  if (after) await after(page);                     // off camera
  if (frames.length === start) throw new Error(name + ': no frames');
  frames.push({ file: frames[frames.length - 1].file, t: end });   // screencast only sends changes: hold the last frame
  base = end + GAP;
  if (errors.length) console.log(name + ' page errors (site, not recording):', errors.slice(0, 2));
  console.log(name + ' server writes:', [...new Set(writes)].filter(w => !/ws-ticket|play\.google/.test(w)));
  await ctx.close();
  console.log(`${name}: ${frames.length - start} frames, ends at ${base.toFixed(1)} s`);
}

(async () => {
  const browser = await chromium.launch();
  const nav = (page, href) => page.locator(`nav a[href="${href}"]:visible`).last();

  // slow on purpose: every result stays on screen 3-5 s so the edit has real footage to hold on
  await part(browser, 'guest', null, '/', async ({ page, sleep, tap, scroll }) => {
    await sleep(4000);                                                         // home: categories, hero
    await scroll(620, 1200); await sleep(3500);                                // Featured Products: riel + dollars
    await scroll(-620, 900);
    await tap(page.getByRole('link', { name: 'All Products', exact: true }).first(), 0);
    await page.waitForLoadState('networkidle'); await sleep(3500);             // All Products
    await tap(page.getByRole('button', { name: 'Filters', exact: true }).first(), 3800);   // filter sheet: halal claim
    await tap(page.getByRole('button', { name: 'Close filters' }).first(), 1200);
    await tap(page.getByRole('link', { name: 'Black Hijab', exact: true }).first(), 0);
    await page.waitForLoadState('networkidle'); await sleep(4000);             // product: riel + dollars
    await scroll(430, 1000); await sleep(3500);                                // identity-verified seller
    await tap(page.getByRole('button', { name: /^add to cart$/i }).last(), 3500);   // "Added to cart"
    await tap(page.locator('a[href="/customer/cart"]:visible').first(), 0);
    await page.waitForLoadState('networkidle'); await sleep(4500);             // cart as a guest
    await tap(nav(page, '/login'), 0); await page.waitForLoadState('networkidle'); await sleep(1200);   // Account (login page)
    await tap(page.getByRole('button', { name: 'ខ្មែរ' }).first(), 1200);
    await tap(page.locator('.app-back-bar__button:visible').first(), 0);      // the login page has no bottom nav (label is Khmer now)
    await page.waitForLoadState('networkidle'); await sleep(1500);
    if (!/\/(index)?$/.test(new URL(page.url()).pathname.replace('/app', ''))) { await tap(nav(page, '/index'), 0); await page.waitForLoadState('networkidle'); }
    await sleep(2500);                                                         // home in Khmer
    await scroll(620, 1200); await sleep(3000);
  });

  // checkout: email, phone and address are blurred in the edit; parts where they move are cut out
  await part(browser, 'customer', 'customer', '/', async ({ page, sleep, tap, scroll }) => {
    await sleep(2500);                                                         // home, signed in
    await page.goto(SITE + '/customer/wishlist', { waitUntil: 'networkidle' }); await sleep(4500);   // wishlist (a cut in the edit)
    await tap(nav(page, '/customer/cart'), 0); await page.waitForLoadState('networkidle'); await sleep(3000);   // cart
    await tap(page.getByRole('link', { name: /proceed to checkout/i }).first(), 0);
    await page.waitForLoadState('networkidle'); await sleep(3500);             // checkout top (details from the account)
    await tap(page.locator('#checkout-district'), 400);
    await page.keyboard.type('Chamkar Mon', { delay: 90 }); await sleep(600);
    await page.evaluate(() => document.activeElement && document.activeElement.blur());   // keyboard closed
    await page.locator('#checkout-province').selectOption('Phnom Penh'); await sleep(800);
    await page.locator('#checkout-province').scrollIntoViewIfNeeded(); await sleep(2500);   // district + province filled
    await scroll(900, 1200); await sleep(3500);                                // delivery fee + total
    await tap(page.locator('#checkout-continue-payment'), 0);
    await page.waitForURL(/\/customer\/payment/, { timeout: 30000 }); await page.waitForLoadState('networkidle'); await sleep(4000);   // payment page
    await tap(page.locator('#payment-methods button').filter({ hasText: 'Pay in KHR' }).first(), 3500);   // KHR QR chosen
    await scroll(900, 1200); await sleep(3500);                                // "Place order" shown, NOT tapped
  }, {
    prep: async page => {                                                      // one item in the cart, off camera
      await page.goto(SITE + '/products/1', { waitUntil: 'networkidle', timeout: 120000 });
      await page.getByRole('button', { name: /^add to cart$/i }).last().tap(); await sleep(2000);
    },
  });

  const DEMO = 'Halal Beef Meatball 500g';
  const IMG = 'https://fnhkrvcrtalkznysjydy.supabase.co/storage/v1/object/public/kh-halal-media/uploads/media/seller_product/22/image-ca81a081e3beaeee-1783484276276.png';
  const myDemo = page => page.evaluate(async n => { const j = await (await fetch('/api/v1/seller/products', { credentials: 'include' })).json(); return j.products.filter(p => p.name === n).map(p => p.id); }, DEMO);
  await part(browser, 'seller', 'seller', '/seller/dashboard', async ({ page, sleep, tap }) => {
    await sleep(5500);                                                         // dashboard top: needs attention + stats
    await tap(nav(page, '/seller/products'), 0); await page.waitForLoadState('networkidle'); await sleep(4500);   // products
    await tap(page.getByRole('link', { name: /add new product/i }).first(), 0);
    await page.waitForLoadState('networkidle'); await sleep(2500);             // step 1
    await tap(page.getByText('Use an image link instead'), 500);
    await tap(page.locator('#seller-add-image-url'), 300);
    await page.keyboard.insertText(IMG); await sleep(2500);
    await tap(page.locator('#seller-add-name'), 300);
    await page.keyboard.type(DEMO, { delay: 90 }); await sleep(500);
    await tap(page.locator('#seller-add-description'), 300);
    await page.keyboard.type('Frozen beef meatballs, 500 g pack.', { delay: 45 }); await sleep(500);
    const pick = async (sel, want) => {
      const l = page.locator(sel); await l.scrollIntoViewIfNeeded();
      const o = await l.evaluate(x => [...x.options].map(o => o.value).filter(Boolean));
      if (!o.includes(want)) throw new Error(sel + ': no ' + want + ' in ' + o);
      await l.selectOption(want); await sleep(900);
    };
    await pick('#seller-add-category-first', 'food');
    await pick('#seller-add-category-subcategory', 'frozen-food');
    await pick('#seller-add-category-type', 'meatball'); await sleep(1200);
    await tap(page.getByRole('button', { name: 'Continue', exact: true }), 2500);   // step 2
    await tap(page.locator('#seller-add-price'), 200); await page.keyboard.type('9000', { delay: 120 });
    await tap(page.locator('#seller-add-stock-qty'), 200); await page.keyboard.type('20', { delay: 120 });
    await tap(page.locator('#seller-add-weight-kg'), 200); await page.keyboard.type('0.5', { delay: 120 }); await sleep(1800);
    await tap(page.getByRole('button', { name: 'Continue', exact: true }), 4500);   // step 3: review (no halal claim ticked)
    if (process.env.KH_NO_SUBMIT) return;
    await tap(page.getByRole('button', { name: 'Submit for review', exact: true }), 0);
    await page.waitForURL(/\/seller\/products/, { timeout: 60000 }); await page.waitForLoadState('networkidle'); await sleep(5500);   // pending review
  }, {
    prep: async page => {
      await page.goto(SITE + '/seller/dashboard', { waitUntil: 'networkidle', timeout: 120000 });
      if ((await myDemo(page)).length) throw new Error('A "' + DEMO + '" product already exists: delete it first');
    },
    after: async page => {                                                     // delete the demo product, then check
      if (!(await myDemo(page)).length) return;
      await page.goto(SITE + '/seller/products', { waitUntil: 'networkidle' }); await sleep(1500);
      const btn = page.locator(`button[data-action="delete"][data-name="${DEMO}"]`).first();   // same button as the desktop script
      await btn.scrollIntoViewIfNeeded(); await btn.tap(); await sleep(400); await btn.tap(); await sleep(3000);   // the site asks for a second tap
      const left = await myDemo(page);
      if (left.length) console.error('!!! DEMO PRODUCT NOT DELETED, ids ' + left + ': delete it by hand');
      else console.log('demo product deleted');
    },
  });

  await browser.close();

  const list = frames.map((f, i) => `file '${f.file.replace(/\\/g, '/')}'\nduration ${Math.max(0.001, ((frames[i + 1] || { t: f.t + 1 }).t - f.t)).toFixed(4)}`).join('\n')
    + `\nfile '${frames[frames.length - 1].file.replace(/\\/g, '/')}'\n`;
  fs.writeFileSync(path.join(work, 'list.txt'), list);
  const out = path.join(outDir, `khm-${stamp}`);
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(work, 'list.txt'),
    '-vf', `scale=${VW}:${VH},fps=30`, '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', '-pix_fmt', 'yuv420p', out + '.mp4'], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('ffmpeg failed');
  fs.writeFileSync(out + '.taps.txt', log.join('\n') + '\n');
  console.log(`${frames.length} frames, ${frames[frames.length - 1].t.toFixed(1)} s -> ${out}.mp4`);
})().catch(e => { console.error(e.message); process.exit(1); });
