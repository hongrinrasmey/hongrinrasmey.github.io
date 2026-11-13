# Where every word in the promo videos comes from

Every caption, callout and outro line in the three promos, with its source.
"Recording" times are seconds in the raw take named in each storyboard file (`<slug>.json`).
Numbers that appear on screen (money, counts, streaks) are never captioned.

**Owner rules (2026-11-13):** every video shows the KH Halal checkout + KHQR payment page (stopped before "Place order", personal details blurred), idevo making a path and its lessons with its built-in AI (owner, later the same day), and RielTrack adding an income.

## RielTrack (`rieltrack.json`, take `rieltrack-104550`)

| Text in the video | Source |
|---|---|
| Spend in dollars. / Pay in riel. / Track both. | Headline approved by the owner (2026-11-13). Fact: `RielTrack-Downloads` README, "A private, offline money tracker for US dollars and Cambodian riel" and "Record every amount in USD or riel". |
| Your month at a glance · DOLLARS AND RIEL | README "Home dashboard: this month's income, spending, and net cash flow". Recording 1.0–4.1 s (net cash flow in $ with the ≈ riel amount under it). |
| Add an expense in riel · EACH AMOUNT IN ITS OWN CURRENCY | README "Record every amount in USD or riel". Recording 7.3–25.3 s (KHR chosen, 12000 typed, saved). |
| Every transaction in one list · RIEL AND DOLLARS SIDE BY SIDE | README "Transactions". Recording 37.9–40.9 s (History with ៛ and $ rows). |
| Compare with last month · THIS MONTH VS LAST MONTH | README "Reports: ... month-to-month category comparisons". Recording 47.8–51.0 s. |
| Stay inside your budget · MONTHLY LIMIT · ON TRACK | README "Budgets". Recording 60.7–63.8 s ("Overall monthly limit", "On track"). |
| No account. / No cloud. / No ads. | README "No account, no cloud, no analytics, no ads." |
| Use it in Khmer · ENGLISH AND ខ្មែរ | README "English and ភាសាខ្មែរ". Recording 76.4–82.4 s (Settings → ខ្មែរ → Home in Khmer). |
| Add income too · MONTHLY INCOME | Take `rieltrack-income-190346` (`scripts/record-rieltrack-income.sh`): Add income, $150, Freelance, saved; Home income goes from $850.00 to $1,000.00. Sample entry, deleted again after the take. Categories on screen: Salary, Freelance, Allowance, Gifts, Other income. |
| v1.6 · Android 8.0+ · Download APK | Latest release `v1.6` on `RielTrack-Downloads`; README "Requires Android 8.0 (API 26) or newer". |
| github.com/hongrinrasmey/RielTrack-Downloads | Checked: `releases/latest` returns 200 (2026-11-13). |

On-screen amounts are sample data typed in by `scripts/seed-rieltrack.sh`.

## idevo (`idevo.json`, take `idevo-153647`)

| Text in the video | Source |
|---|---|
| Learn it once. / Remember it longer. | Headline approved by the owner (2026-11-13). Fact: spaced-repetition flashcards (`index.html` idevo card). |
| Pick up where you left off · NEXT LESSON + TODAY'S REVIEWS | Recording 1.2–4.6 s ("Continue learning · Space it out", "3 flashcards ready to review"). |
| Short lessons with a check · INSTANT ANSWER, WITH THE REASON | Recording 15.9–20.7 s ("Check yourself" question, answer and reason). |
| Flashcards that come back · SPACED REPETITION | `index.html`: "Spaced-repetition flashcards". Recording 46.2–54.2 s. |
| Again 10 min · Hard 1 day · Good 3 days · Easy 4 days | Read from the rating buttons on screen at 47.6–53.9 s (first review of this card; the app changes them per card). |
| Let AI write the lessons · FILLED IN BY AI / AI DRAFT · YOU CHECK IT | Take `idevo-ai-193200` (`scripts/record-idevo-ai.sh`), the app's built-in AI on the owner's own server (gpt-oss-120b on Cloudflare Workers AI; not open to everyone yet, as the card says). Typed: "I want to learn Flutter to build a simple app screen". Everything else on screen is the AI's real answer: path "Flutter Simple App Screen", 4 modules, 3 lessons. App text: "Check what AI filled in, then tap Create.", "AI draft. It can be wrong: read it, and edit or untick anything before saving.", lesson note "AI draft (gpt-oss-120b). Check facts before relying on them." Server address and token typed off camera from env vars; `pm clear` after. |
| See your progress · DAYS STUDIED · LESSONS · QUIZ | Recording 68.2–71.6 s. Study days are sample data from `scripts/seed-idevo.sh`. |
| No account. / Study offline, AI online. | `Idevo-Downloads` README: "No account and no analytics", "Works fully offline" (lessons, flashcards, reviews). The built-in AI needs the internet: the app sends the request over HTTPS to the owner's Cloudflare Worker (`ai_client.dart`), which runs Workers AI (owner, 2026-11-13: "it not offline anymore" once AI is shown). |
| Use it in Khmer · ENGLISH AND ខ្មែរ | README "English and ខ្មែរ". Recording 86.4–92.8 s. |
| Lessons, flashcards and spaced repetition. | `index.html` idevo card + README ("learning paths, flashcards and quizzes"). |
| Early build · v0.6.4 · Download APK | README "Version 0.6.4 is an early build"; release `v0.6.4`. No Android version is shown: none is confirmed. |

AI is not mentioned: it only runs for the owner for now (`index.html`).

## KH Halal Marketplace (`kh-halal-marketplace.json`, take `kh-165516`)

