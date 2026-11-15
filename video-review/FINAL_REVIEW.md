# Final Review: videos and site (2026-11-15)

Reviewer: an independent agent that did not make these videos or the site. I followed `REVIEW.md`.
I changed no project file. I only wrote this report and the pictures in `video-review/frames/review-2026-11-15/`.
What I reviewed: the 5 videos in `assets/videos/` (commit 1ca0194, the same files as the live site: sizes match byte for byte) and the live site https://hongrinrasmey.github.io/.

**Short answer: not ready to share yet. Two things block it.**

1. **Critical (privacy):** in the KH Halal promo, **one frame at 00:25.633** shows your checkout email, phone number, street, district and province **with no blur**. It is the moment you click "Continue to payment". The video is live on your site.
2. **Major (site):** once a visitor turns the sound **off** with the Sound button, **every video they open after that does not start**. It shows the still picture and waits at 0:00. This is on the live site too.

Both are technical fixes (small, I can do them after your OK). Everything else is Minor.
idevo and RielTrack (both versions) are in good shape.

---

## 1. Summary table

Scores are 1 to 10. **Ready** = no Critical or Major issue and every score 8 or more.
"Audio" is measured only (loudness, peaks, timing): I cannot hear. Please listen to the moments in section 5.
"Playback" here is the file itself. The site's player problem is in the Site row.

| Video / page | Status | Accuracy | Readability | Motion | Polish | Audio | Playback |
|---|---|---|---|---|---|---|---|
| KH Halal promo (16:9) `kh-halal-marketplace-promo.mp4` (56.0 s; phones play this one too) | ❌ Problem | 3 | 7 | 8 | 7 | 8 | 10 |
| idevo promo (16:9) `idevo-promo.mp4` (45.67 s) | ✅ Ready | 9 | 8 | 8 | 8 | 8 | 10 |
| idevo promo (phone) `idevo-promo-mobile.mp4` (45.67 s) | ✅ Ready | 9 | 8 | 8 | 8 | 8 | 10 |
| RielTrack promo (16:9) `rieltrack-promo.mp4` (37.57 s) | ✅ Ready | 8 | 9 | 8 | 8 | 8 | 10 |
| RielTrack promo (phone) `rieltrack-promo-mobile.mp4` (37.57 s) | ✅ Ready | 8 | 9 | 8 | 8 | 8 | 10 |
| Live site https://hongrinrasmey.github.io/ | ⚠️ Fix needed | 10 | 9 | 9 | 8 | 5 | 6 |

Counts: **1 Critical, 1 Major, 7 Minor**, plus optional ideas and 2 open owner questions from the last review.

Compared with the last review (2026-11-14): the old Critical (district + province) is fixed in the normal checkout frames. Items 8 (QR), 9 (soft cuts), 9b (keyframes) and 10 (sound) are done and measure well. The new Critical comes from the new "start on the real click" part before the KHQR page (added 2026-11-14).

---

## 2. Issues, most serious first

Format: **[Severity] video · mm:ss.s · what · why · fix · technical (I can fix) or creative (needs your OK)**.

### 2.1 Critical

**C1. [Critical] KH Halal promo · 00:25.633 (one frame, frame number 769) · checkout details not blurred**
- **What:** the click on "Continue to payment" ("Redirecting...") is still the checkout page, but the checkout blur boxes have already switched off and the payment-page blur boxes are on instead (in the wrong places). For one frame (33 ms) your **email address, phone number, street, district and province** are sharp and readable. Every other frame from 20.6 s to 31.7 s is blurred (I measured the sharpness of the 4 field rows in every frame).
- **Why it matters:** your rule is "blur email, phone, address". Anyone who pauses or steps frame by frame can read them, and the file is public on your site. The email shown is not the one on your site.
- **Cause:** in `video-studio/kh-halal-marketplace.json` the 4 checkout blurs end at recording time **91.6 s**. The KHQR chapter clip `[90.75, 92.2, 1.5]` plays 1.5x, so frame 769 = recording 91.65 s, and the page only changes at about 91.7 s.
- **Fix (technical):** let the 4 checkout blurs run to about **91.8 s** (`"to": 91.8`; overlapping with the payment blurs for a moment is harmless). Re-render + re-mix the KH promo, then re-check every frame 20.6-31.7 s with the same sharpness scan, and push. The silent copy `assets/videos/silent/kh-halal-marketplace-promo.mp4` has the same frame (it is not online; the re-render replaces it).
- **Also know:** the old file stays in your public GitHub history (commit 82d91db). Removing it from history means rewriting git history: that is your choice; I do not suggest doing it without talking first.
- **Still (the values are blurred again inside the red box, so this report does not repeat them):** `frames/review-2026-11-15/C1-kh-promo-00m25.633s-checkout-details-unblurred-1-frame.jpg`

