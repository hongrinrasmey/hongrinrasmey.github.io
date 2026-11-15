# Final Review: videos and site (2026-11-14)

Reviewer: an independent agent that did not make these videos. I followed `REVIEW.md`.
I changed no existing file. I only made this report and the stills in `video-review/frames/`.

**Short answer: not ready to share yet.**
Two things block it:

1. **One Critical privacy issue** in the two KH Halal desktop videos: the delivery address's **district and province** are not blurred (the street, phone and email are blurred).
2. **Three planned jobs are still not done** (from `NEXT_STEPS.md`): item 8 (QR codes in the outros), item 9 (soft crossfades on the 3 hard white/green cuts in the KH videos) and item 10 (sound, from `AUDIO.md`). I do **not** count these as faults in the current videos. But you said "with sound", and right now there is no sound to review.

Everything else I found is Minor: small polish and timing points.
The site itself is in good shape: Edge 24/24 on the live site, Lighthouse 100 in almost every category, and `check.mjs` passes.

---

## 1. Summary table

Scores go from 1 to 10. **Ready** means zero Critical or Major issues and every score at 8 or higher.
"Audio" is **n/a**: no video has sound yet (NEXT_STEPS item 10). No video counts as "Ready to share" until items 8–10 are done. The ✅ below only means "ready as the current silent video".

| Video / page | Status | Accuracy | Readability | Motion | Polish | Audio | Playback |
|---|---|---|---|---|---|---|---|
| KH Halal promo (16:9) `kh-halal-marketplace-promo.mp4` | ❌ Problem | 6 | 7 | 7 | 7 | n/a (no sound yet) | 10 |
| KH Halal promo (phone) `kh-halal-marketplace-promo-mobile.mp4` | ⚠️ Fix needed | 9 | 8 | 7 | 8 | n/a (no sound yet) | 10 |
| KH Halal full demo `kh-halal-marketplace.mp4` | ❌ Problem | 6 | 7 | 7 | 7 | n/a (no sound yet) | 10 |
| idevo promo (16:9) `idevo-promo.mp4` | ⚠️ Fix needed | 9 | 8 | 7 | 7 | n/a (no sound yet) | 10 |
| idevo promo (phone) `idevo-promo-mobile.mp4` | ⚠️ Fix needed | 9 | 8 | 7 | 8 | n/a (no sound yet) | 10 |
| RielTrack promo (16:9) `rieltrack-promo.mp4` | ✅ Ready (silent) | 8 | 9 | 8 | 8 | n/a (no sound yet) | 10 |
| RielTrack promo (phone) `rieltrack-promo-mobile.mp4` | ✅ Ready (silent) | 8 | 9 | 8 | 8 | n/a (no sound yet) | 10 |
| Live site https://hongrinrasmey.github.io/ | ✅ Ready (silent videos) | 10 | 9 | 9 | 9 | n/a (no sound yet) | 10 |

Counts: **1 Critical, 0 Major, 15 Minor**, plus 9 optional improvements.

### What blocks "Ready to share"
| Blocker | State |
|---|---|
| Critical C1: district + province not blurred (KH promo, KH full demo) | Fix needed (technical, about 10 minutes of config + 2 re-renders) |
| NEXT_STEPS item 8: QR codes in the 6 promo outros | Not done yet |
| NEXT_STEPS item 9: crossfades on the 3 KH hard cuts | Not done yet (I measured a "before" baseline, see 2.3) |
| NEXT_STEPS item 10: sound (music + effects), `-silent` copies, website sound button, licences + `CREDITS.md` | Not done yet |
| NEXT_STEPS items 1–6: your own text (see section 7) | Not done yet (hidden on the page, so visitors do not see empty slots) |

---

## 2. Issues, most serious first

Format: **[Severity] video · mm:ss.s · what · why it matters · fix · technical (I can fix) or creative (needs your OK)**.
All times are in the finished video. Stills are in `video-review/frames/`.

### 2.1 Critical

