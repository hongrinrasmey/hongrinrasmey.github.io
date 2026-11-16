# Video review, round 2: all 5 promos (2026-11-16, evening)

Reviewed: the 5 videos in `assets/videos/` after the 17:52 renders (KH 41.13 s, idevo 41.4 s + phone, RielTrack 34.87 s + phone).
Nothing changed. Stills: `video-review/frames/review-2026-11-16b/` (git-ignored): 2 fps sheets of every video (1 fps for the phone versions), plus every-frame strips around each flagged moment.

## How it was checked
- Every frame measured (1,234 + 1,242 + 1,242 + 1,046 + 1,046): change from the frame before, one-frame jumps (hard cuts), brightness jumps, flashes, repeated frames while moving (stutter), still holds over 1.5 s.
- Every video looked at in 2 fps sheets; flagged moments in every-frame strips.
- Sound measured, not heard: whole-video loudness, true peak, loudness range, loudness every 2 s, loudest moments.
- Decode: 0 errors in all 5.

## Measured results

| | KH | idevo | idevo phone | RielTrack | RielTrack phone |
|---|---|---|---|---|---|
| Hard cuts | 0 | 0 | 0 | 0 | 0 |
| Brightness jumps | 0 | 0 | 0 | 0 | 3 frames (outro fade, 31.1 s) |
| Flashes | 0 | 0 | 0 | 0 | 0 |
| Stutter frames | 0 | 0 | 0 | 0 | 0 |
| Loudness (LUFS) | -16.3 | -16.3 | -16.3 | -16.0 | -16.0 |
| True peak (dBTP) | -1.9 | -2.6 | -2.6 | -2.6 | -2.6 |
| Loudness range (LU) | 4.0 | 3.3 | 3.3 | 1.2 | 1.2 |
| Loudest moment | outro 38.0 s | outro 38.3 s | outro | outro 31.7 s | outro |

All 10 problems from the first review today are gone: the KH blink, the checkout skeleton, the blank cart page, the RielTrack ghost scroll, the loud notify sound, the quiet RielTrack second half and the quiet overall mix (now -16 LUFS).

## Scores (1-10)

| | KH Halal | idevo 16:9 | idevo phone | RielTrack 16:9 | RielTrack phone |
|---|---|---|---|---|---|
| Content | 9 | 9 | 9 | 9 | 9 |
| Flow / story | 9 | 9 | 9 | 9 | 9 |
| Cuts / editing | 8.5 | 9 | 9 | 9 | 9 |
| Smoothness | 9 | 9 | 9 | 9 | 8.5 |
| Transitions | 8 | 9 | 9 | 9 | 8.5 |
| Motion graphics | 9 | 9 | 8.5 | 9.5 | 9 |
| Graphics / detail | 9 | 9 | 9 | 9 | 9 |
| Sound effects | 8.5 | 9 | 9 | 9 | 9 |
| Volume / mix | 9 | 9.5 | 9.5 | 9 | 9 |
| **Overall** | **8.8** | **9.1** | **9.0** | **9.2** | **8.9** |

Before (morning): KH 7.8, idevo 8.6 / 8.4, RielTrack 8.2 / 8.0.

## What is very good now
- **Hooks**: short and strong. "Buy halal. / Sell halal. / Pay in riel.", "One sentence. / A whole course.", RielTrack's $ that turns into ៛ with the Khmer line under it. The app shows up by 2.5-3 s in all three.
- **Story**: one idea per chapter, the caption always matches the screen, the label points at the right thing, and the order makes sense (shopper buys, then seller sells; idevo goes describe, plan, lessons, check, flashcards, review).
- **Motion**: no zoom any more, the phone/browser stays the same size the whole time, and it reads calmer and more "product". The KH desktop + phone duo, the shopper/seller finale, the idevo "Comes back in" timeline and the RielTrack text card ("No account. No cloud. No ads.") are the strongest graphic moments.
- **Endings**: clean in all five: name, one line, badge, QR + address, your name. The outro boom is the loudest moment in every video, as it should be.
- **Sound**: every video sits at web loudness (-16) with headroom. The song never jumps in level (RielTrack range 1.2 LU, very even).

## What is left (all small; none is a must-fix)

**1. KH 0:09.6: big ghost of the hijab photo over the cart. FIXED (same day): the cause was the cart beat's `dissolve` [37.6, 0.25], not the 0.45 s match cut at 0:07.8 (that circle reveal is clean). Dissolve now 0.12 s: ghost 5 -> 2 frames.**
A match cut works best when the two frames line up. Here the product page and the cart have different layouts, so for about 6 frames you see a large half-transparent hijab on top of the cart table. It is not wrong, just the softest moment in the KH edit. Option: shorten it to 0.25 s, or keep it (you picked it from the test videos). Still: `kh-9.2-matchcut.jpg`.

**2. KH 0:12.4-12.5: loud moment, almost as loud as the outro. Checked after the review: no fix needed.**
Momentary -10.8 LUFS against the outro's -10.1. It is not an effect: the only effect near it is the quiet chapter whoosh at 11.93. The peak is a drum hit in the song itself (Fashion Minimal at song time 20.0 s, measured -10.9 in the raw track), and it lands 0.5 s after the Checkout cut. It is a natural accent and still under the outro.

**3. KH 0:19.5: no caption for a moment. Checked after the review: no fix needed.**
Every-frame check: the gap is about 4 frames (0.13 s), the normal caption change at every chapter cut (the old caption fades out in 0.3 s, the new one rises on the cut frame). The 2 fps sheet just happened to sample it.

**4. idevo 0:07.7-0:09.6: the "Planning…" wait (1.9 s still).**
This is the longest still moment in idevo: the AI is thinking and only a grey skeleton shows. It is honest (the AI really takes time), but 0.8 s could go.

**5. idevo 0:27.5-0:29.3 text card: the text runs over the blurred phone.**
"Study offline. No account." crosses the left edge of the blurred phone behind it. It stays readable (white on dark), and it looks like a design choice. Only change it if you want the text in clear space.

**6. idevo phone version: the "Comes back in:" timeline is small.**
It sits top right next to the SPACED REPETITION chip. It is readable at full size. On a phone screen the labels are about 8 px. Optional: drop it on the phone version, or make it larger.

**7. RielTrack 0:09.53-0:09.63 (3 frames): the app's own sheet slides down over the home screen.**
After "Save transaction" the New transaction sheet closes (Android animation), then the match cut fades into the home list. It looks like a normal app close, not a glitch.

**8. RielTrack phone version, 0:31.1-0:31.2: brightness drop as the white phone fades into the dark outro** (3 frames). It is the same as before. A longer fade (0.4 s) would soften it.

## Content notes (no change needed)
- The KH "Pay with KHQR" chapter shows the KHQR option, not a QR code ("Place order" is never pressed, by your rule). The label "KHQR bank QR · in riel" makes the point.
- The KH seller dashboard shows real store numbers (KHR 73,800, 47 orders), allowed earlier.
- Privacy: checkout fields and the delivery details are blurred in every frame checked.

## Suggested order (only if you want them)
1 (your taste), then 4 + 6 (idevo), then 8. (2 + 3 were checked: nothing to fix.)
