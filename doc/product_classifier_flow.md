PRODUCT PAGE CLASSIFICATION” MEANS

For each URL, we answer one question only:

❓ “Is this URL a real product page?”

Answer:

✅ YES → keep it

❌ NO → discard it

That’s it.
Still no price scraping, no DB insert, no AI selling.

🔍 HOW WE CLASSIFY A PRODUCT PAGE (LOGIC)

We use signals — not assumptions.

A page is a PRODUCT PAGE if it has enough of these signals 👇
🔑 PRIMARY SIGNALS (STRONG)

Product title (<h1>)

Price (₹, $, price, money)

“Add to cart” / “Buy now” button

Product images gallery

Shopify product JSON (window.ShopifyAnalytics)

⚠️ SECONDARY SIGNALS (SUPPORTING)

SKU

Variant selectors (size, color)

Availability (“In stock”)

Structured data (schema.org/Product)

🧮 SCORING APPROACH (SIMPLE & SAFE)

Each signal gives points.

Example:

Signal	Score
Product title	+2
Price	+2
Add to cart	+3
Product images	+2
Product schema JSON	+3
Decision rule:
If score ≥ 5 → Product page
Else → Not a product page


This avoids false positives.

🧪 REAL EXAMPLE (CakeToppersIndia)
URL:
https://caketoppersindia.com/products/happy-birthday-cake-topper


Signals:

Title ✅

Price ✅

Add to cart ✅

Images ✅

Score = 9 → ✅ PRODUCT PAGE

URL:
https://caketoppersindia.com/pages/privacy-policy


Signals:

Title ❌

Price ❌

Cart ❌

Images ❌

Score = 0 → ❌ NOT PRODUCT PAGE

🧱 INPUT & OUTPUT OF MILESTONE 3
📥 INPUT
productUrls.json   (from Milestone 2)

📤 OUTPUT

Two files:

validProductUrls.json
invalidProductUrls.json


This is clean separation.