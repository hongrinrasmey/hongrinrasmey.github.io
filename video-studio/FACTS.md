# Where every word in the promo videos comes from

Every caption, callout and outro line in the three promos, with its source.
"Recording" times are seconds in the raw take named in each storyboard file (`<slug>.json`).
Numbers that appear on screen (money, counts, streaks) are never captioned.

**Owner rules (2026-11-13):** every video shows the KH Halal checkout + KHQR payment page (stopped before "Place order", personal details blurred), idevo making a path and its lessons with its built-in AI (owner, later the same day), and RielTrack adding an income.

## RielTrack (`rieltrack.json`, take `rieltrack-104550`)

| Text in the video | Source |
|---|---|
| Spend in dollars. / Pay in riel. / Track both. | Headline approved by the owner (2026-11-13). Fact: `RielTrack-Downloads` README, "A private, offline money tracker for US dollars and Cambodian riel" and "Record every amount in USD or riel". |
| Your month at a glance · DOLLARS AND RIEL | README "Home dashboard: this month's income, spending, and net cash flow". Recording 1.0–3.9 s + 7.2–7.5 s (net cash flow in $ with the ≈ riel amount under it). |
| Add an expense in riel · 12,000 ៛ ≈ $2.93 | README "Record every amount in USD or riel". Recording 7.5–32.6 s, jump cuts (Add expense, KHR chosen, 12000 typed and held, Save, Home list row "Food and drinks −12,000 ៛" with "≈ $2.93" under it). |
| Every transaction in one list · SEARCH AND FILTER BY CURRENCY | README "Transactions". Recording 37.0–39.4 s + 43.25–43.6 s (History: "Search transactions" box, Type / Date / Currency / Category filters, ៛ and $ rows). |
| Compare with last month · THIS MONTH VS LAST MONTH | README "Reports: ... month-to-month category comparisons". Recording 43.6–44.2 s + 46.45–50.1 s (Reports tab tapped, scroll to "Compared with last month"). |
| Stay inside your budget · MONTHLY LIMIT · ON TRACK | README "Budgets". Recording 59.8–62.5 s ("Overall monthly limit", "On track"). |
| No account. / No cloud. / No ads. | README "No account, no cloud, no analytics, no ads." |
| Use it in Khmer · LABELS IN ខ្មែរ | README "English and ភាសាខ្មែរ". Recording 77.2–78.3 s + 81.25–83.6 s (Settings → ខ្មែរ, then Home with Khmer labels). |
| Add income too · MONTHLY INCOME | Take `rieltrack-income-190346` (`scripts/record-rieltrack-income.sh`): Add income, $150, Freelance, saved (8.45–9.95, 18.0–18.45, 22.7–22.95, 23.3–25.9 s); Home income goes from $850.00 to $1,000.00. Sample entry, deleted again after the take. Categories on screen: Salary, Freelance, Allowance, Gifts, Other income. |
| v1.6 · Android 8.0+ · Download APK | Latest release `v1.6` on `RielTrack-Downloads`; README "Requires Android 8.0 (API 26) or newer". |
| github.com/hongrinrasmey/RielTrack-Downloads | Checked: `releases/latest` returns 200 (2026-11-13). |

On-screen amounts are sample data typed in by `scripts/seed-rieltrack.sh`.

## idevo (`idevo.json`, take `idevo-153647`)

Order since 2026-11-14 (owner: "the order of the flow is not well", re-cut after QA reviews): hook about the AI → describe → AI plans → AI writes the lessons → the same AI lesson's own check question → "Remember it longer. / Offline. No account." → flashcards → Khmer → outro. Short-promo style like RielTrack: no chapter numbers, no `sub` lines. Main take `idevo-153647` now gives only flashcards and Khmer.

