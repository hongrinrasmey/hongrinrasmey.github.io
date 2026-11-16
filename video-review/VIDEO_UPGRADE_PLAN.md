# Video upgrade plan (updated 2026-11-16, round 2)

Source: the frame-by-frame review (`VIDEO_REVIEW-2026-11-16.md`), the editor / motion / sound talk, and the rounds since.
Impact H/M/L, effort S/M/L. **⚠ = needs the owner's decision.** ✅ done · 🔄 rendering / in progress · ✖ dropped.

## Where things stand
- **Live** (commit `9a3be35`, pushed): Phase 0 glitch fixes + Phase 1 sound.
- **Merged, not pushed**: motion engine (`f980bb0`, branch `claude/promo-motion-ba3dd9`).
- **Not committed**: Phase 2 + 6 (KH 41.1 s, idevo 41.4 s, new hooks), the picked motion keys, no zoom anywhere, `?v=1116k`.
- 🔄 Rendering now: idevo x2 + RielTrack x2 (no push-in), then KH (no push-in).

## Done (short)
| # | What | Result |
|---|---|---|
| 1-6 | Phase 0 glitches | ✅ KH blank page / skeleton / map blink gone, RielTrack ghost scroll gone, notify quieter |
| 7-11 | Phase 1 sound | ✅ -16 LUFS, RielTrack part 2 +6 dB, chapter whoosh (A2), hero riser + hit (B4), 0.3 s gap before the outro boom |
| 12 | Cuts on beats | ✅ songs re-fit: idevo 5/7, KH 4/8 cuts on a beat |
| 15-16 | Shorter | ✅ KH 41.1 s, idevo 41.4 s |
| 22-26 | Motion | ✅ captions slide in, labels pop in steps, one easing set, stepped outro, caption on the cut |
| 37, 41 | KH layout | ✅ bigger captions (54 px), white pages 5% darker |
| 40, 42 | Safe area, cursor | ✅ labels inside 5% margin; KH click ripple was already there |
| 43-44 | Hooks | ✅ KH "Buy halal. / Sell halal. / Pay in riel.", idevo "One sentence. / A whole course." |
| 52-53 | First frame, idevo phone timeline | ✅ hook text on frame 1; compact "Comes back in" above the phone |
| 48 | Posters | ✅ tool exists (`render.js --poster-only`); picking the frames is #63 below |
| 54 | Dashboard numbers | ✅ owner: keep |

## Dropped (owner or test result)
| # | What | Why |
|---|---|---|
| 27 | Hero push-in | ✖ owner: no zoom in any video ("it already on the phone"; KH too) |
| 28 | Device drift | ✖ owner |
| 29 | Count-up numbers | ✖ shows in-between amounts the app never showed |
| 31 | Motion blur | ✖ = ghosting |
| 33 | Flying element (carry) | ✖ looked like a sticker |
| 38 | Labels next to target on phones | ✖ covers app text (owner chose labels above, 2026-11-14) |
| 39 | RielTrack English/Khmer split | ✖ different totals; Khmer already in the hook + last chapter (owner) |
| 46 | Problem line in hooks | ✖ owner did not choose it |
| 49 | Subtitles file | ✖ owner |

## Left to do