### 2.2 Major

**M1. [Major] Live site · video pop-up · after the Sound button is turned off, the next videos do not start**
- **What:** open a video (it plays with sound, as you chose), press **Sound** to turn it off, close, open another video: it stays on the still picture at 0:00 and does not load (I waited 5 s). Every video after that does the same until the page is reloaded. The same happens if the visitor uses the player's own mute button. Tested in Edge, local and live, mouse and keyboard.
- **Why it matters:** you decided "videos play when the pop-up opens; the Sound button only mutes". A visitor who mutes once (very common) gets videos that look broken. They can still press play, but many will not.
- **Cause:** `js/main.js` line 375 only calls `player.play()` when the video is **not** muted: `if (autoplay && !yt && !player.muted) player.play()...`. When it is muted it relies on the `autoplay` property, which Edge does not act on here (with `preload: 'none'`).
- **Fix (technical, one line):** call `play()` in both cases, for example `if (autoplay && !yt) player.play().catch(...)` (the catch already falls back to muted). Then re-run the Edge test at the 6 sizes.
- **Still:** `frames/review-2026-11-15/M1-site-after-mute-next-video-does-not-play.jpg`

### 2.3 Minor

**m1. [Minor] Short labels (under the 1.5 s rule)**
- KH promo · 00:16.0-00:17.2 · "ENGLISH · ខ្មែរ" is fully readable for about 0.9 s (visible about 1.2 s with its fades). The last review asked for 1.5 s; the fix gave a 1.65 s span, but that span includes the fade in and out.
- idevo 16:9 and phone · 00:37.0-00:38.0 · "ENGLISH AND ខ្មែរ" is readable for about 0.8-0.9 s, then the Khmer tap at 38.33 s.
- **Fix (technical):** start each highlight about 0.6 s earlier in the recording (KH spot `from` 45.6 -> 45.0 with the clip starting earlier; idevo spot `from` 86.1 and the 1x part a little longer before the 4x part). Each video gets about 0.5 s longer.
- **Stills:** `m01-kh-promo-00m16.0-17.2s-khmer-label-about-1s.jpg`, `m01-idevo-mobile-00m37.0-38.0s-khmer-label-about-1s.jpg`, `m01-idevo-16x9-00m37.0-38.0s-khmer-label-about-1s.jpg`

**m2. [Minor] KH promo · 00:07.3-00:07.7 and 00:20.7-00:21.1 · half-loaded pages**
- **What:** after "View All", one blank white frame (7.3), then about 0.1 s of the message **"No products match these filters"** (7.4), then grey loading boxes (7.5), then the products (7.7). The checkout page also shows grey loading boxes for about 0.4 s (20.7-21.1). (The 0.1 s white page while the payment page loads, 25.67-25.73, is known.)
- **Why:** your QA rule says "no half-loaded page"; "No products" is the wrong message to flash in a shop promo, even briefly.
- **Fix (technical):** skip those recording frames with a short `join` (or a `dissolve` over them).
- **Stills:** `m02-kh-promo-00m07.3-07.7s-no-products-flash-then-skeleton.jpg`, `m02-kh-promo-00m20.5-21.6s-checkout-skeleton-blurs-ok.jpg`

**m3. [Minor] KH promo · 00:22.5-00:25.0 and 00:48.0-00:49.5 · labels cover page text**
- "DELIVERY FEE" (placed above the box) covers the coupon "Apply" button and the top half of the **Subtotal** row. "PENDING ADMIN REVIEW" covers the name of the next product row.
- **Fix (technical):** move them to the left side (`"side": "left"`) or a little up.
- **Stills:** `m03-kh-promo-00m23.5s-delivery-fee-label-over-subtotal.jpg`, `m03-kh-promo-00m48.8s-pending-label-over-row.jpg`