**C1. [Critical] KH Halal promo (16:9) · 00:20.9–00:23.8 · and KH full demo · 00:25.1–00:29.2 (Checkout) + 00:29.2–00:32.5 (Payment)**
- **What:** the delivery address's **District** and **Province** fields are readable. The street line, phone and email are blurred, and the name shown is your own public name. The phone version is fine: its District field is empty and its Payment page is cut off above that row.
- **Why it matters:** these two fields are part of your home address. They show which district you live in, and your rules say "blur address". I count it as Critical because the brief asks for any unblurred address data to be Critical. It is a partial address (district level, not your street). If you are happy to show your district, tell me and it drops to "accepted".
- **Fix (technical):** add one more blur box over the District + Province row. In `video-studio/kh-halal-marketplace.json` and `kh-halal-marketplace-full.json`, add it on the Checkout page (source time 77.3–91.6, below the existing address box) and on the Payment page (source time 91.6–107.5, below the existing `y 916` box). Then re-render both videos and check the frames during the 1.4x KHQR zoom.
- **Stills** (I blurred the values again inside the red box, so this report does not repeat them):
  `frames/01-kh-promo-00m23.0s-district-province-visible.jpg`,
  `frames/02-kh-full-00m30.0s-district-province-visible.jpg`,
  `frames/03-kh-full-00m27.0s-checkout-district-province.jpg`

### 2.2 Major
None found.

### 2.3 Minor

**M1. [Minor] KH promo (16:9) · 00:12.2–00:13.1 and 00:18.2–00:18.9 · two labels are on screen for less than 1.5 s**
- **What:** "IDENTITY VERIFIED" is readable for about 0.9 s and "ENGLISH · ខ្មែរ" for about 0.7 s. The rule is at least 1.5 s.
- **Why:** nobody can read a label in under a second, so it only flickers.
- **Fix (technical):** start the identity highlight earlier, at about source 27.0 instead of 28.5. Start the Khmer clip at source 45.4 (like the full demo does) so the label holds about 1.6 s before the click at 47.3.
- **Stills:** `frames/04-kh-promo-00m11.9-13.3s-identity-label-too-short.jpg`, `frames/05-kh-promo-00m18.1-18.9s-khmer-label-too-short.jpg`

**M2. [Minor] KH promo (16:9) · 00:13.3 · zoom jump on the same page**
- **What:** at the cut from "Every seller is identity-verified" to "Add to cart", the same product page jumps from 1.3x zoom to 1x in one frame. It reads as a glitch, not a new scene. The full demo avoids this by zooming back out first.
- **Fix (technical):** add a zoom-out at the end of the identity beat, like the full demo's `cam` `[30.1, 1, 960, 540, 0.8]` (here about `[29.2, 1, 960, 540, 0.8]`).
- **Still:** `frames/06-kh-promo-00m13.27-13.30s-same-page-zoom-jump.jpg`

**M3. [Minor] KH promo 00:24.6 and KH full demo 00:27.0 · labels cover page text**
- **What:** "KHQR IN RIEL" sits on top of the "What happens next" text. "DELIVERY FEE" covers the **Total** row of the order summary (only "6.50)" peeks out). At 00:24.6 the 1.4x zoom also cuts the page title "Payment" at the top.
- **Why:** the label hides information the viewer may want, the total price in particular.
- **Fix (technical):** move these labels to the side (`"side": "right"` or `"left"`), or lift the KHQR zoom centre a little.
- **Stills:** `frames/07-kh-promo-00m24.6s-label-covers-page-text.jpg`, `frames/08-kh-full-00m27.0s-delivery-fee-label-covers-total.jpg`

**M4. [Minor] KH promo 00:28.50 and KH full demo 00:39.40 · dark dip after "Works on phones too"**
- **What:** the desktop + phone panels vanish in a single frame. The browser then fades up from almost black over about 0.3 s. In the full demo, brightness drops from 47 to 22 in one frame.
- **Why:** it looks like a tiny blackout between the shopper side and the seller side.
- **Fix (technical, engine opt-in):** fade the panels out over 0.2–0.3 s while the browser fades in, so the two overlap.
- **Stills:** `frames/10-kh-promo-00m28.50-28.70s-duo-exit-dark-dip.jpg`, `frames/09-kh-full-00m39.37-39.60s-duo-exit-dark-dip.jpg`

**M5. [Minor] KH promo 00:42.13→00:42.17 and KH full demo 00:58.90→00:58.93 · finale panels pop out**
- **What:** the SHOPPER/SELLER panels at the end go from visible to gone in one frame (brightness −31) before the outro title starts.
- **Fix (technical):** ease the panels to 0 over about 0.25 s.
- **Still:** `frames/11-kh-promo-00m42.10-42.20s-finale-panels-pop-out.jpg`

