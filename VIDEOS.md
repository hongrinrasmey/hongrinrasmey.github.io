# VIDEOS.md: demo video rules

The three "Watch video" buttons play real recordings of the apps with motion graphics added.
How to record: README ("Demo videos"). How to edit and render: `video-studio/README.md`. This file is the rules and the QA checklist.

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

## 3. Files
| File | Size | Where it plays |
|---|---|---|
| `<slug>-promo.mp4` | 1920x1080, about 35-55 s | "Watch video", screens wider than 640px |
| `<slug>-promo-mobile.mp4` | 1080x2340 (`render.js --portrait`) | "Watch video", phones (640px and narrower) |
| `kh-halal-marketplace.mp4` | 1920x1080, numbered chapters | "Full demo" (KH Halal only, hidden on phones) |
| `*-poster.webp` | same shape as its video | before play; drawn clean (no highlight) |

H.264 High (x264 slow, CRF 20-25: the KH files use 25 because the slow push-in changes every frame), yuv420p,
30 fps, no audio, `+faststart`. KH Halal on phones uses the real mobile site (`khm-*` take), not a crop of the desktop.

## 4. Motion style (`video-studio/promo.html`)
Dark `#0C0A09` stage, orange `#FF6B35` accent, Geist + Geist Mono. Hook text first, the device rises in, one highlight
per beat in the app's own colour, speed ramps only inside long waits, slow push-in (1.1-1.3x) on desktop beats so the
website text is readable, every highlight inside the final view, seller sidebar kept in view. No sway, no particles,
no music. The app is always the biggest, brightest thing on screen; one effect at a time.

## 5. QA checklist (every new render)
1. Frame sheet (1 frame per 1-2 s): story order, captions match the screen.
2. Every chapter-start frame and every cut: no half-loaded page, no fade ghost, no blank route frame
   (entropy scan; Android route changes leave one blank frame right at the tap).
3. `tapOffset`: compare scene-change times with the tap log.
4. Full-size crops: text sharp, nothing cut at a window edge, labels not over the key result.
5. Flash check: no more than 2 big brightness changes in any second.
6. Browser test (Edge, H.264) at 1440x900, 1366x768, 1920x1080, 768x1024, 390x844, 360x800: right file, pop-up shape, poster,
   plays, fits, Esc closes, focus returns, no console errors.
7. Watch it once at normal speed.