**m4. [Minor] KH promo outro · 00:52.5-00:56.0 · the QR code is smaller than in the other videos**
- **What:** the KH address is short, so its QR has fewer squares and is drawn about **173 px** wide; idevo and RielTrack are **221 px**. With OpenCV it decodes down to 60 % size (KH) vs 50 % (others). A real phone camera usually does better, but the KH one is the hardest to scan from a laptop across a room.
- **Fix (technical):** draw the KH QR with bigger squares (7-8 px) so all three look the same size.
- **Still:** `m04-qr-size-kh-173px-vs-idevo-221px.jpg`

**m5. [Minor] Docs out of date: `video-studio/CREDITS.md` (and `FACTS.md`)**
- `CREDITS.md` still names the old songs ("Acoustic Corporate Startup Promo", "Calming Ambient Technology", "Minimal Technology") and says "the KH full demo is silent". The real songs are **Fashion Minimal** (penguinmusic), **Product Launch Review** (ARPMedia), **Modern Commercial** (AtlasAudio), plus the effect kit. `FACTS.md` still describes the full demo as an output file (it was removed).
- **Why:** REVIEW.md asks for a credit line for every track; if you ever post a video elsewhere you would copy wrong credits.
- **Fix (technical):** update both files (no re-render).

**m6. [Minor] Licence proof is text only**
- `video-studio/licenses/*.md` has each page URL, date and licence text (all 3 songs: OK, no AI label, no vocals). There are **no screenshots or Pixabay licence certificates** (Pixabay blocked automated browsers). AUDIO.md asks for a screenshot/PDF. All three songs are "Content ID registered": only matters on YouTube.
- **Fix (you):** open each Pixabay page while logged in and save the licence certificate into `video-studio/licenses/`.

**m7. [Minor, still open from last review] Your decisions are still pending**
- M9 (push-in cuts off the top of the phone in idevo/RielTrack 16:9 during highlights) and M11 (RielTrack: income goes to $1,000.00 at 00:16, but the Reports screen at 00:21 still shows $850.00 / +$797.30 because it was recorded before the income take). Not new; listed so they are not forgotten.

---

## 3. Facts table (everything said on screen)

Sources: `video-studio/FACTS.md`, GitHub releases checked today, live pages checked today (HTTP 200).

| On-screen claim | Source | OK? |
|---|---|---|
| KH hook "One marketplace. / Two sides. / Every product reviewed." · SHOPPER · SELLER | FACTS.md (owner OK 2026-11-15) | ✅ |
| "Halal clothing and dry food" | Live site hero | ✅ |
| "Add to cart, no account needed" · IN THE CART AS A GUEST | FACTS.md, recording signed out | ✅ |
| "Full Khmer version" · ENGLISH · ខ្មែរ | FACTS.md | ✅ |
| "Checkout" · DELIVERY FEE | FACTS.md | ✅ |
| "Pay with KHQR" · KHQR BANK QR · IN RIEL; stopped before "Place order" | FACTS.md | ✅ |
| "Works on phones too" · DESKTOP / PHONE | FACTS.md (full demo row, same footage) | ✅ |
| "A dashboard for every seller" · SALES · ORDERS · REFUNDS | FACTS.md | ✅ |
| "Every product at a glance" · LISTING QUALITY + STATUS | FACTS.md | ✅ |
| "Add a product in three steps" · PRODUCT · PRICE & STOCK · REVIEW | FACTS.md | ✅ |
| "Reviewed before it goes live" · PENDING ADMIN REVIEW | FACTS.md | ✅ |
| KH outro: "Halal products from verified sellers in Cambodia." · WEB · Khmer + English · Try it live · kh-halal-marketplace.onrender.com | FACTS.md; site 200 | ✅ |
| KH QR -> https://kh-halal-marketplace.onrender.com/ | Decoded from the frame; loads (200) | ✅ |
| idevo hook "Describe what to learn in idevo. / AI drafts the course." | FACTS.md | ✅ |
| "Describe it in one sentence" · FILLED IN BY AI; "AI plans the modules" · AI DRAFT TO CHECK; "AI writes the lessons" · LABELLED AI DRAFT; "Short lessons with a check" · ANSWER + REASON | FACTS.md | ✅ |
| "Remember it longer. / Study offline. No account." | FACTS.md | ✅ |
| "Flashcards that come back" · SPACED REPETITION; Again 10 min · Hard 1 day · Good 3 days · Easy 4 days | FACTS.md (read from the screen) | ✅ |
| "Use it in Khmer" · ENGLISH AND ខ្មែរ | FACTS.md | ✅ |
| idevo outro: "AI-drafted lessons, flashcards and spaced repetition." · ANDROID · Early build · v0.6.4 · AI runs on my server · Download APK | FACTS.md; latest release is **v0.6.4** (checked today) | ✅ |
| idevo QR -> Idevo-Downloads/releases/latest | Decoded; redirects to tag v0.6.4 (200) | ✅ |
| RielTrack hook "Spend in dollars. / Pay in riel. / Track both." | FACTS.md | ✅ |
| "Your month at a glance" · DOLLARS AND RIEL; "Add an expense in riel" · 12,000 ៛ ≈ $2.93; "Add income too" · MONTHLY INCOME; "Every transaction in one list" · SEARCH AND FILTER BY CURRENCY; "Compare with last month" · THIS MONTH VS LAST MONTH; "Stay inside your budget" · MONTHLY LIMIT · ON TRACK; "No account. / No cloud. / No ads."; "Use it in Khmer" · LABELS IN ខ្មែរ | FACTS.md | ✅ |
| RielTrack outro: "Track spending in US dollars and Cambodian riel." · ANDROID · v1.6 · Android 8.0+ · Download APK | FACTS.md; latest release is **v1.6** (checked today) | ✅ |
| RielTrack QR -> RielTrack-Downloads/releases/latest | Decoded; redirects to tag v1.6 (200) | ✅ |
| Footer "Hong Rinrasmey · hongrinrasmey.github.io" (all 5) | Live site 200 | ✅ |

