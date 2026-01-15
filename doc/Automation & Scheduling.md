AUTOMATION DESIGN (BEFORE CODING)
🎯 What automation really means here

Automation means:

“From company website → scrape → update DB
runs automatically, without a developer typing commands.”

Right now your system is:

✅ Correct

❌ Manual

Milestone 6 fixes that.

🔁 WHAT EXACTLY WILL BE AUTOMATED?

Your existing pipeline already works:

URL Discovery
→ Page Classification
→ Product Extraction
→ DB Upsert


Automation means:

Run this pipeline on a schedule

For each company

Log success / failure

🧱 AUTOMATION ARCHITECTURE (SIMPLE & SAFE)

We will NOT rebuild anything.
We will only wrap what already works.

New concept: Pipeline Runner
runPipeline(company)
  ├── discover URLs
  ├── classify URLs
  ├── extract products
  ├── upsert to DB
  └── log result

⏰ HOW WILL IT RUN AUTOMATICALLY?

We’ll use:

✅ node-cron

Stable

Simple

Production-friendly

Works on Windows / Linux

Example:

Run every day at 2 AM

Or every 6 hours

📂 NEW FILES WE WILL ADD
scraper/
 ├── pipeline/
 │   └── runPipeline.js   👈 single entry
 ├── scheduler/
 │   └── cron.js          👈 automation


Your existing files stay untouched ✅

📊 WHAT WE WILL LOG (IMPORTANT)

For each run:

companyId

startTime

endTime

successCount

failureCount

error (if any)

This is basic production hygiene.

================================

CRON
  ↓
runPipeline()
  ↓
Fetch companies (Company API)
  ↓
For each company
  ↓
Scrape → Extract → Upsert