**M6. [Minor] KH promo + full demo · Khmer chapter (promo about 00:17.7–00:20.9, full demo 00:20.5–00:25.1) and both KH desktop posters · site logo cut off**
- **What:** the 1.1x push in the Khmer chapter (centre x 1048) cuts the "KH Halal" logo at the left edge. The studio README's own rule says x about 835. The full-demo poster (23.8 s) is one of those frames. The promo poster (13.1 s) is a 1.3x zoom of a product page, so the page and its header are cropped too.
- **Why:** the poster is the first thing people see. A cropped page with no logo is a weak first impression.
- **Fix:** move the push centre to about x 835 (technical). Pick new posters (creative: see Optional O3).
- **Stills:** `frames/12-kh-full-00m23.8s-khmer-chapter-logo-cut.jpg`, `frames/13-kh-promo-poster-13.1s-cropped-page.jpg`

**M7. [Minor] KH phone promo · 00:18.60–00:18.85 and 00:40.60–00:40.80 · images not loaded yet at a cut**
- **What:** the Shopping cart opens with one washed-out frame, then the hijab photo stays an empty grey box for about 0.3 s. On "Reviewed before it goes live", the meatball thumbnail is empty for about 0.2 s.
- **Why:** your QA rule says "no half-loaded page".
- **Fix (technical):** start those clips about 0.3 s later: cart clip 32.6 → about 32.95, pending clip 133.4 → about 133.7.
- **Stills:** `frames/14-kh-mobile-00m18.60-18.90s-cart-image-not-loaded.jpg`, `frames/15-kh-mobile-00m40.60-40.90s-product-thumb-not-loaded.jpg`

**M8. [Minor] idevo (both versions) · 00:43.87–00:43.97 · outro title appears over the phone**
- **What:** the white "idevo" title starts rising while the phone is still fading out. In the phone version it is printed on top of the app screen for about 3 frames. KH phone and RielTrack fixed exactly this with `"leadIn": 0.45`. idevo is the only promo without it.
- **Fix (technical):** add `"leadIn": 0.45` to the idevo `outro`.
- **Still:** `frames/16-idevo-00m43.83-43.97s-outro-title-over-phone.jpg`

**M9. [Minor] idevo + RielTrack (16:9) · during highlights (for example idevo 00:14.0–00:16.5 and 00:34.5–00:38.5; RielTrack 00:03.0–00:04.5, 00:11.0–00:12.5, 00:16.0, 00:23.0, 00:26.0, 00:32.0) · the push-in cuts off the top of the phone**
- **What:** `focus: 1.12` makes the phone (1051 px tall) taller than the 1080 px frame. The status bar and the top of the screen leave the frame. The earlier review fixed exactly this ("whole phone in frame", `sh` 1024), and the push-in brings it back.
- **Why:** it looks cropped by mistake, not framed on purpose.
- **Fix (creative, the push-in was approved):** lower `focus` to about 1.03, or accept the crop.
- **Stills:** `frames/17-idevo-00m36.0s-phone-top-cut-by-push-in.jpg`, `frames/18-rieltrack-00m11.6s-phone-top-cut-by-push-in.jpg`

**M10. [Minor] idevo (both) · 00:03.8–00:05.8 and 00:09.5–00:11.1 · frozen screens early in the video**
- **What:** the picture does not move at all for 2.0 s on "Setting up…" and for 1.6 s on "Plan with AI" before the planning starts. The screen recorder saved no new frames while the AI was thinking.
- **Why:** in the first 11 seconds this feels stalled. A visitor may think the video froze.
- **Fix (creative: changes approved cut timing):** cut those still stretches out with a `join`, as already done in chapter 4.
- **Still:** `frames/19-idevo-00m03.8-05.8s-frozen-setting-up.jpg`

**M11. [Minor] RielTrack (both) · 00:15.3–00:17.8 then 00:20.7 and 00:31.1 · the numbers go back**
- **What:** "Add income too" ends on income $1,000.00 and net +$947.30. The next chapters (Reports, Khmer Home) show income $850.00 and net +$797.30 again, because the income take was recorded separately.
- **Why:** a careful viewer sees money "disappear". The numbers are never captioned, so this is not a false claim, only a continuity slip.
- **Fix (creative):** move "Add income too" later (for example after "Stay inside your budget"), or accept it.
- **Still:** `frames/20-rieltrack-00m16.0s-vs-21.0s-income-numbers-go-back.jpg`

**M12. [Minor] RielTrack (both) 00:21.8–00:22.7, 00:09.8, 00:10.4 · KH phone 00:05.0, 00:05.2, 00:23.6, 00:23.8 · small judder in scrolls**
- **What:** in these scrolls one frame repeats every 3–4 frames. The screen recorder dropped frames, so the scroll stutters.
- **Fix (technical):** blend the missing frames on those clips (for example ffmpeg `minterpolate` on that clip only), or play the scroll slightly faster. Please watch these moments yourself.
- **Still:** `frames/23-rieltrack-00m22.17-22.50s-repeated-frames-in-scroll.jpg`

