 Goal

0
Lock scope to avoid rework.

Deliverables

Target websites: e-commerce only

Multi-company support

Node.js + Python allowed

MongoDB target (MySQL temporary)

Product fields finalized

✅ Output: Approved scope & data contract

🟢 MILESTONE 1 — DATA MODEL & API FOUNDATION (Day 1–2)
Goal

Create a stable base before scraping.

Tasks

Finalize Product schema

Finalize Company schema

Add scrape metadata (lastScraped, sourceUrl)

Create Product APIs:

GET /products

GET /products/company/:id

API pagination & filters

MongoDB schema (parallel MySQL write if needed)

Deliverables

Stable Product API (like the one you already have)

DB ready for scraped data

✅ Exit Criteria:
Frontend can render products without scraping

🟢 MILESTONE 2 — GENERIC CRAWLER (Day 3–4)
Goal

Discover all possible product URLs automatically.

Tasks

Sitemap detection (/sitemap.xml, /sitemap_products.xml)

Category page crawler

URL pattern detector (/product/, /products/)

Pagination handling

Robots.txt + rate limit

Deliverables

URL list of all product pages

Crawl logs per company

✅ Exit Criteria:
For a given site → we can list all product URLs

🟢 MILESTONE 3 — PRODUCT PAGE CLASSIFICATION (Day 5)
Goal

Identify which URLs are product pages.

Tasks

Heuristic rules:

Price detection

Add-to-cart button

Image gallery

Scoring system

Optional AI classifier (fallback)

Deliverables

isProductPage = true/false

False positives < 10%

✅ Exit Criteria:
Non-product pages filtered out reliably

🟢 MILESTONE 4 — PRODUCT FIELD EXTRACTION (Day 6–7)
Goal

Extract structured product data.

Tasks

Extract:

Name

Price / currency

Images

Description

Variants (if available)

Handle:

HTML sites

JSON feeds (Shopify)

JS-rendered pages (Puppeteer)

Deliverables

Raw product objects

Extraction success > 90%

✅ Exit Criteria:
Each product page → clean raw data object

🟢 MILESTONE 5 — DATA CLEANING & NORMALIZATION (Day 8)
Goal

Make data production-safe.

Tasks

Price normalization

Currency detection

Image URL fixing

HTML sanitization

Language detection

Variant normalization

Deliverables

Clean product objects

✅ Exit Criteria:
No broken prices, URLs, or empty names

🟢 MILESTONE 6 — DEDUPLICATION & UPSERT LOGIC (Day 9)
Goal

Prevent duplicates & enable updates.

Tasks

Product identity rules:

URL

SKU (if present)

UPSERT logic

Mark removed products as inactive

Deliverables

Clean DB with no duplicates

isActive correctly set

✅ Exit Criteria:
Re-scrape does not create duplicates

🟢 MILESTONE 7 — SCHEDULING & SYNC (Day 10)
Goal

Keep data fresh automatically.

Tasks

Initial full scrape

Incremental scrape

Cron / queue setup

Failure retry logic

Deliverables

Daily auto sync

Weekly full sync

✅ Exit Criteria:
Products update without manual trigger

🟢 MILESTONE 8 — AI ENRICHMENT (OPTIONAL BUT POWERFUL) (Day 11–12)
Goal

Make data AI-ready.

Tasks

Product type classification

Auto category tagging

Embedding generation (RAG)

Multilingual support

Deliverables

AI-enhanced product records

✅ Exit Criteria:
AI can answer product questions correctly

🟢 MILESTONE 9 — ADMIN & MONITORING (Day 13)
Goal

Production control & visibility.

Tasks

Admin scrape trigger

Scrape logs

Error dashboard

Alerting (email / Slack)

Deliverables

Admin panel

Monitoring dashboard

✅ Exit Criteria:
Failures visible & controllable

🟢 MILESTONE 10 — PRODUCTION HARDENING (Day 14)
Goal

Go live safely.

Tasks

Rate limit tuning

Proxy rotation

API caching

Load testing

Security checks

Deliverables

Production deployment

Backup & rollback plan

✅ Exit Criteria:
System stable under load