Names exact in all 5 (KH Halal Marketplace, idevo, RielTrack). Tags/CTAs right (KH = WEB + "Try it live" orange; idevo/RielTrack = ANDROID + "Download APK" orange). No admin screens in KH. Khmer text renders (no boxes) in every Khmer shot I looked at. No typos found (I read every caption and label; there is no OCR tool on this PC, so this was by eye).

---

## 4. Optional improvements (not faults; your choice, creative)

1. **KH "Every product at a glance" (00:37.5-41.5):** the highlighted column shows "50 % Needs work" for every one of your products. A buyer or employer may read that as "the shop's listings are weak". Option: highlight Status + Stock instead, or improve the listings before the next recording.
2. **KH on phones:** phones play the 16:9 KH promo in a box about 310 x 174 px (360 px screen). Labels are hard to read there. You chose this on purpose (phone version dropped). Only mentioning it.
3. **KH payment (00:26.0-27.1):** the payment page stands still for about 1 s before the cursor moves. A 0.3-0.5 s trim would tighten it.
4. **First frame** of each video is the plain dark background (accepted by you last time, M13). Posters cover it on the site.
5. Delete the leftover `assets/videos/silent/kh-halal-marketplace.mp4` (the removed full demo; local only, git-ignored).

---

## 5. Moments for you to watch and listen to yourself

I measured the sound, but only your ears can judge it. Please watch these **with sound**, full screen:

| Video | Time | What to check |
|---|---|---|
| KH | 00:25.4-00:25.8 | (after the fix) the click into the payment page: no sharp details |
| KH | 00:00-00:02 | music start (fades in over 0.4 s) and the 3 headline hits |
| KH | 00:07.2-00:07.8 | the "View All" page load (m2) |
| KH | 00:28.0 | the music edit point (two parts of the song joined) |
| KH | 00:31.6-00:34.2 | desktop/phone panels and the whoosh, then the seller-side glitch sound |
| KH | 00:48.0, 00:49.9 | "Pending admin review" notify sound; finale whoosh |
| KH | **00:53.9-00:56.0** | **the song itself has a stop of about 0.4 s (00:54.0-00:54.4, near silence) and then a last phrase that fades.** Decide if it sounds like a natural ending or like a drop-out |
| idevo | 00:00-00:02.6 | hook + music start |
| idevo | 00:10.4-00:11.2, 00:15.4-00:18.5 | the quiet "AI working" shimmer under the music |
| idevo | 00:23.3 | music edit point |
| idevo | 00:26.1, 00:31.9, 00:38.3 | notify, card flip, Khmer tap |
| idevo | 00:42.2-00:45.7 | outro and ending fade |
| RielTrack | 00:00-00:01 | punchy hook (music starts at once, no blast measured) |
| RielTrack | 00:06.3-00:09.5, 00:13.3-00:15.6 | typing sounds over the keypad |
| RielTrack | 00:21.4 | music edit point |
| RielTrack | 00:27.8-00:28.7 | "No account. No cloud. No ads." hits |
| RielTrack | 00:34.0-00:37.6 | outro and ending |
| Site | any | mute one video, open the next (M1, after the fix) |