**M13. [Minor] All 7 videos · 00:00.0 · the first frame is blank**
- **What:** frame 1 is only the dark glow. The first words arrive at about 0.1–0.15 s.
- **Why:** on your site the poster hides this. On LinkedIn, Telegram or YouTube the first frame often becomes the thumbnail, so it would be an empty dark box.
- **Fix (technical):** show the first hook line already at frame 0.
- **Still:** `frames/22-all-videos-first-frame-blank.jpg`

**M14. [Minor] KH full demo · 00:29.2–00:37.0 · the sub-line says a bit more than the screen**
- **What:** the sub-line says "Pick a USD or KHR QR for **any Cambodian banking app**." The screen says "Pay from a … account in **any KHQR banking app**."
- **Fix (technical/factual):** change it to "…for any KHQR banking app." (`kh-halal-marketplace-full.json`, chapter 7 `sub`).
- **Still:** `frames/02-kh-full-00m30.0s-district-province-visible.jpg` (the sub-line is under the caption)

**M15. [Minor] KH phone promo · 00:31.33–00:31.70 · the flip has 4 frames just over the brightness line**
- **What:** my brightness scan measures steps of 25–27 per frame during the 0.6 s flip to the seller side. The log says "no step > 25". Different measuring methods can give slightly different numbers. It is one smooth dip and **not** flashing.
- **Fix (technical, optional):** make the flip 0.7 s.

---

## 3. Facts table

Every caption, label and outro line, checked against `FACTS.md`, the live site and your public GitHub (checked today with read-only `gh` commands and web requests).

