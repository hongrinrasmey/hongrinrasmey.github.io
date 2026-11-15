// Records the raw KH Halal Marketplace demo from the LIVE site (VIDEOS.md, Method C), in three parts:
//   1. guest:    home, product, add to cart (browser-only cart), cart page, Khmer
//   2. customer: signed in OFF camera (and one item put in the cart off camera), then the wishlist, the cart,
//                checkout and the payment page. Picks the KHR QR and STOPS before "Place order": no order is
//                created, no money moves (owner, 2026-11-13). Order/payment requests are blocked as a safety net.
//   gcart + map: guest checkout take (cart -> checkout -> map pin -> KHR QR), used by the promo since 2026-11-15
//   3. seller:   signed in OFF camera, then dashboard, products and all 3 add-product steps; submits ONE demo
//                product (saved as "draft" = waiting for admin review, never shown to buyers), shows it in the
//                list, then deletes it OFF camera and checks it is gone (owner, 2026-11-13)
// Logins come only from environment variables, never from a file:
//   KH_CUSTOMER_EMAIL, KH_CUSTOMER_PASSWORD, KH_SELLER_EMAIL, KH_SELLER_PASSWORD
//   NODE_PATH=<folder with playwright>/node_modules node scripts/record-kh-halal-marketplace.js
// Never presses: Place order, Pay. Never opens: messages (opening them marks chats read), notifications,
// orders with buyer names, payouts (bank account), verification, profile pages (email).
// Output: assets/videos/kh-halal-marketplace-raw/kh-<time>.mp4 + .taps.txt (clicks and cursor path)
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const { chromium } = require('playwright');