**Sound-off test:** every video still makes full sense muted: every point is in a caption or label.

---

## 6. Detailed results (the checks behind the scores)

### 6.1 Technical check of each file

| File | Size | Length | Video | Audio | Keyframes | Decode | moov first |
|---|---|---|---|---|---|---|---|
| kh-halal-marketplace-promo | 6.38 MB | 56.000 s | H.264 High, 1920x1080, yuv420p, 30/30 fps CFR | AAC LC 48 kHz stereo | 30, max gap 2.0 s | 0 errors | yes |
| idevo-promo | 6.18 MB | 45.667 s | same, 1920x1080 | same | 24, max 2.0 s | 0 errors | yes |
| idevo-promo-mobile | 8.52 MB | 45.667 s | 1080x2340 | same | 27, max 2.0 s | 0 errors | yes |
| rieltrack-promo | 4.79 MB | 37.567 s | 1920x1080 | same | 22, max 2.0 s | 0 errors | yes |
| rieltrack-promo-mobile | 6.60 MB | 37.567 s | 1080x2340 | same | 23, max 2.0 s | 0 errors | yes |

- Lengths match `index.html` ("about 56", "about 46", "about 38 seconds").
- Silent copies exist in `assets/videos/silent/` for all 5.
- Sizes are reasonable (the phone files are the largest, as before).
- Posters: right sizes (1920x1080, 1080x2340), sharp, 32-56 KB; KH = product page with "Add to cart", idevo = "AI writes the lessons", RielTrack = "Your month at a glance". Good first impressions. `info-posters-all-5.jpg`.
- First frame: plain dark background for about 0.2 s, hook text readable by 0.3-1.0 s.
- Last 1.5 s: still outro in all 5 (frame change about 0 from 2 s before the end).

### 6.2 Audio (measured; owner decisions applied)

| File | Integrated | True peak | LRA |
|---|---|---|---|
| KH promo | -18.8 LUFS | -2.6 dBTP | 4.4 LU |
| idevo + phone | -18.4 LUFS | -2.9 dBTP | 3.7 LU |
| RielTrack + phone | -18.5 LUFS | -4.3 dBTP | 8.0 LU |

- About -18.5 LUFS instead of -16: **your decision** ("lower the song a little", `musicDown: 3`). Information, not a fault. All within 0.4 LU of each other; no clipping (peaks -2.6 dBFS or lower).
- Fade in 0.4 s at the start (no blast); clean 1.2 s fade at the end (AUDIO.md said ~1.5 s: close enough).
- Desktop and phone versions have **exactly the same sound** (identical audio checksum) for idevo and RielTrack.
- Effect timing: the sound onsets of all 27 taps/clicks land within -16 to +25 ms of the visual tap (under one frame = 33 ms). Label and chapter sounds within about ±0.15 s (they are soft swells, harder to time-measure).
- Song licences: all 3 songs in `video-studio/licenses/pixabay-2026-11-14-one-track.md` (OK, no AI label, instrumental). Credits file out of date (m5).

### 6.3 Privacy check

- KH checkout and payment: the email, phone, address, district and province rows were measured in **every frame** from 20.0 to 32.0 s. Blurred everywhere **except frame 769 (00:25.633)** (C1).
- Header name chip blurred in every signed-in shot. The seller pages show "Hong Rinrasmey" (your public name, as approved).
- idevo / RielTrack: only sample data; no notifications or personal data seen.

### 6.4 QR codes

All 5 decode from the last frame to the right page (OpenCV `QRCodeDetector`; `zbarimg`/`pyzbar` are not installed). Smallest size that still decodes: KH 60 %, idevo/RielTrack 16:9 50 %, phone versions 40 %. Phone versions: QR about 295 px wide on a 1080 px frame: big enough to scan from another screen.

### 6.5 Motion

- Brightness step scan (every frame): largest step 24.2 (KH 00:49.9 finale, RielTrack phone 00:33.8 outro), under 25. No flashing. Largest whole-frame change 28.9 (KH 00:10.9, a page change inside a crossfade).
- Repeated frames during motion: KH 00:25.70 (payment page loading, known), KH 00:49.10 (known), RielTrack 00:09.83 (both versions, known). All are a single frame at the start of a movement: not stutter.
- Holds: KH 00:26.0-27.1 (payment page still, see optional 3), KH 00:43.7-44.9 (add-product review step, fine), idevo phone 00:40.0-41.7 (Khmer home before the outro, fine).
- Banding: the dark background uses only about 5 brightness levels (8-13 of 255). At normal brightness it looks smooth; on a very bright screen faint rings around the glow are possible. Not an issue at normal viewing.
- Pacing: KH right overall (KHQR and add-product slightly slow, see optional 3); idevo right; RielTrack brisk but readable.

