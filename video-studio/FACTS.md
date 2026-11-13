# Where every word in the promo videos comes from

Every caption, callout and outro line in the three promos, with its source.
"Recording" times are seconds in the raw take named in each storyboard file (`<slug>.json`).
Numbers that appear on screen (money, counts, streaks) are never captioned.

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
| See your progress · DAYS STUDIED · LESSONS · QUIZ | Recording 68.2–71.6 s. Study days are sample data from `scripts/seed-idevo.sh`. |
| No account. / Works offline. | `Idevo-Downloads` README: "No account and no analytics", "Works fully offline". |
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
| Guest checkout, no account needed · GUEST CHECKOUT | Recording 38.2–41.0 s ("Guest checkout is available"). |
| Pay with KHQR in riel or dollars · KHQR IN RIEL | Recording 97.9–100.9 s ("KHQR payment", "Pay in USD", "Pay in KHR"). The take stops before "Place order": no order, no payment. Phone and address are blurred. |
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
