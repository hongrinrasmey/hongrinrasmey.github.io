# Video studio: the three promo videos

This folder makes the short promo videos (about 35–45 seconds, 16:9, silent) for KH Halal Marketplace, idevo and RielTrack.
It is separate from the website: nothing here is loaded by the site. Only the finished files go into `assets/videos/`.

Everything on the phone or browser screen is a real recorded frame from the apps. This folder only adds the frame,
camera moves, highlights, labels and text around it.

## Files

| File | What it is |
|---|---|
| `rieltrack.json`, `idevo.json`, `kh-halal-marketplace.json` | The storyboard for each video: text, which part of the recording plays, highlights. **Edit these.** |
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

## Change something

- **A caption or a label**: change `"caption"` or `"label"` in the storyboard file, render again, and update `FACTS.md`.
  Labels are shown in capitals automatically. Keep captions to about 6 words.
- **Which part of the recording plays**: each beat has `"clips": [[start, end, speed]]` in seconds of the raw recording.
  Pieces that touch (`[8.4, 11.9, 3], [11.9, 15.6, 1]`) blend their speed smoothly; a gap between pieces is a hard cut.
  Use speed 1 for taps and typing so they look real.
- **A highlight**: `"spots"` takes `x, y, w, h` in pixels of the recording (1080×2400 for the phones, 1920×1080 for the website),
  `from` / `to` in recording seconds, and an optional `label`.
- **The poster**: `"poster"` is a time in seconds of the finished video.
- **A tap ring that appears too late or early**: `"tapShift": [[loggedTime, offset]]` moves that one tap.

## Rules (from MOTION.md)

- Only real screens and real facts. Never draw a screen or invent a number.
- No music, no logo. The videos are silent.
- Never record again on the live KH Halal site for these videos: it takes real money. Reuse the existing takes.
- Personal details stay blurred (`"blurs"` in the KH storyboard).
