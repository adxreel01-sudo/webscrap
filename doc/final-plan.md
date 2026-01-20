🎯 GOAL FOR SUBMISSION (VERY CLEAR)

By the end of 5–6 hours, you should be able to confidently demo:

User enters a company website → auto-filled company info

User clicks “Scrape Products” → products are scraped & stored

Weekly auto-update → cron exists and works

Code looks structured, scalable, and production-minded

Not “perfect scraping”, but excellent engineering thinking.

🧱 MILESTONE PLAN (5–6 HOURS TOTAL)
🕐 MILESTONE 0 — FREEZE SCOPE (15 min)

Do NOT add new features beyond this list.

✅ Shopify + generic sites only
✅ Axios first, Playwright fallback (basic)
❌ No proxy rotation
❌ No ML classifiers
❌ No UI polish

This is a backend engineering submission, not a scraping olympiad.

🕐 MILESTONE 1 — COMPANY AUTO-FILL (1.5 hours)
Objective

When user submits a website:

Company name

About

Email

Phones

Social links

Platform

What to implement (minimum but impressive)
1️⃣ Keep your existing company.controller.js

BUT add:

/about, /contact deep page fetch

Data quality check

Playwright fallback only if needed

2️⃣ Define “quality” clearly
name exists
AND about.length >= 50


If not → fallback.

3️⃣ Demo scenario

CakeToppers → Axios works

Titan → Axios fails → Playwright works

This alone makes your project stand out.

🕐 MILESTONE 2 — PRODUCT SCRAPE BUTTON (1.5 hours)
Objective

User clicks button → backend scrapes products.

What to do

Create ONE new API:

POST /api/company/:companyId/scrape-products


Controller steps:

Fetch company from DB

Run discoverUrls

Run classifyUrls

Run extractProducts

Run dbUpsert

Return count

⚠️ IMPORTANT
Reuse your existing pipeline code.
Do NOT rewrite discovery/extraction.

Demo

Trigger API

Products appear in MongoDB

products.json updated

🕐 MILESTONE 3 — WEEKLY AUTO UPDATE (1 hour)
Objective

Show engineering maturity, not complexity.

What to do

You already have:

cron.js

runPipeline

Just add:

comment: “Weekly schedule in production”

set cron to weekly (for submission)

cron.schedule("0 2 * * 0", runPipeline);


Explain:

“Runs every Sunday at 2 AM to refresh products”

No need to over-engineer diffing right now.

🕐 MILESTONE 4 — DATA SAFETY & FAIL-SAFE (45 min)
Add these QUICK wins
1️⃣ Never crash

Wrap Axios

Wrap Playwright

Return null, not throw

2️⃣ Scrape status

You already have:

scrapeStatus: "success" | "failed" | "partial"


Use it properly.

3️⃣ Logs

Add:

console.log("[DISCOVERY]", ...)
console.log("[EXTRACT]", ...)
console.log("[UPSERT]", ...)


This matters a LOT in reviews.

🕐 MILESTONE 5 — README + STORY (45 min)

This is CRITICAL for submission.

README must include:
1️⃣ Architecture diagram (ASCII is fine)
User → API → Scraper → DB
             ↓
         Cron Scheduler

2️⃣ Explain WHY

Axios first (fast)

Playwright fallback (JS-heavy sites)

Page caching (avoid refetch)

Shopify JSON (accuracy)

3️⃣ Known limitations (IMPORTANT)

CAPTCHA sites

Aggressive bot protection

No proxy yet

Reviewers LOVE honesty.

🧠 WHAT MAKES YOUR PRODUCT “BEST” (EVEN IN 6 HOURS)

Not number of features.

But:

Clean architecture

Thoughtful fallbacks

Real-world constraints acknowledged

Working demo with real brands

You already have Titan + Bewakoof, which is impressive.

📦 FINAL SUBMISSION CHECKLIST

Before you submit, verify:

✅ Company auto-fill works
✅ Product scrape works via API
✅ Cron exists and runs
✅ MongoDB shows data
✅ README explains decisions
✅ Code is readable, not hacked

🚀 IF YOU WANT, I CAN NEXT

Break each milestone into exact file edits

Help write submission explanation

Review your README

Simulate interviewer questions & answers

Just tell me what you want next.