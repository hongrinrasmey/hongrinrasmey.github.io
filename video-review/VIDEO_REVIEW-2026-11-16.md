# Video review: all 5 promos (2026-11-16)

Files reviewed: the 5 videos in `assets/videos/` as they are on disk now (KH 50.9 s, idevo 50.9 s + phone, RielTrack 37.57 s + phone).
Nothing was changed. Stills of every problem: `video-review/frames/review-2026-11-16/` (8 frames in a row, time + frame number on each).

## How it was checked
- **Every frame measured** (1,527 + 1,527 + 1,527 + 1,127 + 1,127 frames): change from the frame before, repeated frames while moving (stutter), one-frame jumps (hard cuts), brightness jumps, flashes, still holds.
- **Looked at**: 2 frames per second for every video (1 per second for the phone versions), and 8-frame strips (every frame) around each flagged moment.
- **Sound measured** (not heard): loudness over the whole video and every 2 s, loudest moments, true peak, start and end, sound hits vs. picture cuts.
- File checks: 0 decode errors, `moov` first (fast start) in all 5.

## Scores (1-10)

| | KH Halal | idevo 16:9 | idevo phone | RielTrack 16:9 | RielTrack phone |
|---|---|---|---|---|---|
| Content (what it says) | 9 | 9 | 9 | 9 | 9 |
| Flow / story order | 8 | 9 | 9 | 9 | 9 |
| Cuts / editing | **6** | 9 | 9 | 8 | 8 |
| Smoothness | 7 | 9 | 9 | **7** | **7** |
| Transitions | 8 | 9 | 9 | 9 | 8 |
| Motion graphics | 9 | 9 | 8 | 9 | 8 |
| Graphics / detail / sharpness | 9 | 9 | 9 | 9 | 9 |
| Sound effects | 7 | 7 | 7 | 8 | 8 |
| Volume / mix | 7 | 7 | 7 | **6** | **6** |
| **Overall** | **7.8** | **8.6** | **8.4** | **8.2** | **8.0** |

Short version: idevo is the best one. RielTrack is close; one ghosted scroll and a quiet second half pull it down. KH has the best content but **three loading or blink moments** that a careful viewer will see.

## What is already very good
- Hooks are short and clear (KH "Buy halal. / Sell halal. / Pay with KHQR.", RielTrack $ -> ៛ morph). The app shows up within 3 s.
- One point per chapter, captions match the screen, and each highlight frames the right thing. Labels are short, and none covers the key result.
- Text is sharp at full size (checked full-res crops of the KH dashboard and the idevo flashcards). At about 1 Mbit/s the compression is clean, with no blocking on text.
- No flashes, no stutter (0 repeated frames in motion in KH and idevo, 1 in RielTrack), keyframes and fast start are fine.
- Sound hits line up with the picture: almost every cut or tap has a sound within 0.1 s.
- Endings: clean fade, QR + address, name. The sound fades to silence (-56 to -64 dB at the last frame).
- Privacy: the checkout and payment details are blurred in every frame I looked at.

## Problems, most visible first

### Must fix (a viewer can see these)

**1. KH 0:18.77-0:18.90 (4 frames): the highlight blinks off and on, and "Delivery: Checking…" flashes back.**
The map is dimmed with the label "Optional: skip typing, a map pin fills the address". For 3 frames the dim and the green outline disappear (brightness jumps 29, the only big jump in the video). The delivery box shows "Delivery: Checking…" again, then the dim comes back with the outline in a slightly different place.
Cause (to confirm): the clip join at recording 18.45 and the dissolve at 19.25 run in the middle of the highlight, so the "Checking…" frames are still there and the highlight restarts.
Fix: start the second map clip after "Checking…" ends (about 19.4 instead of 19.25), or drop that dissolve, and keep one highlight across the join. Still: `1-kh-18.8-highlight-blink.jpg`.

**2. KH 0:16.43-0:16.60 (6 frames): grey loading skeleton of the checkout page.**
After "Proceed to checkout" the page shows empty grey boxes for 0.2 s, then the checkout appears. VIDEOS.md §5.2 says "no half-loaded page".
Fix: cut the clip at the click and start again when the page has loaded, with a 0.2-0.3 s dissolve (the same as the View All fix). Still: `2-kh-16.5-checkout-skeleton.jpg`.