| Text in the video | Source |
|---|---|
| One marketplace. / Two sides. / Built on trust. · SHOPPER · SELLER | Headline approved by the owner (2026-11-13). |
| Halal clothing and dry food | Live site hero "Halal Clothing & Dry Food". Recording 0.6–3.2 s. |
| Filter by halal claim · HALAL CLAIM · VERIFIED SELLERS ONLY | Recording 16.6–19.8 s (filter panel: "Halal claim", "Verified sellers only"). The site says some claims are seller-declared, so the video says "halal claim", never "certified". |
| Every seller is identity-verified · RIEL AND DOLLARS · IDENTITY VERIFIED | Recording 25.7–30.5 s ("KHR 20,500 USD 5.00", "Identity verified by marketplace"). |
| Check out, pay with KHQR · KHQR IN RIEL | Recording 77.85–80.4 s (Checkout: delivery details filled from the account) and 97.9–100.9 s ("KHQR payment", "Pay in KHR"). The take stops before "Place order": no order, no payment. Email, phone and address are blurred. |
| Add to cart, no account needed · IN THE CART AS A GUEST | Recording 31.3–33.0 s (Add to Cart pressed while signed out: "Login" / "Sign Up" in the header) and 38.0–40.8 s (Shopping cart). |
| Price-drop alerts on your wishlist · PRICE DROPS · BACK IN STOCK | Recording 66.3–69.3 s ("We'll notify you when a saved item drops in price or comes back in stock"). |
| Full Khmer version | Recording 47.0–49.8 s (site switches to Khmer). |
| A dashboard for every seller · SALES · ORDERS · REFUNDS | Recording 108.9–111.9 s. The figures belong to the live seller account and are not captioned. |
| Every product at a glance · LISTING QUALITY + STATUS | Recording 117.2–120.2 s (product table columns). |
| Add a product in three steps · PRODUCT · PRICE & STOCK · REVIEW | Recording 123.6–126.4 s (step labels). |
| Reviewed before it goes live · PENDING ADMIN REVIEW | Recording 169.4–172.2 s; add-product page says "Submit for admin review before it appears in the catalog". The demo product was deleted after the take (checked read-only on 2026-11-13). |
| Halal products from verified sellers in Cambodia. · WEB · Khmer + English · Try it live | Approved tagline; `index.html` card tags. |
| kh-halal-marketplace.onrender.com | Checked: returns 200 (2026-11-13). |

No admin screens are shown. The signed-in name chip is blurred in every signed-in shot.

## Every video

"Hong Rinrasmey · hongrinrasmey.github.io/portfolio": the owner's name and the live portfolio (returns 200, no custom domain on 2026-11-13).

## Full demos (`<slug>-full.json` -> `assets/videos/<slug>.mp4`, the "Full demo" button)

Same takes and the same facts as above, plus these lines. Explanation lines (`sub`) come from the earlier walkthrough
captions (`scripts/motion/<slug>.json`), which were checked against the READMEs and the screens.

| Text in the video | Source |
|---|---|
| RielTrack: Shown in dollars too · DOLLAR VALUE UNDER RIEL | Recording 29.4–34.0 s (Home: "−12,000 ៛" with "≈ $2.93" under it). |
| RielTrack: SEARCH AND FILTERS · BIGGEST CHANGES BY CATEGORY · EACH CATEGORY'S SHARE · SPENT · LIMIT · LEFT | Read off the screens: History search + Type/Date/Currency/Category filters; Reports "Biggest changes", "Spending by category" with percentages; Budgets "Spent", "Limit", "Left". |
| idevo: Keep a study streak · STUDY STREAK | Recording 29.9–35.2 s ("2-day streak", "You studied on 5 of the last 7 days": sample days). |
| idevo: Flashcards on a schedule · CARDS DUE PER DAY | Recording 36.95–42.2 s (Review: "Coming up", "Flashcards due per day"). |
| idevo: Rate how well you remembered | Screen text "How well did you remember it?" (46.4–54.6 s). |
| idevo: Follow a learning path · PATH PROGRESS | Recording 62.45–66.6 s (Learn: "A sample path: three short lessons", "3 of 3 lessons completed"); README "build your own learning paths". The "New path" button is never pressed. |
| KH: Prices in riel and dollars · KHR AND USD | Recording 6.0–13.0 s (Featured Products with KHR and USD prices). |
| KH: Add to cart as a guest · IN THE CART | Recording 31.2–33.2 s and 38.0–41.4 s, signed out. "Proceed to checkout" is never pressed. |
| KH: Save favourites | Recording 64.6–70.4 s (heart in the header, then "My wishlist"). |
| KH: Add a product: photo and details · Price and stock · PRICE · STOCK · WEIGHT · Review, then submit | Recording 122.0–167.9 s (steps "Product", "Price & stock", "Review"; fields "Selling Price (KHR)", "Stock quantity", "Weight (kg)"; button "Submit for review"). |
| KH: Waiting for admin review | Recording 169.2–173.6 s ("Pending review"). |
| KH: Cart and checkout · DELIVERY FEE | Recording 72.75–91.2 s (cart, checkout, district + province, delivery fee for Phnom Penh). Blurred: email, phone, address. |
| KH: Pay with KHQR · KHQR IN RIEL · STOPPED HERE: NO ORDER PLACED | Recording 91.95–103.5 s. "Place order" is never pressed (the recording script blocks order and payment requests). |
| RielTrack: Add income too · NEW INCOME IN THE LIST | Take `rieltrack-income-190346`, Recent transactions "Freelance +$150.00". |
| idevo: Set up a path with AI · FILLED IN BY AI / AI PLANS THE MODULES; Let AI write the lessons · AI DRAFT · YOU CHECK IT; Study the AI lessons · MARKED AS AN AI DRAFT | Take `idevo-ai-193200` (see above). Sub line "The AI runs on my own server for now." matches the idevo card lead. |
