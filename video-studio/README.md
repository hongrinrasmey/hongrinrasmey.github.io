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
| `kh-halal-marketplace-mobile.json` | The KH Halal phone version: the real mobile site in a phone frame. Render with `--portrait`; it writes `kh-halal-marketplace-promo-mobile.mp4`. **Not used on the site since 2026-11-14** (owner: phones play the 16:9 KH promo; a phone visitor can open the live site). Kept so it can be rendered again. |
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
- **Hook into the first screen**: `"xfade": true` in `"hook"` = the hook text fades out over the device's entry (no empty frame between). All four promos and the full demo use it.
- **Duo timing** (opt-in, on the duo beat): `"inAt": 0.35` = the panels rise that many seconds after the duo starts (default .65 left a dark empty stage); `"outAt": 0.25` = they start leaving that long before it ends (default .45). Both KH videos use 0.35 / 0.25: a short crossfade each way instead of a dark gap.
- **Duo exit and finale exit** (opt-in): `"tail": 0.55` on a duo = the panels stay on after the duo ends and fade out exactly as the device comes back (no dark dip; replaces `outAt`). `"softOut": 0.5` on a finale = the panels ease to 0 over that many seconds (no one-frame pop before the outro). Both KH desktop videos use them.
- **Highlight dim strength**: `"dim": 0.3` at the top = how dark the rest of the screen gets around a highlight (default .45). KH desktop promo and full demo use 0.3 so the white website does not look muddy.
- **Outro button colour**: `"ctaColor": "#0B7751"` in `"outro"` (text colour picked for contrast). Without it the button is the portfolio orange.
- **Soft cut + finale lead + keyframes** (opt-in, 2026-11-14 frame review): `"xfadeCut": 0.3` on a beat = the hard cut into it dissolves (the beat before's last frame, in its last framing and with its blurs, fades out over 0.3 s; brightness step at the KH white/green cuts 60 -> 17 per frame). `"lead": 0.3` on a finale = the panels start fading in 0.3 s before the finale while the device is still leaving (no dip to black). KH promo + full demo use both. `"dissolve": [[srcTime, s]]` on a beat = a sudden page change inside a clip (green page -> white page after a click) fades the same way (KH promo: home 43.93 s, wishlist 65.8 s). `"camOut": 0.5` (top level) = every clip beat eases back to 1x in its last 0.5 s, so every page change happens at the same size (KH promo; owner: "the size change a lot"). `"smooth": true` (top level or on a take) = render from the frames `python video-studio/smooth.py <raw.mp4>` makes: the KH screen recorder repeated about every 6th frame while things moved, which made scrolls judder once the camera stood still; each single repeated frame inside motion becomes the blend of its two neighbours (44 in the KH take). Since the final re-render (2026-11-15) all 4 storyboards use it, for every take (5 to 44 repeats per recording). `"qr": "<url>", "qrLabel": "Scan to download"` in an outro = that address as a QR code next to the button (render.js draws it with OpenCV, error correction M, and checks it decodes; whole modules: 6 px in 16:9, 8 px on phones). The 3 promos use it: KH the live site, idevo + RielTrack the `releases/latest` page. `dissolve` also softens a jump between two clips of one beat (KH: hero -> Featured Products). `"spotOut": 0.9` (top level) = for a highlight that ends with its chapter, the dim lifts slowly (up to 0.9 s) and the whole highlight is gone 0.2 s before the chapter change, so the change happens on a calm page; the default 0.5 s fade ended right at the cut, which looked like a "pop" before every chapter (owner 2026-11-15). Label and outline keep their 0.5 s fade (reading time at most 0.2 s shorter; no gap if a label would show < 0.5 s). All 4 storyboards use it. Every render now has a keyframe at least every 2 s (`-g 60` in render.js, scene-cut keyframes kept), so dragging the progress bar lands where you click.
- **Skip a still screen without a cut**: a gap in `"clips"` normally gets the small cut bump. If the screen did not change across the gap, list the clip end in `"join": [srcTime]` on that beat; to carry a screen into the next chapter, end the beat with a short clip from just before the next beat's first clip and `join` it (RielTrack Home → Add expense, History → Reports tab). Fast clips (speed 4–10) do not help here: speed changes ramp over 0.4 s.
- **A tap ring that appears too late or early**: `"tapShift": [[loggedTime, offset]]` moves that one tap.

## Rules (from MOTION.md)

- Only real screens and real facts. Never draw a screen or invent a number.
- No logo. Music + soft effects only through `audio.py` (below); the KH full demo has sound too since 2026-11-15 (owner), same song as the KH promo.

## Sound (opt-in, owner 2026-11-14)

1. Render the video as usual (silent). Then run `python video-studio/audio.py video-studio/<name>.json` (add `--portrait` for the tall one, `--out test.mp4` for a test file).
2. The first run copies the silent video to `assets/videos/silent/<name>.mp4` (not in git). Every run builds from that copy, so you can run it again as often as you like. **After a new render, delete the old silent copy first**, or the script stops (the lengths differ).
3. It asks `render.js --events` for the real times of chapter changes, taps, swipes, labels, flip, hook and text lines, duo and outro, puts one effect on each (the more important one wins when two are within 0.15 s), dips the music 4 dB under them, and normalises the mix to -16 LUFS (true peak <= -1 dBTP). It stops with an error if the loudness is out of range.
4. The `"audio"` block in a storyboard: `"track"` (file in `video-studio/audio/`), `"parts"` (pieces of the track in seconds, cut on beats, joined with a 0.25 s crossfade centred on the jump so the beat runs on), optional `"partsTall"`, `"fadeIn"` (0.5), `"fadeOut"` (1.5), `"gain"` (dB), `"duck"` (dB), `"sfxOff"` (kinds to leave out, e.g. `["chapter"]`), `"typing"` (`[{ "take", "from", "to", "x", "y", "w", "h" }]`: where a script typed text without logging taps; one key sound per new character, found in the cached recording frames; RielTrack uses it for 12000 and 150). Effect files and levels: `SFX` at the top of `audio.py`.
4c. `"musicDown": 3` in an audio block (owner 2026-11-15: "lower the song a little") = the song 3 dB quieter while every effect stays exactly as loud (the mix is normalised with the same gain as the mix without it, so it ends near -18.5 LUFS instead of -16). All 4 storyboards use it.
4b. Shared kit (owner 2026-11-14, AUDIO.md 5b): `"kit": true` = no sound on chapter changes or the CTA (owner: no repeating beep), labels silent unless named in `"labelSfx"`, text hit on hook and text-card lines (last hook line +3 dB), riser into the outro + bloom on it, no swipe sounds, music dips only under hero sounds. `"extra": [[time, sound, dB], ...]` = one-off moments (hero chime, the KH seller-side swoosh); a `"riser"` may overlap other sounds. `"beds": [[from, to, sound]]` = a quiet layer under a sped-up part (`shimmer`, idevo AI). Songs (one per app) live in `video-studio/music/` (git-ignored): `"track": "../music/<song>.mp3"`.
5. The audio files are **not in git** (Pixabay forbids passing the tracks on by themselves). The owner's copies are in `E:\portfolio-audio\`; copy them into `video-studio/audio/` with the names in `licenses/pixabay-2026-11-14.md`. Credits (none required): `CREDITS.md`.

- Never record again on the live KH Halal site for these videos: it takes real money. Reuse the existing takes.
- Owner rules: show the KH Halal checkout + KHQR page (stop before "Place order", blur personal details), idevo making a path and lessons with its built-in AI (`scripts/record-idevo-ai.sh`, address + token from env vars only), RielTrack adding an income.
- Personal details stay blurred (`"blurs"` in the KH storyboard).