| On-screen claim | Source | OK? |
|---|---|---|
| KH: "One marketplace. / Two sides. / Built on trust." · SHOPPER · SELLER | Headline you approved (FACTS) | ✅ |
| KH: "Halal clothing and dry food" | Live site hero "Halal Clothing & Dry Food" (on screen) | ✅ |
| KH: "Filter by halal claim" · HALAL CLAIM · VERIFIED SELLERS ONLY | Filter panel on screen; site says claims can be seller-declared, so "claim", not "certified" | ✅ |
| KH: "Every seller is identity-verified" · IDENTITY VERIFIED | Screen "Identity verified by marketplace"; approved caption (FACTS) | ✅ |
| KH: "Add to cart, no account needed" · IN THE CART AS A GUEST | Cart while signed out ("Login / Sign Up" in header) | ✅ |
| KH: "Full Khmer version" · ENGLISH · ខ្មែរ / WHOLE SITE IN KHMER | Language switch on screen, Khmer renders correctly (no boxes) | ✅ |
| KH: "Pay with KHQR" / "Check out, pay with KHQR" · KHQR IN RIEL | Payment page "Pay in KHR · KHR QR"; "Place order" never pressed | ✅ |
| KH: "Works on phones too" · DESKTOP · PHONE | Same live site, mobile layout | ✅ |
| KH: "A dashboard for every seller" · SALES · ORDERS · REFUNDS | Dashboard on screen; recent orders show order IDs only, no buyer names | ✅ |
| KH: "Add a product in three steps" · PRODUCT · PRICE & STOCK · REVIEW / REVIEW BEFORE SAVING | Add-product steps on screen | ✅ |
| KH: "Reviewed before it goes live" / "Waiting for admin review" · PENDING ADMIN REVIEW | "Pending review" on screen | ✅ |
| KH full demo sub-lines (11) | FACTS + screens. One wording point: "any Cambodian banking app" vs screen "any KHQR banking app" (M14) | ✅ (10) ❓ (1) |
| KH full demo: STOPPED HERE: NO ORDER PLACED | Recording stops before "Place order" (FACTS) | ✅ |
| KH outro: "Halal products from verified sellers in Cambodia." · WEB · Khmer + English · Try it live · kh-halal-marketplace.onrender.com | Approved tagline; card tags; URL returns 200 today (opens `/app/index`) | ✅ |
| idevo: "Describe what to learn. / AI drafts the course." | Approved hook (FACTS), app button "Plan the course", "AI draft" labels | ✅ |
| idevo: "Describe it in one sentence" · FILLED IN BY AI | Screen "Check what AI filled in, then tap Create." | ✅ |
| idevo: "AI plans the modules" · AI DRAFT TO CHECK | Screen "AI draft. It can be wrong…" | ✅ |
| idevo: "AI writes the lessons" · LABELLED AI DRAFT | Screen "AI draft (gpt-oss-120b). Check facts before relying on them." | ✅ |
| idevo: "Short lessons with a check" · ANSWER + REASON | Same AI lesson's "Check yourself", answer + reason | ✅ |
| idevo: "Remember it longer. / Offline. No account." | Approved headline; `Idevo-Downloads` README "No account and no analytics", "Works fully offline" | ✅ |
| idevo: "Flashcards that come back" · SPACED REPETITION · Again 10 min / Hard 1 day / Good 3 days / Easy 4 days | Rating buttons on screen; `index.html` "Spaced-repetition flashcards" | ✅ |
| idevo: "Use it in Khmer" · ENGLISH AND ខ្មែរ | README "English and ខ្មែរ"; Khmer renders correctly | ✅ |
| idevo outro: "AI-drafted lessons, flashcards and spaced repetition." · ANDROID · Early build · v0.6.4 · AI runs on my server · Download APK | Latest release today = **v0.6.4** (2026-11-12); README "Version 0.6.4 is an early build"; idevo card says AI runs on your server. Note: the README says AI runs "on a server you own" (see O6) | ✅ |
| RielTrack: "Spend in dollars. / Pay in riel. / Track both." | Approved headline; README "for US dollars and Cambodian riel" | ✅ |
| RielTrack: "Your month at a glance" · DOLLARS AND RIEL | README "Home dashboard" | ✅ |
| RielTrack: "Add an expense in riel" · 12,000 ៛ ≈ $2.93 | Home row on screen | ✅ |
| RielTrack: "Add income too" · MONTHLY INCOME | Income take (FACTS). Continuity note M11 | ✅ |
| RielTrack: "Every transaction in one list" · SEARCH AND FILTER BY CURRENCY | README "Transactions … search, and filters" | ✅ |
| RielTrack: "Compare with last month" · THIS MONTH VS LAST MONTH | README "month-to-month category comparisons" | ✅ |
| RielTrack: "Stay inside your budget" · MONTHLY LIMIT · ON TRACK | README "Budgets"; "On track" on screen | ✅ |
| RielTrack: "No account. / No cloud. / No ads." | README "No account, no cloud, no analytics, no ads." | ✅ |
| RielTrack: "Use it in Khmer" · LABELS IN ខ្មែរ | README "English and ភាសាខ្មែរ" | ✅ |
| RielTrack outro: "Track spending in dollars and riel." · ANDROID · v1.6 · Android 8.0+ · Download APK · github.com/hongrinrasmey/RielTrack-Downloads | Latest release today = **v1.6** (2026-11-11); README "Requires Android 8.0 (API 26)"; release page 200 | ✅ |
| Every outro footer: "Hong Rinrasmey · hongrinrasmey.github.io" | Live site 200; no logo or icon | ✅ |
| Names spelled exactly: KH Halal Marketplace, idevo, RielTrack | Checked in every outro and hook | ✅ |
| Tags and CTAs: KH = WEB + "Try it live"; idevo/RielTrack = ANDROID + "Download APK"; all CTAs orange | Seen in every outro | ✅ |

Nothing is marked `[UNVERIFIED]`.
Typos: I read every caption, label, sub-line and outro line in frames. I found none. (British spellings such as "Labelled" are used consistently.)

---

## 4. Optional improvements (not faults; your choice)

- **O1.** The dark background glow shows banding rings when brightness is boosted 5x (`frames/26-dark-glow-banding-brightness-x5.jpg`). At normal brightness I could not see them. Social sites re-compress video harder, though, so a tiny bit of noise (dither) in the glow would protect it. This links to NEXT_STEPS item 13.
- **O2.** The KH phone version uses a smaller phone (`shTall` 1440) than idevo and RielTrack (1760), and smaller labels. Matching them would make the three phone videos feel like one set.
- **O3. New posters.** Stills that looked good in my random-frame test: KH promo 00:03.5 (hero, logo visible) or 00:26.5 (desktop + phone); KH full demo 00:04.0 (hero, chapter 1); idevo 00:22.6 ("Labelled AI draft"); RielTrack 00:23.9 ("This month vs last month"). The current posters: `frames/27-posters-16x9.jpg`, `frames/28-posters-tall.jpg`.
- **O4.** RielTrack hook 00:01.9–00:02.5: the hook text fades out over the rising phone, so text and phone overlap for about half a second (`frames/21-rieltrack-00m02.0s-hook-text-over-phone.jpg`). This is approved (`xfade`). You could try starting the phone a little later.
- **O5.** KH promo "Every seller is identity-verified" holds a static page for about 2.8 s before anything happens. Starting the highlight earlier (M1) would also fix the pacing.
- **O6.** Outside the videos: the `Idevo-Downloads` README says AI "run[s] on a server you own", while the site and video say "AI runs on my server". Consider making them say the same thing.
- **O7.** The KH full demo grey sub-lines are about 9 px tall when the player is 640 px wide: readable, but only just. 10–15% bigger would help.
- **O8.** On a tablet held upright (768×1024) the 16:9 video plays only 432 px tall. The tall file would fill more of the screen there.
- **O9.** KH desktop: once the crossfades (item 9) exist, consider using them for M4 and M5 too, so every KH transition has the same soft style.