| Text in the video | Source |
|---|---|
| Describe what to learn. / AI drafts the course. | Hook since 2026-11-14 (owner: "do all of these" after the review proposed it). Fact: take `idevo-ai`, a one-sentence goal becomes a path; app button "Plan the course"; every AI result is labelled "AI draft". |
| Describe it in one sentence · FILLED IN BY AI | Take `idevo-ai-112235` 20.8–31.4 s: the typed sentence, "Set up with AI", then the filled title and goal; screen text "Check what AI filled in, then tap Create." |
| AI plans the modules · AI DRAFT TO CHECK | Take `idevo-ai-112235` 42.0–55.7 s: "Plan with AI", 4 modules picked, "Plan the course", the 4-module plan under "AI draft. It can be wrong: read it, and edit or untick anything before saving." |
| AI writes the lessons · LABELLED AI DRAFT | Take `idevo-ai-112235` 122.9–163.5 s sped up ("Fill module with AI": the 3 lessons go from "Writing..." to ticked, "Save 3 lessons"), hard cut to take `idevo-ailesson-112321` 5.25–8.6 s (lesson "Install Flutter and IDE" with the note "AI draft (gpt-oss-120b). Check facts before relying on them."). |
| Short lessons with a check · ANSWER + REASON | Take `idevo-ailesson-112321` 8.6–37.1 s: the same AI lesson scrolled to its own "Check yourself" ("What is the purpose of adding Flutter's `bin` folder to the system PATH?"), "Show answer", then "Answer: To allow the `flutter` command to be run from any terminal" with its reason. Every AI lesson gets 3 such questions (`backend/src/tasks.js`, lesson task). |
| AI facts (all AI chapters) | Takes `idevo-ai-112235` + `idevo-ailesson-112321` (2026-11-14, `scripts/record-idevo-ai.sh`, split in two because `screenrecord` stops at 180 s), the app's built-in AI on the owner's own server (gpt-oss-120b on Cloudflare Workers AI; not open to everyone yet, as the card says). Typed: "I want to learn Flutter to build a simple app screen". Everything else on screen is the AI's real answer: path "Flutter Simple App Screen", 4 modules, 3 lessons. Server address and token typed off camera from env vars (token rotated by the owner the same day); `pm clear` after. |
| Remember it longer. / Offline. No account. | "Remember it longer." = the owner-approved headline (2026-11-13), now leading into the flashcards. `Idevo-Downloads` README: "No account and no analytics", "Works fully offline" (lessons, flashcards, reviews). Placed after the AI chapters, so it only claims studying works offline: the built-in AI needs the internet. |
| Flashcards that come back · SPACED REPETITION | `index.html`: "Spaced-repetition flashcards". Recording 46.6–52.9 s, ends on the rating buttons (screen: "How well did you remember it?"). |
| Again 10 min · Hard 1 day · Good 3 days · Easy 4 days | Read from the rating buttons on screen at 47.6–53.9 s (first review of this card; the app changes them per card). |
| Use it in Khmer · ENGLISH AND ខ្មែរ | README "English and ខ្មែរ". Recording 86.0–93.5 s (Settings, Language sheet, ខ្មែរ, Home in Khmer; since 2026-11-14 the English Settings part is 1.7 s, the switch plays 4x). |
| AI-drafted lessons, flashcards and spaced repetition. | `index.html` idevo card + README ("learning paths, flashcards and quizzes"); "AI-drafted" = every AI lesson carries the app note "AI draft (gpt-oss-120b)". |
| Early build · v0.6.4 · AI runs on my server · Download APK | README "Version 0.6.4 is an early build"; release `v0.6.4`. No Android version is shown: none is confirmed. "AI runs on my server" = the idevo card lead in `index.html` (the AI runs on the owner's own server for now). |

The AI is shown (owner rule, 2026-11-13); the card and the outro line say it runs on the owner's own server for now.

## KH Halal Marketplace (`kh-halal-marketplace.json`, take `kh-165516`)

| Text in the video | Source |
|---|---|
| One marketplace. / Two sides. / Built on trust. · SHOPPER · SELLER | Headline approved by the owner (2026-11-13). |
| Halal clothing and dry food | Live site hero "Halal Clothing & Dry Food". Recording 0.6–3.4 s. |
| Filter by halal claim · HALAL CLAIM · VERIFIED SELLERS ONLY | Recording 16.8–20.0 s (filter panel: "Halal claim", "Verified sellers only"). The site says some claims are seller-declared, so the video says "halal claim", never "certified". |
| Every seller is identity-verified · IDENTITY VERIFIED | Recording 25.7–30.0 s ("Identity verified by marketplace"). Phone version: no RIEL AND DOLLARS label any more (removed 2026-11-14: it sat under the caption "Halal clothing and dry food", a different topic); riel and dollars still show on every price. |
| Pay with KHQR · KHQR IN RIEL | Recording 92.2–101.2 s ("KHQR payment", then "Pay in KHR"; the 93–98 s wait is played 8x). Since 2026-11-14 the desktop promo shows only the Payment page; the phone version keeps "Check out, pay with KHQR" (checkout, delivery fee, payment). The take stops before "Place order": no order, no payment. Email, phone and address are blurred. |
| Add to cart, no account needed · IN THE CART AS A GUEST | Recording 31.4–33.2 s (the "Add to Cart" click and its "Added to cart" notice) and 38.0–40.6 s (Shopping cart while signed out: "Login" / "Sign Up" in the header). |
| Price-drop alerts on your wishlist · PRICE DROPS · BACK IN STOCK | Recording 66.3–69.7 s ("We'll notify you when a saved item drops in price or comes back in stock"). Cut from the desktop promo on 2026-11-14 (shorter cut, about 46 s). |
| Full Khmer version · ENGLISH · ខ្មែរ | Recording 46.0–49.2 s: the language switch in the header ("English" / "ខ្មែរ") is highlighted, clicked at 47.3 s, and the site switches to Khmer. Phone version: "WHOLE SITE IN KHMER" on the Home screen in Khmer (42.5–45.6 s); the phone take switched language on the sign-in page, which is not shown. |
| A dashboard for every seller · SALES · ORDERS · REFUNDS | Recording 108.9–112.3 s. The figures belong to the live seller account and are not captioned. |
| Every product at a glance · LISTING QUALITY + STATUS | Recording 117.2–120.6 s (product table columns). Cut from both promos on 2026-11-14 (desktop about 46 s, phone about 47 s). |
| Add a product in three steps · PRODUCT · PRICE & STOCK · REVIEW | Recording 161.6–167.6 s: the Review step with all three step labels, ending on the "Submit for review" click. |
| Reviewed before it goes live · PENDING ADMIN REVIEW | Recording 169.4–172.6 s; add-product page says "Submit for admin review before it appears in the catalog". The demo product was deleted after the take (checked read-only on 2026-11-13). |
| Halal products from verified sellers in Cambodia. · WEB · Khmer + English · Try it live | Approved tagline; `index.html` card tags. |
| kh-halal-marketplace.onrender.com | Checked: returns 200 (2026-11-13). |

No admin screens are shown. The signed-in name chip is blurred in every signed-in shot.

## Every video

"Hong Rinrasmey · hongrinrasmey.github.io": the owner's name and the live portfolio (returns 200, no custom domain on 2026-11-13).

## Full demo (`kh-halal-marketplace-full.json` -> `assets/videos/kh-halal-marketplace.mp4`, the "Full demo" button; KH Halal only since 2026-11-13, the idevo and RielTrack rows below are kept as history)

Same takes and the same facts as above, plus these lines. Since 2026-11-14 (owner approved the shorter cut) it has 11 chapters, about 64 s: "Prices in riel and dollars", "Save favourites" and "Manage every product" were cut (riel and dollars still show on every product price). Explanation lines (`sub`) come from the earlier walkthrough
captions (the old `scripts/motion/<slug>.json`, removed 2026-11-13, still in git history), which were checked against the READMEs and the screens.

| Text in the video | Source |
|---|---|
| RielTrack: Shown in dollars too · DOLLAR VALUE UNDER RIEL | Recording 29.4–34.0 s (Home: "−12,000 ៛" with "≈ $2.93" under it). |
| RielTrack: SEARCH AND FILTERS · BIGGEST CHANGES BY CATEGORY · EACH CATEGORY'S SHARE · SPENT · LIMIT · LEFT | Read off the screens: History search + Type/Date/Currency/Category filters; Reports "Biggest changes", "Spending by category" with percentages; Budgets "Spent", "Limit", "Left". |
| idevo: Keep a study streak · STUDY STREAK | Recording 29.9–35.2 s ("2-day streak", "You studied on 5 of the last 7 days": sample days). |
| idevo: Flashcards on a schedule · CARDS DUE PER DAY | Recording 36.95–42.2 s (Review: "Coming up", "Flashcards due per day"). |
| idevo: Rate how well you remembered | Screen text "How well did you remember it?" (46.4–54.6 s). |
| idevo: Follow a learning path · PATH PROGRESS | Recording 62.45–66.6 s (Learn: "A sample path: three short lessons", "3 of 3 lessons completed"); README "build your own learning paths". The "New path" button is never pressed. |
| KH: Add to cart as a guest · IN THE CART | Recording 31.0–33.4 s ("Add to Cart" click, "Added to cart" notice) and 38.0–40.8 s, signed out. "Proceed to checkout" is never pressed. |
| KH: Add a product in three steps · PRODUCT · PRICE & STOCK · REVIEW | Recording 123.4–125.0 s (empty step 1), cut on the step change to 149.6–167.7 s (price and stock typed, played 4x to 158.4 s; then "Review" with all three step labels highlighted, and "Submit for review"). The filled step 1 with the pasted image link is not shown. No photo is uploaded, so the caption does not say "photo". |
| KH: Waiting for admin review | Recording 169.2–172.8 s ("Pending review"). |
| KH: Works on phones too · DESKTOP / PHONE | Desktop take home page (1.5 s) next to the phone take `khm-212214` home page (2.0 s): the same live site, mobile layout (owner, 2026-11-13: "it is a web app, it is responsive too"). |
| KH phone version (`kh-halal-marketplace-mobile.json`) | Take `khm-212214` (`scripts/record-kh-halal-mobile.js`, Pixel 7 size 412x915, mobile layout, live site). Same captions as the desktop promo, except "Check out, pay with KHQR" (checkout, delivery fee, payment). Its wishlist chapter ("Save favourites to a wishlist · ONE TAP TO THE CART", 52.8–56.0 s) and "Every product at a glance" (96.8–100.4 s) were cut on 2026-11-14 to match the shorter desktop promo. Filter label "HALAL CLAIM" (the Filters sheet section). Checkout email, phone and address blurred (strong blur); "Place order" never pressed; the demo product (id 43) was deleted after the take (public page 404). Add-product beat: 125.2–130.4 s (filled "Pricing & inventory" step, Continue, then "Review before saving" = REVIEW BEFORE SAVING); the image link field is never on screen. |
| KH: Checkout · DELIVERY FEE | Recording 86.8–90.9 s (the delivery fee once the province is set). Blurred: email, phone, address. |
| KH: Pay with KHQR · KHQR IN RIEL · STOPPED HERE: NO ORDER PLACED | Recording 92.0–102.8 s (the 93.4–98.0 s wait played 6x). "Place order" is never pressed (the recording script blocks order and payment requests). |
| RielTrack: Add income too · NEW INCOME IN THE LIST | Take `rieltrack-income-190346`, Recent transactions "Freelance +$150.00". |
| idevo: Set up a path with AI · FILLED IN BY AI / AI PLANS THE MODULES; Let AI write the lessons · AI DRAFT · YOU CHECK IT; Study the AI lessons · MARKED AS AN AI DRAFT | Take `idevo-ai-193200` (see above). Sub line "The AI runs on my own server for now." matches the idevo card lead. |
