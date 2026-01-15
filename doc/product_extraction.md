PRODUCT FIELD EXTRACTION

(with explanation + implementation)

🎯 Goal (lock this)

From validated product URLs only, extract clean, structured product data
ready to match Schema v1.0.

You already did the hard parts (URL discovery + classification).
Now we extract data carefully.

🧠 HOW WE WILL EXTRACT (IMPORTANT STRATEGY)

Because your site is Shopify, we use this order:

🥇 Method 1 — Shopify Product JSON (BEST & STABLE)

For any product URL:

https://site.com/products/slug


We fetch:

https://site.com/products/slug.js


Why this is best:

No HTML parsing issues

Gives name, price, images, variants

Less likely to break on UI changes

🥈 Method 2 — HTML fallback

Used only if .js fails.

📥 INPUT & 📤 OUTPUT
Input
scraper/output/validProductUrls.json

Output (this milestone)
scraper/output/productsRaw.json


-------------------------------------

— NORMALIZE + UPSERT INTO MONGODB
🎯 Goal (very clear)

Take productsRaw.json → normalize it → upsert into MongoDB
So:

No duplicates

Existing products update

New products insert

After this:

Your API will return scraped products

This is the point where CEO can see live data

🧠 WHAT “UPSERT” MEANS (IMPORTANT)

Upsert = Update OR Insert

Logic:

If (companyId + sourceUrl) exists → UPDATE

If not → INSERT

This matches the unique index you already created.