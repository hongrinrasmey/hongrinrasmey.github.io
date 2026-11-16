# Video upgrade plan (2026-11-16)

Everything from the frame-by-frame review (`VIDEO_REVIEW-2026-11-16.md`) and the editor / motion / sound talk, in one list.
Impact H/M/L, effort S/M/L. **⚠ = needs the owner's decision first** (touches an earlier rule or choice).
Nothing here is done yet unless marked ✅ or 🔄.

## Phase 0 — glitch fixes (started 2026-11-16)
1. ✅ KH 0:12.0 blank page + cart picture pops in → cut past the load, 0.25 s dissolve. Done, frame-checked.
2. ✅ KH 0:16.4 checkout grey skeleton → cut past the load, 0.25 s dissolve. Done, frame-checked.
3. ✅ KH 0:18.8 highlight blink + "Delivery: Checking…" → no dissolve, cut from pin click to the loaded fee. Done, frame-checked.
4. ✅ RielTrack 0:09.9 + 0:21.8-22.3 ghosted scroll → `smooth.py --scroll`. Done, frame-checked (both versions).
5. ✅ `notify` sound -3 → -7 dB (idevo 0:23.65, KH 0:42.88). Done.
6. ✅ Frame-checked, decode 0 errors, check.mjs PASS. Commit: waiting for the owner.

## Phase 1 — sound (quick, remix only, no re-render)
7. ✅ Master to about -16 LUFS (now -19.5..-20.4). Same song/effect balance, just louder. H/S
8. ✅ (+6 dB on part 2) RielTrack: louder section of the song for part 2, or +4 dB on part 2 (music drops ~6 LU from 0:22). H/S
9. ✅ (A2 "Soft luxury air whoosh #8" = kit `chapter` sound `airwhoosh`, file `video-studio/audio/sdanezis-soft-luxury-air-whoosh-8-592506.mp3`; a tap within 0.2 s of a cut wins) Soft low whoosh on each chapter change (not a beep: the owner removed the beeps). M/S
10. ✅ (owner picked B4 = kit riser + hit; KH 24.583, idevo 30.017, RielTrack 11.083; hit +1 dB dips the music; still under the outro) One riser + hit on each video's hero moment (KH payment page, idevo AI flashcards, RielTrack 12,000 ៛ ≈ $2.93). M/S
11. ✅ (`"outroGap": 0.3`; the outro riser plays alone in the gap) About 0.3 s of no music right before the outro boom. M/S
12. Moved to Phase 2 (lengths change there anyway): Chapter cuts on downbeats (shift chapter starts by ±0.2 s, or re-fit `parts`). M/M
13. Music dips only under the hero moments (contrast). L/S
14. ⚠ Any new effect file: free + licensed only, the owner picks, licence proof in `video-studio/licenses/` (AUDIO.md). —

