# VIDEOS.md: demo video rules

The three "Watch video" buttons play real recordings of the apps with motion graphics added.
Commands to re-make them are in README ("Demo videos"). This file is the rules and the QA checklist.

## 1. What a video must do
- Explain the app, not click through it: 5-10 **chapters**, one point each.
- Each chapter: caption `02 / 08` + the point (bold) + one plain sentence about what it does for the user,
  then the action, then a 3-5 s hold on the result with **one** highlight around it.
- Real footage only. Captions and labels state only what is on screen. Sample data only, never personal data.

## 2. Methods
- **Method A, Android apps** (RielTrack, idevo): the `Pixel_API37` emulator only, never a real phone
  (`scripts/record-rieltrack.sh`, `scripts/record-idevo.sh`). Demo-mode status bar 9:41, turned off after.
- **Method C, web app** (KH Halal): the live site in a real **1920x1080** browser window
  (`scripts/record-kh-halal-marketplace.js`), and at a real phone size (Pixel 7, mobile layout) for the phone version
  (`scripts/record-kh-halal-mobile.js`; never opens the Account page on camera: it shows email, address, phone). Logins only from environment variables. Checkout and the KHQR
  payment page are shown (owner, 2026-11-13) but "Place order" is never pressed and order/payment requests are
  blocked; email, phone and address are blurred. Never filmed: messages, notifications, orders with buyer names,
  payouts, verification, profile pages. Signed-in usernames are blurred (`blurs` in the config).
- Owner rules (2026-11-13): idevo shows making a path and its lessons with the built-in AI (`scripts/record-idevo-ai.sh`;
  the AI server address and token come only from the env vars `IDEVO_AI_URL` / `IDEVO_AI_TOKEN`, typed off camera,
  wiped by `pm clear` after; never in a file) and RielTrack shows adding an income (`scripts/record-rieltrack-income.sh`),
  both sample data, deleted after. (`scripts/record-idevo-create.sh` = the same without AI, not used now.)
- Scripts pause on purpose (3-5 s on every result) so the edit has real footage to hold on.

## 3. Sizes
| File | Size | Where it plays |
|---|---|---|
| `<slug>.mp4` web | 1920x1080 | screens wider than 640px |
| `<slug>.mp4` Android | 1080x2340 | screens wider than 640px |
| `<slug>-short.mp4` | 1080x2340, about 40 s, 5-6 key chapters | phones (640px and narrower) |
| `<slug>-poster.webp` | same shape as its video | before play; drawn clean (no highlight, no progress line) |

H.264 (x264 slow, CRF 18-20), no audio, `+faststart`. The KH Halal short is a moving window into the desktop take
(`"cover": true`), so phones see readable text instead of a tiny 16:9 box.

## 4. Motion style (`scripts/motion/compose.html`)
Dark `#0C0A09` stage, orange `#FF6B35` accent, Geist + Geist Mono. Chapter hold 0.6 s, caption in 300 ms / out 200 ms,
highlight draws itself in 450 ms with a 35% dim, soft tap rings, zoom at most about 1.4x, no sway, no particles,
no music. The app is always the biggest, brightest thing on screen; one effect at a time.

## 5. QA checklist (every new render)
1. Frame sheet (1 frame per 1-2 s): story order, captions match the screen.
2. Every chapter-start frame and every cut: no half-loaded page, no fade ghost, no blank route frame
   (entropy scan; Android route changes leave one blank frame right at the tap).
3. `tapOffset`: compare scene-change times with the tap log.
4. Full-size crops: text sharp, nothing cut at a window edge, labels not over the key result.
5. Browser test (Edge, H.264) at 1440x900, 1366x768, 1920x1080, 390x844: right file, pop-up shape, poster,
   plays, fits, Esc closes, focus returns, no console errors.
6. Watch it once at normal speed.
