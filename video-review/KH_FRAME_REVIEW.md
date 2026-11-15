# KH Halal promo (16:9): frame-by-frame review, 2026-11-14

File reviewed: the current picture (`assets/videos/silent/kh-halal-marketplace-promo.mp4`, 46.27 s, 1,388 frames, 30 fps).
Method: every frame measured (brightness, change from the previous frame) and the camera movement between frames (zoom and pan, OpenCV ORB + RANSAC similarity fit); stills at every finding in `video-review/frames/kh-review-*.png`. Owner asked for: the cuts, the zoom, the keyframes.

## Summary

| # | What | Where | Severity | Fix |
|---|---|---|---|---|
| 1 | **Encoder keyframes far apart**: up to 8.3 s between keyframes (9.0 -> 17.3 s). Dragging the progress bar can land far from where you click. | whole video | Major (for seeking) | NEXT_STEPS 9b: a keyframe every 2 s, in the final re-render |
| 2 | **3 hard cuts, white page <-> green hero** (brightness +58 / -60 / +58 in one frame) | 5.80, 17.70, 21.50 s | Minor | NEXT_STEPS 9: short crossfade (`xfadeCut`), in the final re-render |
| 3 | **Dip to black before the finale**: "Reviewed before it goes live" fades to near-black in ~0.2 s (steps of 18-24 per frame), stays dark ~0.13 s, then the 2 panels come in: reads as a blink | 40.03-40.40 s | Minor | crossfade into the finale (like the duo's `inAt`), same engine work as #2 |
| 4 | **Fastest zooms**: "Identity verified" zooms 1.3x in ~0.7 s (peak 2.9 % per frame) and back out in 0.8 s; KHQR zooms 1.4x in 1.2 s (peak 2.7 % per frame). Both are eased (slow start, slow stop), but they are 3x faster than every other move. | 9.3-10.0, 12.6-13.2, 24.2-25.1 s | Optional | if they feel rushed: zoom-in 0.9 -> 1.3 s, KHQR 1.2 -> 1.6 s (storyboard `cam` 5th number; the video gets no longer) |

## Checked and fine

- **Every other cut**: 9.0 s (filter -> product page, step -12), 15.1 s (product page -> cart, same brightness), 32.53 s (dashboard -> add product): normal edits.
- **Zoom and push-ins**: every move starts and stops eased (no jolt). Totals: Halal clothing +16 %, Filter +23 %, Add to cart +24 %, Dashboard +19 %, Reviewed +14 %, Add product +3 %, Khmer ~0 %.
- **No stutter**: no repeated frames during any move (checked frame by frame). A dip in the measured zoom at 16.57 s is a measuring error (the change from frame to frame there shrinks smoothly: 2.29, 2.17, 2.07, 1.9).
- **No jitter**: 0 frames where the picture shakes back and forth while it should stand still.
- **Duo (desktop + phone)** 26.6-26.8 and back 29.3-29.4: crossfades, max step 19.
- **Hook into the browser** 3.2-3.33: smooth fade (steps of 8-9).

## Encoder keyframes now (seconds)
0, 3.10, 5.80, 9.00, 17.33, 21.50, 26.77, 32.53, 37.47, 40.43: only at cuts (encoder default). Gaps: 3.1, 2.7, 3.2, **8.3**, 4.2, 5.3, **5.8**, 4.9, 3.0, **5.8** (to the end).
