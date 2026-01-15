console.log("🚀 Scraper pipeline started");

// ===== DIRECTLY REQUIRE ACTUAL FILES =====
// ⚠️ Adjust filenames ONLY if yours are different

const discoverUrls = require("./crawler/categoryCrawler");
const classifyUrls = require("./classifier/productPageClassifier");
const extractProducts = require("./extractor/productExtractor");
const upsertProducts = require("./dbUpsert");

// ===== COMPANY CONTEXT (FROM CRON / runPipeline.js) =====
const COMPANY_ID = process.env.COMPANY_ID;
const COMPANY_WEBSITE = process.env.COMPANY_WEBSITE;

if (!COMPANY_ID || !COMPANY_WEBSITE) {
  console.error("❌ Company context missing");
  console.error("COMPANY_ID or COMPANY_WEBSITE not provided");
  process.exit(1);
}

// ===== MAIN PIPELINE =====
async function runPipeline() {
  try {
    console.log(`🏢 Company ID: ${COMPANY_ID}`);
    console.log(`🌐 Website: ${COMPANY_WEBSITE}`);

    // STEP 1 — URL DISCOVERY
    console.log("🔍 Step 1: Discovering product URLs");
    await discoverUrls(COMPANY_WEBSITE, COMPANY_ID);

    // STEP 2 — CLASSIFICATION
    console.log("🧠 Step 2: Classifying URLs");
    await classifyUrls(COMPANY_ID);

    // STEP 3 — EXTRACTION
    console.log("📦 Step 3: Extracting product data");
    await extractProducts(COMPANY_ID);

    // STEP 4 — DB UPSERT
    console.log("💾 Step 4: Upserting products to DB");
    await upsertProducts(COMPANY_ID);

    console.log("🎉 Scraper pipeline completed successfully");
  } catch (error) {
    console.error("❌ Scraper pipeline failed:", error.message);
  }
}

// ===== RUN =====
runPipeline();