## Phase 2 — the edit (pacing)
15. ⚠ KH to about 40 s: shorten cart → checkout → map → payment (about 15 s of forms) to about 8 s. H/M
16. ⚠ idevo to about 40 s: trim the AI waits (0:09-0:10, 0:13.5-0:15.5, 0:28.5-0:29) and long lesson scrolls. H/M
17. A payoff every 5-8 s: check each chapter; nothing new for 3 s = cut or speed up. H/M
18. Bolder speed ramps on waits and scrolls (4-8x, sharp ease into the result). M/S
19. Result holds 1.5-2 s with the label (now up to 3 s). M/S
20. Cut on action: every chapter change lands on a tap or a movement. M/S
21. No loading frames anywhere: scan all 5 again after each render (idevo skeletons are the app's own AI wait; keep them short). H/S

## Phase 3 — motion design (`promo.html`)
22. Animated chapter captions: slide up 12 px + fade, ~300 ms, orange underline draws under the key word, old caption leaves first. H/S
23. Labels: outline draws → connector line → label pops (scale 0.9 → 1.03 → 1), staggered. M/S
24. One shared easing curve + 2-3 fixed durations for all motion. M/S
25. Outro builds in steps (name → line → pills → QR → name line) with one sound hit. M/S
26. Caption changes on the cut frame, never after (KH 0:33.8 "Works on phones too" over the dashboard). M/S
27. ⚠ One hero push-in per video (1.1x, slow) on the money shot only (owner said "too much zoom" before). H/S
28. ⚠ Very slow device drift of 2-4 px per chapter (VIDEOS.md says "no sway"). L/S
29. Number count-up overlay on key figures (KHR 73,800, $797.30, 5 cards). M/M
30. Light parallax: background glow/grid moves slower than the device during moves. M/M
31. Subtle motion blur on 4-8x ramps and pushes. L/M

## Phase 4 — transitions
32. Match cut on a tap: the tap ripple / tapped button grows into the next screen (1 per video). H/M
33. Element carry-over: the highlighted thing flies to its place on the next screen (RielTrack riel amount → home list). H/L
34. Directional push after a scroll/swipe, in the same direction. M/S
35. Dissolves only for time skips (page loads, waits), not for chapter changes. M/S

## Phase 5 — layout and composition
36. idevo + RielTrack 16:9: vary the framing between chapters (phone left / right / centred, 2 phones for before/after). H/M
37. KH: bigger chapter captions (closer in size to the hook). M/S
38. Phone versions: label next to its target with a short connector line (not fixed at the top). M/M
39. One split-screen per video: RielTrack English | Khmer, idevo lesson | flashcards. M/M
40. Every label inside the 5% title-safe area. L/S
41. KH white pages about 5% darker so the cuts on the dark stage are less harsh. L/S
42. KH cursor: smooth path + click ripple on every click, same as the phone taps. L/S

## Phase 6 — content and story
43. ⚠ KH "Pay with KHQR" has no QR on screen ("Place order" is never pressed). Options: (a) an end card with an example KHQR graphic labelled "example", (b) a hook line that does not promise the QR, (c) keep it. H/M
44. ⚠ idevo hook leads with the wow: the finished course + flashcards for 1 s, then "One sentence. A whole course." (owner picks the words). H/S
45. ⚠ RielTrack extra "aha": the home total flips riel ↔ dollar once. M/M
46. ⚠ A problem line in each hook before the app (owner writes it, e.g. RielTrack "Cash in riel, apps in dollars?"). M/S
47. Same end wording for all 3 ("Scan to open" / "Scan to download" + address). L/S

## Phase 7 — new items found while listing
48. Posters: show each video's hero moment with the hook text, not a random frame (now KH 10.4 s, idevo 17.1 s, RielTrack set in the configs). M/S
49. ⚠ Captions file (`.vtt` subtitles) for visitors with sound off or using a screen reader: the videos have no spoken words, so it would describe chapters only. Ask first (a new feature). M/M
50. After any length change, update: `index.html` "about N seconds" text, `data-preview` start times (hover preview), poster times, `?v=` tag, `FACTS.md` clip rows. — 
51. After any re-render: keep the silent copies (`assets/videos/silent/`), and re-check file size (now 4-8 MB each; keep each under ~10 MB). —
52. The first frame of each video is almost black (hook text not in yet). If the browser shows it before the poster loads, it looks empty: start the hook text on frame 1. L/S
53. idevo phone version skips the "Comes back in:" timeline: add a compact version above the phone (the flashcard buttons alone are tiny). M/S
54. KH seller dashboard shows real store numbers (KHR 73,800, 47 orders): allowed before; confirm the owner is still fine with it. ⚠ —

## QA after every phase (VIDEOS.md §5 + this review)
- Per-frame scan: hard cuts, brightness jumps > 20, flashes, repeated frames in motion, ghost frames.
- 8-frame strips around every cut and every change made.
- Events: `render.js --events` before/after (song + extras stay in sync).
- Loudness per video + every 2 s, true peak <= -1 dBTP, loudest moments listed.
- Decode 0 errors, `moov` first, keyframe every 2 s.
- Privacy: blurs in every checkout/payment frame.
- `node tools/check.mjs` PASS; the Edge pop-up test at the 6 sizes.
- Owner listens to: the start of each song, RielTrack 0:22+, idevo 0:23, each outro.

## Owner's answers (2026-11-16)
- **A:** yes, master to -16 LUFS (#7).
- **B:** both KH and idevo to about 40 s (#15, #16).
- **C:** one hero push-in per video only (#27); no device drift (#28 dropped).
- **D:** change the KH hook, no fake QR (#43 option b): "Buy halal. / Sell halal. / Pay in riel."
- **E:** my suggested lines: KH line 3 "Pay in riel.", idevo "One sentence. / A whole course.", RielTrack keeps "Track your money." (#44). Problem lines (#46) not chosen: skip.
- **F:** I shortlist 3-4 free licensed candidates per new sound (chapter whoosh, riser + hit), the owner listens, picks and downloads (#9, #10, #14).
- **G:** no subtitles file (#49 dropped).
- **H:** keep the real seller dashboard numbers (#54 done).

## Decisions the owner needed to make before phases 1-6 (answered above)
A. Louder master to -16 LUFS? (#7)
B. Shorten KH and idevo to about 40 s? (#15, #16)
C. One hero push-in per video? (#27) Device drift? (#28)
D. KH KHQR payoff: a, b or c? (#43)
E. New hook words for idevo / problem lines? (#44, #46)
F. New sound effects: you pick from licensed free ones? (#9, #10, #14)
G. Subtitles file? (#49)
H. Seller dashboard numbers still OK? (#54)