---

## 5. Moments for you to watch yourself

I check frames and measurements. I cannot watch at real speed like a person. Please watch these once at normal speed, full screen:

| Video | Time | What to judge |
|---|---|---|
| All 7 | 00:00–00:03 | Is the hook readable and calm? Does the first screen arrive smoothly? |
| All 7 | last 4 s | Does the ending feel finished? (2 s still outro on all) |
| KH promo | 00:05.8, 00:17.7, 00:20.9 | The 3 hard white/green cuts: harsh or fine? (item 9 baseline) |
| KH promo | 00:13.3 | Zoom jump (M2) |
| KH promo | 00:28.5 · 00:42.1 | Dark dip after the duo (M4) · panels popping out (M5) |
| KH full demo | 00:06.3, 00:20.5, 00:25.1 · 00:39.4 · 00:58.9 | Hard cuts · duo dip · finale pop |
| KH phone | 00:31.3–00:31.8 | The flip to the seller side |
| KH phone | 00:05.0, 00:23.7 · 00:18.6 | Scroll judder · cart photo loading |
| idevo | 00:03.8–00:11.1 | Do the frozen waits feel stuck? (M10) |
| idevo | 00:43.8 | Title over the phone (M8) |
| idevo / RielTrack | 00:14–00:16, 00:34–00:38 / 00:11–00:12 | Is the cropped phone top acceptable? (M9) |
| RielTrack | 00:21.8–00:22.7 | Scroll judder (M12) |
| RielTrack | 00:16 → 00:21 | Do you notice the income going back to $850? (M11) |
| Later, with sound (item 10) | every start, KH phone flip 00:31.3, KH desktop duo 00:26–00:29, the text cards (RielTrack 00:27.8, idevo 00:30.0), every outro | Music fade-in, hits on the right frame, clean ending |

---

## 6. Detailed results (the checks behind the scores)

### 6.1 Technical check of each file
All 7: **H.264 High, yuv420p, constant 30 fps** (every frame exactly 1/30 s apart), **moov before mdat** (`ftyp, moov, free, mdat` = fast start), **full decode 0 errors**, **no audio track**, no black frames (no frame darker than luma 8), no flashing (no second with more than 3 flashes). Live file sizes are byte-identical to local, and local HEAD = live `main` (`aa9a931`).

| File | Size | Length | `index.html` says | Steps > 25 per frame | Still stretches ≥ 1.5 s (s) |
|---|---|---|---|---|---|
| kh-halal-marketplace-promo.mp4 (1920×1080) | 5.45 MB | 45.67 s | about 46 s ✅ | 5.80 (+58), 17.70 (−60), 20.90 (+60), 42.17 (−31) | 10.1–11.9, 21.2–22.9, 26.7–28.4, 43.6–45.2 |
| kh-halal-marketplace-promo-mobile.mp4 (1080×2340) | 4.11 MB | 47.50 s | about 48 s ✅ | 31.33–31.70 flip (±25–27) | 5.3–7.4, 12.9–14.8, 25.1–26.6, 33.1–34.9, 41.9–43.5, 45.5–end |
| kh-halal-marketplace.mp4 (1920×1080) | 5.49 MB | 62.33 s | about 1 min 2 s, 11 chapters ✅ | 6.30 (+48), 20.50 (−51), 25.10 (+50), 39.43 (−25), 58.93 (−31) | 11.5–13.8, 29.8–31.8, 60.4–end |
| idevo-promo.mp4 (1920×1080) | 3.95 MB | 47.00 s | about 47 s ✅ | none | 3.8–5.8, 6.6–8.3, 9.5–11.1, 14.5–16.2, 21.7–23.3, 34.9–37.3, 41.3–43.4, 45.3–end |
| idevo-promo-mobile.mp4 (1080×2340) | 6.03 MB | 47.00 s | same video ✅ | none | same as 16:9 |
| rieltrack-promo.mp4 (1920×1080) | 3.38 MB | 37.57 s | about 38 s ✅ | none | none (a soft glow moves even in the outro) |
| rieltrack-promo-mobile.mp4 (1080×2340) | 4.90 MB | 37.57 s | same video ✅ | none (outro fade, largest 24) | 35.4–end |

