# NEXT_STEPS.md: What's Left for My Portfolio (2026-11-14)

> Put this file in the root of my portfolio repo (`hongrinrasmey.github.io`, next to `index.html`).
> It lists what's still left to do. **Everything else is already done and approved: don't redo it.**
> Files that go with it: `AUDIO.md` (music and sound, item 10) and `REVIEW.md` (final review, last).

---

## 0. Read first (rules)

1. **Read `CLAUDE.md` (especially the progress log section) and `PROGRESS-LOG.md` before anything.** They are the source of truth for how the project works and what I've already decided. If this file disagrees with them, follow them and tell me.
2. **Don't undo approved work.** One decision has changed: **I now want sound in my videos** (see `AUDIO.md`); record that in `CLAUDE.md` + `PROGRESS-LOG.md`. Already decided by me: site design (Warm orange, Geist), the 3 projects, video headlines, the idevo AI story, the RielTrack income chapter, the KH videos with no admin role, the free address `hongrinrasmey.github.io`, the video engine in `video-studio/` (`promo.html`, `render.js`, the `*.json` storyboards).
3. **When you're not sure: check first, then ask.** Check my GitHub (`hongrinrasmey`), the live site, `video-studio/FACTS.md` and the repo files. If that doesn't answer it, ask me. Put all questions in one numbered list with a suggested answer each. Never invent facts, numbers or text.
4. **Keep the existing rules:** never commit or push while a render is writing into `assets/videos/`; new engine features are **opt-in keys** (they don't change other videos); after every video change run the same QA as before (full decode, moov first, brightness/flash scan, stills at cuts, Edge playback test, `node tools/check.mjs`); update `index.html` video descriptions if a duration changes; update `CLAUDE.md` + `PROGRESS-LOG.md` after every change.
5. **Ask before:** pushing, editing any repo other than this one, re-recording, or anything in the "Optional" list.
6. **Explain in simple language** after each item: what changed, which file, how I can change it myself.
7. Work **one item at a time**, in the order below. Show me the result and wait for my OK before the next item.

---

## 1. My text (I write the facts; you help me polish)

These are the hidden `[TODO]` slots in `index.html` (and the bio in `CLAUDE.md` §3). **Don't write them yourself.**
For each one: ask me short questions, then turn my answers into clear, short, honest English (no buzzwords, no claims I didn't make) and show me before editing.

| # | Slot | Questions to ask me |
|---|---|---|
| 1 | KH Halal: "hardest problem + what I learned" | What was the hardest part (e.g. payments, verification, Khmer)? How did you solve it? What did you learn? |
| 2 | idevo: same | Same questions |
| 3 | RielTrack: same | Same questions |
| 4 | About: learning now / job I want / what I enjoy building | What are you learning now? What kind of job do you want? What do you enjoy building most? |
| 5 | LinkedIn link | Your LinkedIn URL (check it opens) |
| 6 | Short bio (2–3 sentences) | Who are you, what do you build, what makes you different? |

Remember the honesty rule in `CLAUDE.md`: the apps were built with AI coding tools, and the page says so. Keep that consistent.

---

## 2. Git check

7. Show me `git status` and whether everything is committed and pushed. If something isn't, tell me what it is (in plain words) and **ask me before committing or pushing**. Never during a render.

---

## 3. Video improvements

8. **QR code in the outros (all 3 desktop promos + 3 phone promos).** People watching on a laptop can't easily type the address on a phone.
   - Add an opt-in outro key (e.g. `"qr": "<url>"`) to `promo.html`; place a small, clean QR next to the CTA with a label ("Scan to download" / "Scan to open"). Keep the existing outro layout balanced; in the phone versions, make it big enough to scan from another screen.
   - URLs: KH Halal → the live site; idevo → `Idevo-Downloads` latest release page; RielTrack → `RielTrack-Downloads` latest release page. **Verify each URL loads first.**
   - **Scan-test every QR** from the rendered video frame (e.g. `zbarimg`/`pyzbar`) before you call it done.
   - Show me a still of each outro before rendering all of them.
9. **Smooth the 3 hard cuts in the KH videos** (white product page ↔ green hero), noted in the log as "left as is: needs engine work".
   - Add an opt-in key for a short **crossfade between clips** (e.g. `"xfadeCut": 0.3` on a cut) in `promo.html`, used only where these 3 cuts are (KH promo, KH phone promo, KH full demo).
   - Check the brightness step scan improves and nothing else changes. Show me before/after stills.

9b. **Keyframe every 2 seconds (encoder setting).** Right now the encoder uses its default (max gap ~8.3 s: 250 frames), so dragging the progress bar can land far from where you click. In `video-studio/render.js`, add a keyframe interval of 2 s (e.g. `-g 60 -keyint_min 60` at 30 fps; keep scene-cut keyframes on), as an opt-in setting or the new default for all renders. Apply it in the **same re-render** as items 8–10 (no extra render just for this). Check with `ffprobe -skip_frame nokey` that the max gap is ≤ 2 s, and report the file-size change (expected small, ~5–10%).

---

## 3b. Sound (new decision)

10. **Music and sound effects: follow `AUDIO.md` completely.** In short: record the decision change, ask me its questions, recommend 3 licensed tracks per video, make previews so I can listen, then mix the one I choose (approved cuts unchanged), keep silent versions, add the website sound button only after my OK. Do this **after** items 8–9, so the audio is mixed onto the final picture.

---

## 4. Tests (I haven't done these yet)

11. **Real people test (I do it; you prepare it).** Create `video-review/PEOPLE_TEST.md`:
    - Who: 3–5 people (a developer, a non-technical person, someone who might use one of the apps).
    - How: show each 16:9 promo once at normal size **with sound on**, explain nothing. Add a question: "Did the music fit the video?"
    - Ask: (1) What does this app do? (2) What do you remember most? (3) Was anything confusing, too fast or too slow? (4) Would you click "Try it live" / "Download"? Why? (5) One thing you'd change?
    - A table for me to fill in. After I fill it in, turn the answers into a fix list (most common problems first) and ask me which to do.
12. **Cold-viewer test.** Start a **fresh agent with no context**; give it only a contact sheet (one frame per second) of each promo, no other files. Ask what the app is, who it's for, its 3 main features and what to do next. Compare with `video-studio/FACTS.md`. Report anything it got wrong or missed as a clarity issue, with a suggested fix (don't change the videos yet).
13. **Social compression test (only if I say I'll post the videos on social media; ask me).** Re-encode each promo at 720p ~2 Mbps and 480p ~1 Mbps; check that captions and labels stay readable and the dark background doesn't band badly. Report; don't change anything yet.

Write the results of 11–13 in `video-review/REPORT.md` in simple language.

---

## 5. Outside the website (drafts only; I post them myself)

14. **GitHub profile.** Draft a profile README (`hongrinrasmey/hongrinrasmey`, the special profile repo) that matches the site: name, role, one-line intro, the 3 projects with links (live site / APK pages), portfolio link. Plus a list of what to set in my GitHub profile (photo, bio, pinned repos). **Show me the draft; don't create the repo or push without my OK.**
15. **LinkedIn.** Draft my headline (same as the site: "Full-Stack & Android Developer"), a short About section, and the 3 projects for the Projects section, using only facts from the site and `FACTS.md`. I paste them myself.
16. **Sharing post.** Draft one short LinkedIn post announcing the portfolio (with the link), and a one-line version for my Telegram bio/CV. Honest, no hype.

Save drafts in `drafts/` (`github-profile-README.md`, `linkedin.md`, `share-post.md`). Don't publish anything.

---

## 6. Optional (don't do unless I ask)

- Case-study page per project
- Khmer / English switch for the portfolio
- Adding FileShift as a 4th project
- Custom domain + professional email

---

## 7. After everything here is done

Run the final review in `REVIEW.md`.

---

## 8. Done means

- [ ] Items 1–6 filled with my words (polished), shown to me before editing
- [ ] Git clean and pushed (with my OK)
- [ ] QR codes in all 6 promo outros, each scan-tested; layout approved by me
- [ ] KH hard cuts crossfaded; QA passed; nothing else changed
- [ ] Keyframe every ≤ 2 s in all rendered videos
- [ ] Sound added following `AUDIO.md` (tracks chosen by me, licensed, mixed, silent versions kept)
- [ ] People test sheet ready; cold-viewer + (if asked) compression results in `video-review/REPORT.md`
- [ ] Drafts for GitHub, LinkedIn and the sharing post in `drafts/`
- [ ] `CLAUDE.md` + `PROGRESS-LOG.md` updated after each item
