FINAL TARGET ARCHITECTURE (WHAT YOU SHOULD RUN)
USER
 ├─ enters website
 │   └─ POST /api/company/scrape
 │        ├─ Axios scrape
 │        ├─ Deep pages (/about, /contact)
 │        ├─ Playwright fallback (if needed)
 │        └─ Save Company (auto-fill)
 │
 └─ clicks "Scrape Products"
      └─ POST /api/company/:id/scrape-products
           ├─ Discovery pipeline
           ├─ Classification
           ├─ Platform-aware extraction
           ├─ Diff detection
           └─ DB upsert
           
CRON (weekly)
 └─ Re-run product scrape ONLY for active companies
     └─ Update changed products only

REQUIREMENT 1: AUTO-FILL COMPANY INFO (FIX)
Current problem

scr/controllers/company.controller.js:

Axios only

Homepage only

Fails on Titan, Bewakoof, JS-heavy sites

What to do (NO REWRITE, JUST EXTEND)
Add 2-layer fallback

Axios + Cheerio (fast)

Playwright (only if data quality is bad)

Data quality rule (STRICT)
name exists
AND about.length >= 50


If not → fallback.

Result

CakeToppers → Axios works

Titan → Playwright required

Bewakoof → Playwright required

👉 This matches your mock companies perfectly.

REQUIREMENT 2: PRODUCT SCRAPE ON BUTTON CLICK
Current situation

Product scraping exists

BUT it runs via index.js + env vars

Not API-driven

What to add (MINIMAL CHANGE)
New API
POST /api/company/:companyId/scrape-products


Controller logic:

1. Load company from DB
2. Run discovery pipeline
3. Extract products
4. Upsert products
5. Return count


You already have all underlying code.
This is just orchestration.

REQUIREMENT 3: WEEKLY AUTO UPDATE (EFFICIENT)
You already have

Cron scheduler ✔️

Active company filter ✔️

Upsert logic ✔️

What’s missing: CHANGE DETECTION

Right now:

Every scrape overwrites blindly

What you SHOULD do
Add product fingerprint

Before upsert, compute:

hash = sha1(
  name +
  price +
  images.join() +
  variants.join()
)


Store:

contentHash


During weekly scrape:

If hash unchanged → skip DB write

If changed → update + lastScrapedAt

This gives you:

Faster cron

Less DB load

Accurate “updated products”

HOW YOUR MOCK COMPANIES FIT PERFECTLY
Company	Platform	Expected behavior
CakeToppers	Shopify	Sitemap + Shopify JSON (easy)
Titan	Custom JS	Playwright fallback needed
Bewakoof	Shopify + JS	Shopify JSON + pagination

Your system is correctly designed for this — it just needs:

fallback logic

unification

quality guards

WHAT I WOULD DO NEXT (ORDER MATTERS)

1️⃣ Refactor company scraper into layered strategy
2️⃣ Add API trigger for product pipeline
3️⃣ Add contentHash-based updates
4️⃣ Merge cron + API pipeline logic (single source)
5️⃣ Optional: proxy + stealth later (only if scale grows)

IMPORTANT TRUTH (NO SUGAR)

You CANNOT get perfect data for every site

Titan/Bewakoof WILL block Axios sometimes

Playwright is non-negotiable for real brands

Your architecture is already better than 90% scrapers online

If you want, next I can:

🔧 Modify your exact company.controller.js (line-by-line)

🧠 Design product diff logic

🚀 Turn this into production SaaS-ready flow

📊 Define scrape status + monitoring