File sizes are all in the same range. The idevo phone file is the largest (6.0 MB) because its push-in changes every frame; that is not a problem. The still stretches are mostly the planned 2–3 s holds on a result; the ones that are a problem are in M10.

### 6.2 Brightness baseline for NEXT_STEPS item 9 (before crossfades)
Average brightness (0–255) of the frame before → after each hard cut, measured on the whole frame:

| Video | Cut | Before → after | Step |
|---|---|---|---|
| KH promo | 00:05.8 green hero → white filter page | 96 → 154 | **+58** |
| KH promo | 00:17.7 white cart → green Khmer hero | 160 → 100 | **−60** |
| KH promo | 00:20.9 green Khmer hero → white Payment | 98 → 158 | **+60** |
| KH full demo | 00:06.3 | 83 → 131 | **+48** |
| KH full demo | 00:20.5 | 136 → 86 | **−51** |
| KH full demo | 00:25.1 | 84 → 134 | **+50** |
| KH phone | 00:11.3 / 00:21.6 (largest cuts; the mobile hero is small) | 88 → 71 / 93 → 82 | −17 / −11 (already under 25) |

After item 9, the goal is no step over 25 at these points.
Stills: `frames/24-kh-promo-baseline-3-hard-cuts.jpg`, `frames/25-kh-full-baseline-3-hard-cuts.jpg`.

### 6.3 Audio (only as far as it applies today)
- No video has an audio track (checked with ffprobe). On the site, Edge reports `muted = true` and 0 audio bytes decoded. The pop-up has no sound button, only "Close". The `index.html` descriptions say "Silent". All of this matches the current state.
- **Sound-off test: passes.** Every point is carried by a caption, label or text card. Nothing depends on sound.
- **Not done yet (waiting on NEXT_STEPS item 10):** loudness −16 LUFS and true peak, fades, effect sync, desktop/phone track match, licences in `video-studio/licenses/` and `CREDITS.md` (neither exists yet, which is expected), `-silent` copies, the website sound button.

### 6.4 QR codes and crossfades
- **QR codes: not done yet, waiting on NEXT_STEPS item 8.** No outro has a QR code. OpenCV's QR reader is available for the scan test once they exist.
- **KH crossfades: not done yet, waiting on NEXT_STEPS item 9.** Baseline in 6.2.

### 6.5 Privacy check (frame by frame)
- Blurred correctly in every frame I checked, including during zooms: email, phone, street address, the signed-in name chip, the image link. The checkout name is your own public name.
- No messages, payouts, verification or profile pages. The seller dashboard's recent orders show order IDs and products only, no buyer names. No admin screens.
- idevo: no server address or token visible on any screen (Settings, the "Describe" screen).
- **Not blurred:** district + province (C1).

### 6.6 Motion
- **Cuts:** frames around every cut at 10 fps plus the frames right next to each cut, for all 7 videos: no flicker, no half-drawn frame, no ghost of two screens mixed. Captions start on the cut frame. Exceptions: M2, M4, M5, M7.
- **Flashing:** no second has more than 3 flashes in any video.
- **Pacing per chapter** (rushed / right / slow):
  - **KH promo:** hook right · hero right · filter right · identity slow (static first 2.8 s) · cart right · Khmer rushed (label 0.7 s) · KHQR right · duo right · dashboard right · add product right · pending right · finale + outro right.
  - **KH phone:** hook right · hero right · filter right · identity right · cart right · Khmer right · checkout + KHQR right (dense: 3 screens in 6 s, but clear) · flip right · dashboard right · add product right · pending right.
  - **KH full demo:** chapters 1–9 right · chapter 10 (add product, 8.9 s) slightly slow but explains the steps · chapter 11 right.
  - **idevo:** hook right · describe slow (2 s frozen) · plan slow (1.6 s frozen + long hold) · writing right (fast, readable) · lesson right · check right · text card right · flashcards right · Khmer slightly slow (2 s on Khmer Home) · outro right.
  - **RielTrack:** everything right. It is the tightest of the three. "Every transaction in one list" (2.8 s) is close to rushed.

### 6.7 Readability
- Captions: readable at 640 px wide in every video. The outro lines and footer are readable at 640 px.
- Labels: readable at 640 px. Two KH promo labels are too short (M1). Khmer script renders correctly in every label and screen I checked (no boxes, nothing cut).
- Labels inside the frame and not over the caption in every phone version (`labelsTop` works). Labels over page text: M3.

