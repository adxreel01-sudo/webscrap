console.log("🚀 Scraper pipeline started");

const fs = require("fs");
const path = require("path");

const discoverUrls = require("./discovery/discoverUrls");
const classifyUrls = require("./classifier/classifyUrls"); // pure classifier
const extractProducts = require("./extractor/productExtractor");
const upsertProducts = require("./dbUpsert");

// ===== COMPANY CONTEXT =====
const COMPANY_ID = process.env.COMPANY_ID;
const COMPANY_WEBSITE = process.env.COMPANY_WEBSITE;

if (!COMPANY_ID || !COMPANY_WEBSITE) {
  console.error("❌ Company context missing");
  process.exit(1);
}

const companyDir = path.join(__dirname, "data", COMPANY_ID);

// ===== MAIN PIPELINE =====
async function runPipeline() {
  try {
    console.log(`🏢 Company ID: ${COMPANY_ID}`);
    console.log(`🌐 Website: ${COMPANY_WEBSITE}`);

    // STEP 1 — DISCOVERY (Milestone 2)
    console.log("🔍 Step 1: Discovering product URLs");
    const discoveredUrls = await discoverUrls({
      website: COMPANY_WEBSITE,
      companyId: COMPANY_ID
    });

    fs.writeFileSync(
      path.join(companyDir, "discoveredUrls.json"),
      JSON.stringify(discoveredUrls, null, 2)
    );

    // STEP 2 — CLASSIFICATION
    console.log("🧠 Step 2: Classifying URLs");
    const productUrls = await classifyUrls({
      companyId: COMPANY_ID,
      urls: discoveredUrls
    });

    fs.writeFileSync(
      path.join(companyDir, "classifiedUrls.json"),
      JSON.stringify(productUrls, null, 2)
    );

    // STEP 3 — EXTRACTION (Adapter-aware)
    console.log("📦 Step 3: Extracting products");
    await extractProducts(COMPANY_ID);

    // STEP 4 — DB UPSERT
    console.log("💾 Step 4: Upserting into DB");
    await upsertProducts(COMPANY_ID);

    console.log("🎉 Pipeline completed successfully");
  } catch (err) {
    console.error("❌ Pipeline failed:", err.message);
  }
}

runPipeline();
