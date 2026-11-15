# REVIEW.md: Final Quality Review of My Videos and Site (2026-11-14)

> Run this **after** everything in `NEXT_STEPS.md` (QR codes, KH crossfades, sound from `AUDIO.md`), or any time I ask for a final check.
> Goal: find every remaining problem before I share my portfolio, with timestamps and proof. **Review first, fix only after I approve.**

---

## 1. Your role

Act as a **strict senior video QA reviewer and front-end QA engineer**, the last check before a product launch. Find problems, don't praise. If something is only "okay", say so and how to make it better.

**Independence:** if you can, run the review as a **fresh agent/subagent that didn't make the changes**, so the work isn't grading itself.

---

## 2. Rules

1. **Read first:** `CLAUDE.md` (rules + progress log), `PROGRESS-LOG.md`, `video-studio/FACTS.md`, `video-studio/README.md`, `NEXT_STEPS.md`, `AUDIO.md`, `video-studio/CREDITS.md`. They describe what I've approved. **Don't flag approved decisions as problems** (headlines, my chosen tracks, the idevo AI story, no admin in KH, my design). You may suggest improvements to them, clearly marked as optional.
2. **Verify, don't assume.** Every fact on screen must match `FACTS.md`, my GitHub (`hongrinrasmey`) or the live site. Can't verify it → `[UNVERIFIED]` + ask me.
3. **Evidence for every issue:** video + timestamp (`mm:ss.s`), a still image, what's wrong, why it matters, suggested fix.
4. **Don't change anything during the review.** Report first; after my OK, fix technical/factual issues; ask before creative changes.
5. **Never commit or push**, and never while a render is writing into `assets/videos/`.
6. **Be honest about limits:** you inspect frames and measurements; list moments I should watch myself.

---

## 3. What to review

**Videos (7)** in `assets/videos/`:
| File | Type |
|---|---|
| `kh-halal-marketplace-promo.mp4` + `-mobile.mp4` | KH promo, 16:9 + phone |
| `kh-halal-marketplace.mp4` | KH full demo |
| `idevo-promo.mp4` + `-mobile.mp4` | idevo promo, 16:9 + phone |
| `rieltrack-promo.mp4` + `-mobile.mp4` | RielTrack promo, 16:9 + phone |

Plus every poster (`*-poster.webp`) and the live site `https://hongrinrasmey.github.io/`.

---

## 4. Video checks (each video)

**Technical** (use the same tools as the previous QA: ffprobe/ffmpeg, the brightness step scan, full decode)
- Duration matches the `index.html` video description (±1 s)
- H.264, yuv420p, constant 30 fps, moov first (`+faststart`), full decode 0 errors
- Audio as decided in `AUDIO.md`: videos with sound have AAC 48 kHz stereo; any video I chose to keep silent has no audio track; the `-silent` versions exist
- File size reasonable (as before; flag anything much bigger than the others)
- First frame not blank; hook readable by ~1.5 s
- Last ~1.5 s is a clean, still outro
- No unwanted black or frozen frames; no stutter/duplicate frames during motion
- No visible blockiness or banding in the dark background/glow
- Poster: sharp, right size, a good first impression

**Content and accuracy**
- Every caption, label and outro line matches `FACTS.md` (list any mismatch)
- Names exact: **KH Halal Marketplace**, **idevo**, **RielTrack**; versions match the latest GitHub releases (check now)
- Tags/CTAs: KH = `WEB` + "Try it live"; idevo/RielTrack = `ANDROID` + "Download APK"
- **QR codes** (after NEXT_STEPS item 8): decode each one from a rendered frame (`zbarimg`/`pyzbar`), open the URL, confirm it loads the right page; check it's big and sharp enough in the phone versions
- Footer address `hongrinrasmey.github.io` correct; no logo/icon
- KH: no admin role/screens; checkout/payment personal details stay blurred in every frame (including during zooms)
- No personal data anywhere: OCR frames for names, emails, phones, addresses, notifications
- Khmer text renders correctly (no boxes) and isn't cut
- No typos (OCR + read every caption)

**Design and readability**
- No text cut off or touching the edges; labels don't cover the thing they describe (phone versions especially)
- Every caption/label on screen ≥ 1.5 s; readable when scaled down to 640 px wide
- Highlights line up with the real UI element; label lines point at the right spot during zooms
- Same style across all videos (type sizes, label style, outro layout, orange CTA)

**Audio** (videos with sound)
- Loudness: integrated −16 LUFS (±1), true peak ≤ −1.0 dBTP (`ffmpeg -af ebur128`); all videos within 1 LU
- No clipping; music fades in (no blast in the first 0.5 s); natural ending or clean fade, no hard chop
- Sound effects within ±1 frame of their visual event (check the taps and key moments against the waveform)
- Desktop and phone version of each promo: same track, both edited cleanly
- Every track and sound has license proof in `video-studio/licenses/` and a credit in `CREDITS.md`; credits shown where I decided
- **Sound-off test:** the video still makes complete sense muted
- You can't hear audio: list exact moments for me to **listen to myself** (start, hero moments, the KH flip, endings)

**Motion**
- Frames around every cut and transition (10 fps stills): no flicker, jump or half-rendered frame
- **KH crossfades** (after NEXT_STEPS item 9): the 3 cuts are smooth now, and the brightness step scan shows no jump > 25 at those points; nothing else changed (compare with the previous version)
- No flashing (max 3 per second); zooms and pushes smooth; text never moves while being read
- Pacing: short opinion per chapter (rushed / right / slow)

---

## 5. Site checks

- `node tools/check.mjs` passes; no console errors
- Each "Watch video" button (Edge, 6 sizes as before: 1920, 1440, 1366, 768, 390, 360): right file, sound behaves as I chose in `AUDIO.md` (muted by default with a working sound button, or sound after the click), the sound button is keyboard usable and labelled, poster first, loads only when opened, fits, Esc closes, focus returns
- `index.html` video descriptions match the real durations and chapters
- All links work: live demo, APK pages, GitHub, LinkedIn (once added), email
- The `[TODO]` slots: list which are still empty (don't fill them)
- Lighthouse on the live site (mobile + desktop): still ≥ 90 in all four categories; report the numbers

---

## 6. Extra checks

1. **Regression:** compare the new videos with the previous version (side-by-side stills at the same timestamps) and confirm only the intended parts changed.
2. **Freeze-frame:** 5 random frames per promo each look good as a still (useful for choosing posters).
3. **Consistency:** desktop and phone versions of each promo tell the same story with the same facts (differences only where `FACTS.md` says so).

(The people test, cold-viewer test and social compression test are in `NEXT_STEPS.md` items 10–12. Include their results if they're done.)

---

## 7. Report

Create `video-review/FINAL_REVIEW.md` (+ evidence images in `video-review/frames/`):
1. **Summary table:** each video + the site → ✅ Ready / ⚠️ Fix needed / ❌ Problem, with a 1–10 score for Accuracy, Readability, Motion, Polish, Audio, Playback.
   **Ready** = zero Critical/Major issues and every score ≥ 8.
2. **Issues, most serious first:** `[Critical/Major/Minor] video · mm:ss.s · what · why · fix · technical (I can fix) or creative (needs your OK)`
3. **Facts table:** each on-screen claim → source → ✅ / ❓
4. **Optional improvements** (clearly separate)
5. **Moments for me to watch myself** (with timestamps)
6. Everything in **simple language**

Then show me the summary and the Critical/Major issues, and **wait for my OK** before fixing. After fixes: re-render, re-run the QA for every changed video, update `CLAUDE.md` + `PROGRESS-LOG.md`.