### 6.8 Consistency between desktop and phone versions
- **idevo and RielTrack:** the same story, captions and facts in both shapes.
- **KH:** the phone version adds checkout with delivery fee and drops the duo ("Works on phones too"), as FACTS says. Otherwise the same facts.
- Same outro layout and orange CTA in all 7.
- Style differences: KH has no push-in, smaller labels, and a smaller phone in the tall version (O2).

### 6.9 Regression check
No video has changed since HEAD (`aa9a931`), which is also what is live. To set a baseline I compared the three files that last commit changed against the commit before it (same length, frame by frame):
- KH phone: only the label spans changed (labels moved above the phone).
- RielTrack 16:9 and phone: only 00:34.8–00:37.5 changed (the outro button colour).

So the last commit changed only what it said. idevo and the full demo changed length, so I did not compare them frame by frame.

### 6.10 Freeze-frame test (5 random frames per promo)
Most random frames look good as stills. Weak ones are mid-transition: KH phone 00:07.5 (no caption yet) and 00:44.1 (title half-risen), idevo 00:01.6 (empty stage under the hook). Good poster candidates are in O3.

### 6.11 Site
- `node tools/check.mjs`: **all checks passed** (no console errors, no sideways scroll, one h1, links, hero order at 360–1920).
- **Edge playback test on the live site** (Playwright 1.49.1 already on this PC, `channel: 'msedge'`), 4 buttons × 6 sizes (1920, 1440, 1366, 768, 390, 360): **24/24 PASS**. Each one played the right file with the real length, poster set, played, fit the screen, no sideways scroll, Esc closes, focus returns to the button, focus moves into the pop-up, no console errors. No video file is downloaded before the click. "Full demo" is hidden on phones as designed. Sound: plays muted, no audio track, no sound button (matches the current silent state).
- `index.html` video descriptions match the real lengths and chapters (see 6.1).
- **Links:** live demo, both APK release pages (they open v0.6.4 and v1.6), GitHub, both download repos, Telegram and sitemap all return 200. The email is a `mailto:` link (shown, not clicked). LinkedIn is not added yet (hidden row).
- **Lighthouse on the live site** (lighthouse 12.8.2, already on this PC, Edge headless):
  - mobile 100 / 100 / 100 / 100 (LCP 1.4 s, CLS 0, TBT 0 ms)
  - desktop 100 / 100 / 100 / 100 (LCP 0.4 s)

---

## 7. Your text slots (still empty; I did not fill them)

These are hidden comments in `index.html`, so visitors do not see them. NEXT_STEPS items 1–6:

| # | Slot | Where |
|---|---|---|
| 1 | KH Halal: hardest problem + what you learned | `index.html` line 216 (inside a comment) |
| 2 | idevo: same | line 273 |
| 3 | RielTrack: same | line 325 |
| 4 | About: learning now / job you want / what you enjoy building | line 373 |
| 5 | LinkedIn link + name | lines 432–434 (`href="#"`, row hidden) |
| 6 | Short bio (2–3 sentences) | No separate slot in `index.html`. `CLAUDE.md` §3 still says `[TODO: owner]`. The About slot (line 373) is the closest place. |

Also still missing: `assets/resume.pdf` (both Résumé buttons stay hidden until it exists).

---

## 8. Checks I could not run, and why

| Check | Why not | What I did instead |
|---|---|---|
| OCR for names, emails, phones and typos | `tesseract` is not installed (no installs allowed) | Looked at 1-fps contact sheets of all 7 videos plus full-size frames of every form, payment and settings screen myself |
| QR decode | No QR codes in the videos yet (item 8) | – |
| Loudness, peaks, sync, licences, credits | No audio yet (item 10) | Confirmed there is no audio track; sound-off test |
| Crossfade "after" check | Item 9 not done | Measured the "before" baseline (6.2) |
| Regression of new vs previous videos | There are no new videos since HEAD | Compared HEAD with the commit before for 3 files (6.9) |
| People test, cold-viewer test, social compression test | NEXT_STEPS items 11–13 are not done yet | – |
| Watching at real speed like a person | I can only inspect frames | Section 5 lists moments for you |

**Side effect:** Lighthouse reported a permission error while deleting its temporary browser folder after each run. The results were complete. It left two temp folders outside the repo: `%TEMP%\lighthouse.13690353` and `%TEMP%\lighthouse.50832844`, which you can delete.
