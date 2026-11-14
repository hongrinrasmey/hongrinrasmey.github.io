# Video studio: the three promo videos

This folder makes the short promo videos (about 35–45 seconds, 16:9, silent) for KH Halal Marketplace, idevo and RielTrack.
It is separate from the website: nothing here is loaded by the site. Only the finished files go into `assets/videos/`.

Everything on the phone or browser screen is a real recorded frame from the apps. This folder only adds the frame,
camera moves, highlights, labels and text around it.

## Files

| File | What it is |
|---|---|
| `rieltrack.json`, `idevo.json`, `kh-halal-marketplace.json` | The storyboard for each video: text, which part of the recording plays, highlights. **Edit these.** |
| `kh-halal-marketplace-full.json` | The longer "Full demo" (KH Halal only: the site has no public demo login; same style, numbered chapters, one explanation line each). Owner, 2026-11-13: idevo and RielTrack have a download, so no full demo. They write `assets/videos/<name>.mp4`. |
| `kh-halal-marketplace-mobile.json` | The KH Halal phone version: the real mobile site in a phone frame. Render with `--portrait`; it writes `kh-halal-marketplace-promo-mobile.mp4`. |
| `promo.html` | The scene: layout, colours, fonts and every animation. |
| `render.js` | Turns a storyboard into an mp4 (and the poster image). |
| `FACTS.md` | Where every word in the videos comes from. Update it when you change a caption. |
| `fonts/` | Noto Sans Khmer (SIL Open Font License, see `OFL-noto-sans-khmer.txt`) for the Khmer text. Geist comes from `../assets/fonts/`. |

Results: `assets/videos/<name>-promo.mp4` and `assets/videos/<name>-promo-poster.webp`.
The raw recordings they use are in `assets/videos/<name>-raw/` (not in git).

## One-time setup