**3. KH 0:12.03-0:12.20 (5 frames): blank page, then a cart with no picture.**
"Add to cart" goes from the product page to a white page with only the footer, then a faded cart. The cart row has no hijab picture until 0:12.20, when it pops in.
Fix: same as #2: skip the load, then dissolve into the loaded cart. Still: `3-kh-12.0-blank-page.jpg`.

**4. RielTrack, both versions, 0:21.8-0:22.3: ghosted scroll on the Reports page.**
Some frames show the page twice, one copy over the other ("Compared with last month" written twice, double numbers), and the scroll moves unevenly. This also happens on one frame at 0:09.93 after "Save transaction". It comes from the blended in-between frames that `smooth.py` makes for a stuttering take.
Fix: run `smooth.py --scroll` on that RielTrack take (it re-spaces clean scrolls, as done for KH), or cut the scroll and dissolve. Stills: `4-rieltrack-22.2-ghost-scroll.jpg`, `9-rieltrack-9.9-ghost.jpg`.

### Should fix (sound)

**5. The "notify" sound is the loudest moment of idevo and KH, louder than the ending.**
- idevo 0:23.65 ("Answer + reason"): about 9 LU above the music (momentary -10.6 LUFS; the whole video is -19.5).
- KH 0:42.88 ("Pending admin review"): -12.4 LUFS, also above the outro boom.
Since "effects +2 dB" it sticks out more than the other sounds. Fix: `notify` -3 -> about -7 in `idevo.json` and `kh-halal-marketplace.json` `extra`, then remix from the silent copies (no re-render).

**6. RielTrack: the music drops about 6 LU from 0:22 to the end.**
Loudness every 2 s stays around -19 until 0:21, then -25 to -27 for 12 s (Compare, Budget, "No account.", Khmer). The song jumps to its second part (`parts` 135.63-152.11), and that part is a quiet section. So the second half feels flatter just when the strongest points come.
Fix: pick a louder section of the same song for part 2 (on a beat), or raise part 2 by about 4 dB.

**7. All 5 are quiet for the web: -19.5 to -20.4 LUFS (VIDEOS.md says -16).**
This comes from your two "lower the song" requests. The balance between song and effects is good now. The whole mix is about 4 dB under most web videos, so a visitor coming from YouTube may have to turn the volume up.
Your call: keep it, or raise everything about +3 dB with the limiter (the song/effect balance stays the same).

### Small (most viewers will not notice)

**8. KH 0:33.77-0:33.93:** the "Works on phones too" caption stays about 5 frames over the seller dashboard, and the cut is a 4-frame crossfade, so both screens show at once. Fix: change the caption at the cut and use the usual 0.3 s `xfadeCut`. Still: `8-kh-33.8-caption-late.jpg`.

**9. RielTrack 0:09.80-0:09.83 (2 frames):** the "New transaction" sheet is half closed with the home tab bar showing under it (the Android screen change). Fix: trim 2 frames.

**10. idevo 0:11.07 and RielTrack phone (0:06.07, 0:09.10, 0:14.53, 0:15.27):** screen changes are one-frame swaps. That is how the app itself changes screens, and the 16:9 versions soften them. Optional: a 0.15 s dissolve on the phone versions.

## Content notes (no fix needed, just so you know)
- KH "Pay with KHQR": no QR code shows, because "Place order" is never pressed (your rule). The label "KHQR bank QR · in riel" carries the point, and that is fine.
- The KH seller dashboard shows real store numbers (KHR 73,800, 47 orders). These were allowed earlier. Just know they are on screen.
- The idevo phone version skips the "Comes back in:" timeline, so its flashcards chapter relies on the button labels (10 min / 1 day / 3 days / 4 days). Those are readable at phone size.

## Suggested order
1-3 (KH: one re-render fixes all three), 4 (RielTrack: smooth + re-render both), then 5-6 (remix only), then 7 if you want it louder.