### 6.6 Regression check (against the previous pushed videos, commit aa9a931)

- RielTrack 16:9 and phone, frame by frame: only these parts changed: smoothing frames (9.93, 10.40, 22.2-22.6 s), highlight fade at chapter ends (19.7-20.3, 26.7-27.2 s, the `spotOut` change) and the outro (from 34.2 s: new outro text + QR). All intended.
- idevo: 1.33 s shorter (the frozen "Setting up..." / "Plan the course" waits were cut on 2026-11-14, M10 of the last review), new hook line, "Study offline", QR outro. The rest of the picture matches (alignment error under 1 grey level).
- KH: re-cut by you many times since; checked from scratch instead.

### 6.7 Consistency (desktop vs phone)

idevo and RielTrack: same captions, labels, outro text and sound. Phone versions put labels above the phone (by design).

### 6.8 Freeze-frame test (5 frames per promo)

From the 1-frame-per-second sheets (`sheet-1fps-*.jpg`): KH 9, 23, 35, 40, 44 s look good as stills; KH 19 and 31 s are mid-crossfade (not poster material). idevo 6, 12, 20, 27, 34 s good. RielTrack 4, 11, 16, 23, 33 s good. Current posters are fine.

### 6.9 Site

- `node tools/check.mjs`: **All checks passed**, no console errors.
- Edge (Playwright, 1920, 1440, 1366, 768, 390, 360 px), local and live: right file at every size (phones: idevo/RielTrack tall versions, KH 16:9), poster shown first, no video downloads before a click, sound on when the pop-up opens, Sound button labelled "Sound" with `aria-pressed`, works with the keyboard (Space), video fits the screen, Esc closes, focus goes back to the button. **114/126 checks passed; the 12 failures are all M1** (the video opened after a mute does not start).
- `index.html` video descriptions match the real lengths and chapter lists.
- Links: live demo, both APK pages, GitHub, Telegram: 200. Email `mailto:` correct. LinkedIn row hidden (no link yet). The live `index.html` equals the local one.
- **Lighthouse: could not run.** `npx lighthouse` is not installed and I may not install anything. The last review measured mobile 99/100/100/100 and desktop 100 x4; nothing big has changed since (the site code change since then is the sound button).

---

## 7. Your text slots (still empty; I did not fill them)

These are hidden in comments, so visitors do not see them:

| # | Where | Slot |
|---|---|---|
| 1 | `index.html` line 216, KH Halal card | "the hardest problem you solved here, and what you learned from it" |
| 2 | `index.html` line 269, idevo card | same |
| 3 | `index.html` line 321, RielTrack card | same |
| 4 | `index.html` line 369, About | "what you're learning now, the job you want, what you enjoy building" |
| 5 | `index.html` line 430, Contact | your LinkedIn name (+ the link) |
| 6 | `CLAUDE.md` §3 | short bio (2-3 sentences) |
| - | Contact | résumé PDF (row hidden until `assets/resume.pdf` exists) |

Tests: people test sheet ready (`video-review/PEOPLE_TEST.md`), not run yet. Cold-viewer test done (`video-review/REPORT.md`: all 3 apps understood; fixes 2-6 applied, I confirmed the new captions are in the videos). Social compression test skipped (your answer: no social media).

---

## 8. Checks I could not run, and why

- **Listening** to the sound (I can only measure it): see section 5.
- **Lighthouse** (not installed; installing is not allowed).
- **OCR** for typos and personal data (no tesseract): I read every caption by eye and measured blur sharpness in the KH checkout/payment frames.
- **zbarimg / pyzbar** for QR codes: used OpenCV's QR reader instead. A real phone scan is still worth one try per video.
- Real phones and Safari: tested in Edge only.

## 9. Next step

Please tell me if I may fix **C1** (blur timing, KH re-render + re-mix, frame scan, push) and **M1** (one line in `js/main.js`, Edge test). The Minor ones (m1-m5) are technical too; m6 is yours. After the fixes I will re-run the QA for the changed video and the site, and update `CLAUDE.md` + `PROGRESS-LOG.md`.