### A. Finish this round (no decision needed)
55. ✅ Frame-check the 5 new renders (8-frame strips on every caption change, label pop, outro build; first frame). H/S
56. ✅ (only the cursor repeats 1 frame inside a 4x part: invisible, left) KH 0:32.5: one repeated frame inside motion (seller add-product chapter): look, fix with `smooth.py` or a 1-frame trim. L/S
57. Listen-through by the owner: whoosh level, riser + hit, song joins (KH ~0:16, idevo ~0:19.7), RielTrack 0:22+, outros. H/S
58. Commit + push: Phase 2 + 6, keys, no-zoom renders, docs (owner's yes). —
59. ✅ (junctions to the raw folders removed first; recordings intact) Archive the `promo-motion` session and its worktree (`.claude/worktrees/promo-motion-ba3dd9`); the branch is merged. L/S
60. Save the whoosh licence certificate in `video-studio/licenses/` (owner, from the Pixabay page). —

### B. Polish found in this round
61. ✅ (idevo: lessons chapter `"slide": "left"` (hard cut looked like a jump on phones), flashcards chapter `"slide": "up"`; KH hero dissolve 0.5 -> 0.3 s) Ghosted dissolves that show two screens at once: KH 0:04.5 (hero → scroll), idevo 0:14.0 and 0:20.5 (same page, different scroll). Use the new `"slide": "up"` push or a hard cut instead of `xfadeCut` (#34, #35). M/S
62. ✅ (0.15 s `dissolve` on the 5 clip jumps; expense clip starts 29.52, 2 half-closed-sheet frames gone; hero sound 11.083 -> 11.017 with its label) RielTrack phone version: one-frame screen swaps at 0:06.1, 0:09.1, 0:14.5, 0:15.3 and 2 half-closed-sheet frames at 0:09.8. Trim the 2 frames; give the swaps a 0.15 s dissolve (review #9, #10). L/S
63. ✅ (RielTrack 11.8 home with the -12,000 ៛ row, idevo 24.8 AI flashcards list, KH 8.233 product page kept) Posters at a strong frame with no motion (KH product page or payment, idevo AI flashcards list, RielTrack 12,000 ៛ row), via `--poster-only` (no re-render). M/S
64. ✅ (one `"key"` word on every chapter of all 3) Caption underline (`"key"`) on more chapters, one word each (e.g. idevo "AI plans the **modules**", RielTrack "Add an expense in **riel**"). Only KH "KHQR" has one now. L/S
65. ✅ (VIDEOS.md §4 rewritten) Docs out of date: `VIDEOS.md` §4 still says "slow push-in 1.1-1.4x on desktop beats" and "no music"; update to: no zoom, music + soft effects, motion upgrade keys. L/S
66. ✅ (idevo 14.2 -> 24.4 = AI flashcards; KH 8.4 and RielTrack 5.3 kept) Hover preview start times (`data-preview`) and posters after the motion change: check the preview still starts on a calm frame (KH 8.4, idevo 14.2, RielTrack 5.3). L/S

### C. Bigger ideas (⚠ owner decides)
67. ✖ (owner picked 68 + 71 only) Phone to the side in some 16:9 chapters (`"side": "left"`): works in the test, adds variety to idevo/RielTrack's 40 s of the same layout (#36). M/S
68. 🔄 (owner: KH + RielTrack; idevo skipped) One match cut per video (`"matchCut"`: the next screen opens as a circle from the tapped button), e.g. idevo "Plan the course", RielTrack "Save transaction" (#32). M/S
69. ✖ (not picked: +2.8 s, repeats the chapter before) idevo split "From lesson to flashcards" (`"type": "split"`), the only split left as an option (#39). M/M
70. ⚠ RielTrack riel ↔ dollar flip of the home total (#45; needs a new recording). M/M
71. 🔄 (owner yes: 37.57 -> 34.87 s) Shorter RielTrack too? It is 37.6 s; the 3 would end up about the same length. L/S
72. ✖ for now (2-3 h; the test shows the owner's name unblurred on checkout + payment: blur first if ever made) A KH phone version again (dropped 2026-11-14): phones now play the 16:9 KH video letterboxed. M/L

## QA after every render
- Per-frame scan: hard cuts, brightness jumps > 20, flashes, repeated frames in motion, ghost frames.
- 8-frame strips around every cut and every change.
- `render.js --events` before/after (song + extras in sync).
- Loudness per video + every 2 s, true peak <= -1 dBTP, outro the loudest moment.
- Decode 0 errors, `moov` first, keyframe every 2 s.
- Privacy: blurs in every checkout/payment frame.
- `node tools/check.mjs` PASS; Edge pop-up test at the 6 sizes.

## Owner's answers so far
- 2026-11-16 A-H: -16 LUFS yes · KH + idevo ~40 s · (push-in yes, later removed) · no drift · KH hook "Pay in riel." · idevo "One sentence. / A whole course." · shortlist sounds → picked A2 + B4 · no subtitles · keep dashboard numbers.
- 2026-11-16 motion test: no split (Khmer stays last in RielTrack), no count-up, no carry, labels above the phone.
- 2026-11-16 after watching idevo: no zoom in idevo, RielTrack and KH.