const SITE = 'https://kh-halal-marketplace.onrender.com';
// 1920x1080: a real Full HD desktop window (owner, 2026-11-13), so the site shows its full desktop layout
const W = 1920, H = 1080, GAP = 0.5;               // GAP: seconds of "nothing" between the parts
const env = k => { const v = process.env[k]; if (!v) { console.error('Missing env var ' + k); process.exit(1); } return v; };
const PARTS = (process.env.KH_PARTS || 'guest,customer,seller').split(',');   // KH_PARTS=guest: test run, no logins
const LOGIN = !PARTS.some(p => p === 'customer' || p === 'seller') ? {} :   // guest-only takes (guest, gcart, map): no logins
   { customer: [env('KH_CUSTOMER_EMAIL'), env('KH_CUSTOMER_PASSWORD')], seller: [env('KH_SELLER_EMAIL'), env('KH_SELLER_PASSWORD')] };
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets/videos/kh-halal-marketplace-raw');
const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const work = path.join(require('os').tmpdir(), 'kh-screencast-' + stamp);
fs.mkdirSync(work, { recursive: true }); fs.mkdirSync(outDir, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const frames = [], log = [];
let base = 0;                                      // time offset of the current part in the joined video

async function part(browser, name, role, setupUrl, act, { prep, ready, after, privMap } = {}) {
  if (!PARTS.includes(name)) return;
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, locale: 'en-US', colorScheme: 'light' });
  // map take: the seller pin marks a private place (owner, 2026-11-15): hidden in this browser only (like a blur)
  if (privMap) await ctx.addInitScript(() => document.addEventListener('DOMContentLoaded', () => document.head.appendChild(Object.assign(
    document.createElement('style'), { textContent: '.leaflet-marker-icon[class*="seller"], .leaflet-marker-shadow { visibility: hidden !important; }'
      // the take scrolls past the contact fields: blurred on the page itself, so the blur moves with them
      + ' #checkout-full-name, #checkout-email, #checkout-phone, #checkout-address, #checkout-address-suggestions, #checkout-district, #checkout-province, .payment-delivery-card__item strong { filter: blur(7px) !important; }' }))));
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  // every request that could change data on the server is listed at the end of the part
  const writes = []; page.on('request', r => { if (!['GET', 'HEAD', 'OPTIONS'].includes(r.method())) writes.push(r.method() + ' ' + r.url().replace(SITE, '')); });
  // safety net: an order or a payment can never be created, whatever gets clicked
  await page.route('**/api/v1/**', r => {
    const m = r.request().method(), u = r.request().url();
    if (m !== 'GET' && /\/orders|\/payments?\b|\/khqr|\/bakong/i.test(u)) { console.error('BLOCKED ' + m + ' ' + u); return r.abort(); }
    if (privMap && m !== 'GET' && /\/profile|\/users?\b|\/me\b|\/address|\/location/i.test(u)) { console.error('BLOCKED ' + m + ' ' + u); return r.abort(); }   // a pin is never saved to the account
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
  await page.goto(SITE + setupUrl, { waitUntil: 'networkidle', timeout: 120000 });
  await sleep(1500);
  if (ready) await ready(page);                     // off camera, just before the recording starts

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
    tapAt: async (x, y, ms = 450) => { await h.move(x, y, ms); await sleep(200); log.push(`${now().toFixed(3)} tap ${Math.round(x)} ${Math.round(y)} click`); await page.mouse.click(x, y); },
    scroll: async (dy, steps = 30) => { for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, dy / steps); await sleep(20); } },
    mark: label => log.push(`${now().toFixed(3)} mark 0 0 ${label}`),
  };
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
  await sleep(300); await page.mouse.move(mx + 1, my);
  h.mark(name + '-start');
  log.push(`${now().toFixed(3)} move ${mx} ${my}`);         // where the mouse really starts, so the drawn cursor never carries over from the last part
  // if a step fails, still run the off-camera clean-up (never leave the demo product on the live site)
  try { await act(h); } catch (e) { if (after) await after(page).catch(x => console.error('clean-up failed: ' + x.message)); throw e; }
  h.mark(name + '-end');
  const end = now();
  await cdp.send('Page.stopScreencast'); await sleep(300);
  if (after) await after(page);                     // off camera
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

  // checkout: the email, phone and address fields are blurred in the video (video-studio/*.json "blurs");
  // keep the page scrolled to the top so they stay where the blurs are
  await part(browser, 'customer', 'customer', '/', async ({ page, sleep, move, click }) => {
    await sleep(3000);                                                         // home, signed in (role card on top)
    await click(page.locator('header a[href="/customer/wishlist"]:visible').first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(4500);             // wishlist
    await click(page.locator('header a[href="/customer/cart"]:visible').first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(3000);             // cart
    await click(page.getByRole('link', { name: /proceed to checkout/i }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(3500);             // checkout: details filled in from the account
    await click(page.locator('#checkout-district'), 800);
    await page.keyboard.type('Chamkar Mon', { delay: 90 }); await sleep(600);
    await click(page.locator('#checkout-province'), 700);
    await page.locator('#checkout-province').selectOption('Phnom Penh'); await page.keyboard.press('Escape');
    await sleep(3500);                                                         // delivery fee appears in the summary
    await click(page.locator('#checkout-continue-payment'), 900);
    await page.waitForURL(/\/customer\/payment/, { timeout: 30000 }); await page.waitForLoadState('networkidle'); await sleep(4000);  // payment page
    await click(page.locator('#payment-methods button').filter({ hasText: 'Pay in KHR' }).first(), 900); await sleep(3500);   // KHR QR chosen
    await move(1475, 670, 900); await sleep(3500);                            // rests on Place order: NOT clicked
  }, {
    prep: async page => {                                                      // one item in the cart, off camera
      await page.goto(SITE + '/products/1', { waitUntil: 'networkidle', timeout: 120000 });
      await page.getByRole('button', { name: /^add to cart$/i }).first().click(); await sleep(2000);
    },
  });

  // guest checkout take (KH_PARTS=gcart,map, owner 2026-11-15): the cart chapter says "no account needed", so the
  // checkout, map pin and KHQR are shown as a guest too (no Login -> account jump). Guest checkout asks for contact
  // details: placeholder values typed OFF camera, blurred on the page (privMap), never a real person's details.
  const guestCart = async page => {                                          // one Black Hijab in the guest cart, off camera
    await page.goto(SITE + '/products/1', { waitUntil: 'networkidle', timeout: 120000 });
    await page.getByRole('button', { name: /^add to cart$/i }).first().click(); await sleep(2000);
  };
  await part(browser, 'gcart', null, '/customer/cart', async ({ page, sleep, click }) => {
    await sleep(2500);                                                         // guest cart: Login / Sign Up in the header
    await click(page.getByRole('link', { name: /proceed to checkout/i }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(2500);             // guest checkout (fields empty, blurred)
  }, { privMap: true, prep: guestCart });

  // checkout map (KH_PARTS=map, owner 2026-11-15): the optional map pin, dropped on a public landmark
  // (Independence Monument, Phnom Penh), never on a private place. Guest (2026-11-15, was the customer account):
  // any default pin cleared off camera, the seller pin hidden (privMap). Starts at the top of checkout (map already
  // open off camera), scrolls down to it, drops the pin, scrolls back up, Continue to payment, picks the KHR QR and
  // STOPS on "Place order" (never clicked; order/payment requests blocked). All contact fields blurred (privMap).
  const PIN = [11.5564, 104.9282];
  // landmark -> screen pixel from a loaded OpenStreetMap tile (src .../z/x/y.png and its box)
  const pinXY = page => page.evaluate(([lat, lng]) => {
    const t = [...document.querySelectorAll('#checkout-map img.leaflet-tile-loaded')].find(i => /\/\d+\/\d+\/\d+\.png/.test(i.src));
    const [z, tx, ty] = t.src.match(/\/(\d+)\/(\d+)\/(\d+)\.png/).slice(1).map(Number), b = t.getBoundingClientRect(), n = 256 * 2 ** z;
    const wx = (lng + 180) / 360 * n, s = Math.sin(lat * Math.PI / 180), wy = (.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n;
    const m = document.querySelector('#checkout-map').getBoundingClientRect(), x = b.x + (wx - tx * 256) * b.width / 256, y = b.y + (wy - ty * 256) * b.height / 256;
    const top = Math.max(m.y, 80), bot = Math.min(m.bottom, innerHeight);
    return { x, y, z, cx: m.x + m.width / 2, cy: (top + bot) / 2, inside: x > m.x + 40 && x < m.right - 40 && y > top + 40 && y < bot - 40 };   // on the map AND in the window
  }, PIN);
  let mapScroll = 0;                                                           // px from the top of checkout to the map view (ready)
  await part(browser, 'map', null, '/customer/checkout', async ({ page, sleep, move, click, tapAt }) => {
    await sleep(2200);                                                         // top of checkout (contact fields blurred)
    await move(1650, 620, 600); await sleep(200);                              // right of the form: the wheel scrolls the page, never the map
    for (let i = 1, n = 70, done = 0; i <= n; i++) {                           // eased scroll down to the map (owner: scroll, no jump)
      const u = i / n, e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2, to = Math.round(mapScroll * e);
      await page.mouse.wheel(0, to - done); done = to; await sleep(28);
    }
    await sleep(1500);                                                         // Delivery box + the open map (no pins)
    const xy = await pinXY(page);
    if (!xy.inside) throw new Error('landmark not inside the map view: ' + JSON.stringify(xy));
    await tapAt(xy.x, xy.y, 1100); await sleep(5500);                    // pin + fee banner
    await move(1650, 620, 500);                                                // eased scroll back up to Continue to payment
    for (let i = 1, n = 60, done = 0; i <= n; i++) {
      const u = i / n, e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2, to = Math.round(mapScroll * e);
      await page.mouse.wheel(0, done - to); done = to; await sleep(28);
    }
    await sleep(1200);
    await click(page.locator('#checkout-continue-payment'), 900);
    await page.waitForURL(/\/customer\/payment/, { timeout: 30000 }); await page.waitForLoadState('networkidle'); await sleep(4000);  // payment page
    await click(page.locator('#payment-methods button').filter({ hasText: 'Pay in KHR' }).first(), 900); await sleep(3500);   // KHR QR chosen
    const po = await page.getByRole('button', { name: 'Place order', exact: true }).first().boundingBox();
    await move(po.x + po.width / 2, po.y + po.height / 2, 900); await sleep(3500);   // rests on Place order: NOT clicked
  }, {
    privMap: true,
    prep: guestCart,
    ready: async page => {                                                     // all off camera
      // guest contact details: placeholders (blurred), province first so the delivery fee shows
      await page.fill('#checkout-full-name', 'Guest Shopper'); await page.fill('#checkout-email', 'guest@example.com');
      await page.fill('#checkout-phone', '012000000'); await page.fill('#checkout-address', 'Street 1'); await sleep(2500);
      await page.keyboard.press('Escape'); await page.locator('h1').first().click(); await sleep(800);   // address suggestions list closed
      if ((await page.locator('#checkout-address-suggestions').boundingBox())?.height > 0) throw new Error('address suggestions still open');
      await page.fill('#checkout-district', 'Chamkar Mon'); await page.selectOption('#checkout-province', 'Phnom Penh'); await sleep(2500);
      // the page is too short to scroll while the map is closed: it opens first, then the map is scrolled into view
      const btn = page.locator('button[aria-controls="checkout-pin-picker"]').first();
      await btn.click(); await page.locator('#checkout-map .leaflet-tile-loaded').first().waitFor({ timeout: 30000 }); await sleep(2500);
      if (await page.locator('#checkout-clear-location').isVisible()) { await page.locator('#checkout-clear-location').click(); await sleep(1500); }   // any default pin off the map
      for (let k = 0; k < 40; k++) {                                         // wheel = the same scroll a person makes
        const top = (await btn.boundingBox()).y; if (top >= 180 && top <= 300) break;
        await page.mouse.move(1650, 620); await page.mouse.wheel(0, Math.max(-400, Math.min(400, top - 240))); await sleep(350);
      }
      const top = (await btn.boundingBox()).y;
      if (top < 150 || top > 420) throw new Error('map button at y ' + Math.round(top) + ', expected 150-420');   // private fields stay above the window
      // "Clear location" zooms out to all of Cambodia: zoom back in on the landmark (wheel at its spot, like a person)
      let xy = await pinXY(page);
      for (let k = 0; k < 14 && xy.z < 15; k++) { await page.mouse.move(xy.x, xy.y); await page.mouse.wheel(0, -120); await sleep(900); xy = await pinXY(page); }
      await page.waitForLoadState('networkidle').catch(() => {}); await sleep(1500); xy = await pinXY(page);
      // drag the map so the landmark sits in the middle: the view is no longer centred on the (hidden) seller pin
      await page.mouse.move(xy.x, xy.y); await page.mouse.down();
      for (let k = 1; k <= 20; k++) { await page.mouse.move(xy.x + (xy.cx - xy.x) * k / 20, xy.y + (xy.cy - xy.y) * k / 20); await sleep(25); }
      await page.mouse.up(); await sleep(2500);
      xy = await pinXY(page); console.log('map zoom', xy.z, 'landmark at', Math.round(xy.x), Math.round(xy.y));
      if (await page.locator('.leaflet-marker-icon:visible').count()) throw new Error('a pin is still visible before the take');
      // back to the top of checkout: the take scrolls down to here again
      const at = (await btn.boundingBox()).y;
      for (let k = 0; k < 30; k++) { await page.mouse.move(1650, 620); await page.mouse.wheel(0, -600); await sleep(250); }
      await sleep(1500); mapScroll = Math.round((await btn.boundingBox()).y - at);
      console.log('scroll to the map:', mapScroll, 'px');
      if (mapScroll < 300) throw new Error('page did not scroll back to the top');
    },
  });

  const DEMO = 'Halal Beef Meatball 500g';
  // the seller's own Meatball photo (product 22), pasted as an image link: nothing new is uploaded
  const IMG = 'https://fnhkrvcrtalkznysjydy.supabase.co/storage/v1/object/public/kh-halal-media/uploads/media/seller_product/22/image-ca81a081e3beaeee-1783484276276.png';
  const myDemo = page => page.evaluate(async n => { const j = await (await fetch('/api/v1/seller/products', { credentials: 'include' })).json(); return j.products.filter(p => p.name === n).map(p => p.id); }, DEMO);
  await part(browser, 'seller', 'seller', '/seller/dashboard', async ({ page, sleep, click }) => {
    await sleep(6000);                                                         // dashboard + sidebar
    await click(page.getByRole('link', { name: 'Products', exact: true }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(4500);             // product list + status
    await click(page.getByRole('link', { name: /add new product/i }).first(), 900);
    await page.waitForLoadState('networkidle'); await sleep(2500);             // step 1
    await click(page.getByText('Use an image link instead'), 800); await sleep(500);
    await click(page.locator('#seller-add-image-url'), 600);
    await page.keyboard.insertText(IMG); await sleep(2500);                    // pasted link, photo preview
    await click(page.locator('#seller-add-name'), 800);
    await page.keyboard.type(DEMO, { delay: 90 }); await sleep(500);
    await click(page.locator('#seller-add-description'), 600);
    await page.keyboard.type('Frozen beef meatballs, 500 g pack.', { delay: 45 }); await sleep(500);
    const pick = async (sel, want) => {
      const l = page.locator(sel); await click(l, 600);
      const o = await l.evaluate(x => [...x.options].map(o => o.value).filter(Boolean));
      if (!o.includes(want)) throw new Error(sel + ': no ' + want + ' in ' + o);
      await l.selectOption(want); await page.keyboard.press('Escape'); await sleep(700);
    };
    await pick('#seller-add-category-first', 'food');
    await pick('#seller-add-category-subcategory', 'frozen-food');
    await pick('#seller-add-category-type', 'meatball'); await sleep(1500);
    await click(page.getByRole('button', { name: 'Continue', exact: true }), 900); await sleep(2500);   // step 2
    await click(page.locator('#seller-add-price'), 700); await page.keyboard.type('9000', { delay: 120 });
    await click(page.locator('#seller-add-stock-qty'), 600); await page.keyboard.type('20', { delay: 120 });
    await click(page.locator('#seller-add-weight-kg'), 600); await page.keyboard.type('0.5', { delay: 120 }); await sleep(2000);
    await click(page.getByRole('button', { name: 'Continue', exact: true }), 900); await sleep(4500);   // step 3: review (no halal claim ticked)
    if (process.env.KH_NO_SUBMIT) return;                                      // dry run: stop before saving
    await click(page.getByRole('button', { name: 'Submit for review', exact: true }), 900);
    await page.waitForURL(/\/seller\/products/, { timeout: 60000 }); await page.waitForLoadState('networkidle'); await sleep(5500);  // listed as pending review
  }, {
    prep: async page => {                                                      // never two demo products
      await page.goto(SITE + '/seller/dashboard', { waitUntil: 'networkidle', timeout: 120000 });
      if ((await myDemo(page)).length) throw new Error('A "' + DEMO + '" product already exists: delete it first');
    },
    after: async page => {                                                     // delete the demo product, then check
      if (!(await myDemo(page)).length) return;
      await page.goto(SITE + '/seller/products', { waitUntil: 'networkidle' }); await sleep(1500);
      const btn = page.locator(`button[data-action="delete"][data-name="${DEMO}"]`).first();
      await btn.click(); await sleep(400); await btn.click(); await sleep(3000);  // the site asks for a second click
      const left = await myDemo(page);
      if (left.length) console.error('!!! DEMO PRODUCT NOT DELETED, ids ' + left + ': delete it by hand');
      else console.log('demo product deleted');
    },
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