1. Install [ffmpeg](https://ffmpeg.org) and make sure `ffmpeg` works in a terminal.
2. In any folder **outside** the website, run `npm i playwright@1.49.1`, then `npx playwright install chromium`.
3. Point `NODE_PATH` at that folder's `node_modules`, for example in Git Bash:
   `export NODE_PATH="C:/path/to/that/folder/node_modules"`

## Make a video

Run from the website folder:

```
node video-studio/render.js video-studio/rieltrack.json
```

It takes about 5 minutes per video. The first run also unpacks the recording into frames (in your temp folder).

Useful extras:

| Command ending | What you get |
|---|---|
| `--preview` | A window with a play button and a slider to scrub through the video. Nothing is saved. |
| `--sheet 1 --dir out` | One picture with a small frame every second, to check the whole flow at a glance. |
| `--stills 5,12.5 --dir out` | Full-size pictures at those seconds. |
| `--out test.mp4 --from 5 --to 12` | A test render of part of the video. It never touches `assets/videos/`. |
| `--poster-only` | Only remake the poster image. |
| `--portrait` | The tall phone version (1080x2340): `<name>-mobile.mp4`. Phones play it from "Watch video". |

## Change something

- **A caption or a label**: change `"caption"` or `"label"` in the storyboard file, render again, and update `FACTS.md`.
  Labels are shown in capitals automatically. Keep captions to about 6 words.
- **Which part of the recording plays**: each beat has `"clips": [[start, end, speed]]` in seconds of the raw recording.
  Pieces that touch (`[8.4, 11.9, 3], [11.9, 15.6, 1]`) blend their speed smoothly; a gap between pieces is a hard cut.
  Use speed 1 for taps and typing so they look real.
- **A highlight**: `"spots"` takes `x, y, w, h` in pixels of the recording (1080×2400 for the phones, 1920×1080 for the website),
  `from` / `to` in recording seconds, and an optional `label`. Without `to` it fades out by itself after 3 s (`"hold"` changes that), so the screen is not dimmed for a whole beat. Short promos use `"hold": 2` and start the highlight about 0.25 s after the cut, so every chapter starts and ends on a bright app.
- **The poster**: `"poster"` is a time in seconds of the finished video.
- **Explanation line and chapter numbers** (full demos): `"sub"` on a beat, `"chapters": true` at the top. `"out"` sets the file name.
- **A second recording in one video**: list it under `"takes"` and give the beat `"take": "<name>"` (RielTrack income, idevo lesson).
- **Phone (portrait) framing of the website**: the tall window follows each highlight; `"px"` on a beat or `"cx"` on a highlight sets where it centres.
- **Pan the tall window inside one beat**: `"camTall": [[srcTime, 1, x, 540, seconds]]` (KH dashboard). `"cam"` is desktop only.
- **Website text too small on desktop**: `"push": [zoom, x, y]` on a beat = a slow push-in over the beat (desktop only). Keep every highlight inside the final view. Key results may push to 1.25-1.4x even if the seller sidebar leaves the view (owner, 2026-11-14). Keep the site logo and header uncut: x about 835 at 1.15 and 800 at 1.2, y 0 to pin the top.
- **The same site on a desktop and a phone** (desktop only): `{ "type": "duo", "dur": 2.8, "caption": "...", "a": { "src": 1.5, "role": "DESKTOP" }, "b": { "src": 2.0, "take": "mobile", "phone": true, "role": "PHONE" } }`. The browser steps aside and comes back showing the next beat: do not put a `flip` right after a duo (it would show the screen from before the duo again). The duo caption rises with its panels, the panels are gone just before the browser returns (no double image), and a new caption on a continuous shot does not get the small "cut" zoom.
- **Ending without a finale** (phone promos): `"outro": { "leadIn": 0.45, ... }` makes the device and the last caption fade out together, ending as the outro starts, so the outro title never rises over the phone (KH phone version). Without it the old timing stays (idevo, RielTrack).
- **KH Halal on phones**: `kh-halal-marketplace-mobile.json` (`"out": "kh-halal-marketplace-promo"`, render with `--portrait`) uses the phone-size take, so phones see the real mobile site.
- **Blur on a phone take**: add `"strong": true` (the screen is scaled down more, so the normal blur can stay readable).
- **Dark app on the dark stage**: in `"app"`, `"bezel"` (phone frame colour), `"rim"` (its edge) and `"glowA"` (glow strength, two hex alphas, default `["1A", "0A"]`). idevo uses `#26292A`, teal edge, `["33", "14"]`.
- **A highlight that should end at a cut**: put its `"to"` 0.1 s before the clip end (exactly on the cut it stays to the end of the beat).
- **Android gesture bar over app text** (apps that draw behind it): a top-anchored `"cam"` of about 1.08 crops it off (idevo AI lesson).
- **Phone size**: in `"device"`, `"sh"` = phone screen height in the 16:9 video (default 880; RielTrack and idevo 1024 since 2026-11-14: the whole phone fits in the 1080 frame with 14 px to spare, outer height = `sh` + 27; 1120 cut the bezel and status bar); `"shTall"` / `"topTall"` = height / top in the tall version (default 1440 / 600, RielTrack and idevo 1760 / 420); `"labelsTop": true` puts the tall version's labels above the phone, not over the app.
- **Zoom on a phone highlight**: `"cam": [[srcTime, zoom, x, y, seconds]]` (RielTrack income: 1.1 centred on x 540, so nothing at the sides is cut). Only for a highlight narrower than about 1080 / zoom, or it gets cut.
- **Android screen changes**: each one leaves about 0.3 s of two screens mixed. Find it with a 0.1 s frame strip and cut over it (a gap in `"clips"`), e.g. RielTrack 7.95 → 11.85, 24.75 → 29.45, income 22.95 → 23.3 (23.2 still shows $797.30 over $947.30).
- **Timeline under the caption** (`"timeline"`, idevo flashcards): in the tall version it goes under the phone, and is skipped when the phone leaves no room (the buttons on screen show the same values).
- **Premium motion, 16:9 phone (opt-in, in `"device"`)**: `"focus": 1.12` (16:9) / `"focusTall": 1.06` (tall version: grows down from the phone's top, so the label above it stays clear of the caption) = the phone and its labels push in toward each highlight (scaled about the highlight, moved part-way to the middle) and settle back before the highlight ends; `"chapterMove": true` = a soft 26 px rise when a chapter starts on a real cut (never on a continuous or joined shot); `"labelPx": 26` = bigger labels, width capped so they stay inside the frame at full focus. RielTrack and idevo use all three (plus `"focusTall"`); KH Halal does not.
- **Hook into the first screen**: `"xfade": true` in `"hook"` = the hook text fades out over the device's entry (no empty frame between). All four promos use it; the full demo does not.
- **Highlight dim strength**: `"dim": 0.3` at the top = how dark the rest of the screen gets around a highlight (default .45). KH desktop promo uses 0.3 so the white website does not look muddy.
- **Outro button colour**: `"ctaColor": "#0B7751"` in `"outro"` (text colour picked for contrast). Without it the button is the portfolio orange.
- **Skip a still screen without a cut**: a gap in `"clips"` normally gets the small cut bump. If the screen did not change across the gap, list the clip end in `"join": [srcTime]` on that beat; to carry a screen into the next chapter, end the beat with a short clip from just before the next beat's first clip and `join` it (RielTrack Home → Add expense, History → Reports tab). Fast clips (speed 4–10) do not help here: speed changes ramp over 0.4 s.
- **A tap ring that appears too late or early**: `"tapShift": [[loggedTime, offset]]` moves that one tap.

## Rules (from MOTION.md)

- Only real screens and real facts. Never draw a screen or invent a number.
- No music, no logo. The videos are silent.
- Never record again on the live KH Halal site for these videos: it takes real money. Reuse the existing takes.
- Owner rules: show the KH Halal checkout + KHQR page (stop before "Place order", blur personal details), idevo making a path and lessons with its built-in AI (`scripts/record-idevo-ai.sh`, address + token from env vars only), RielTrack adding an income.
- Personal details stay blurred (`"blurs"` in the KH storyboard).
