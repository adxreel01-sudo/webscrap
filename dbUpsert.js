const mongoose = require("mongoose");
const fs = require("fs");

// 1️⃣ MongoDB connection
mongoose.connect("mongodb://localhost:27017/product_platform");

// 2️⃣ Product schema (reuse backend logic)
const Product = require("./src/models/product.model");

// 3️⃣ Load extracted products
const productsRaw = JSON.parse(
  fs.readFileSync("./output/productsRaw.json", "utf-8")
);

// 4️⃣ Company ID (temporary hardcode)
const COMPANY_ID = new mongoose.Types.ObjectId(
  "64f000000000000000000001"
);

async function upsertProducts() {
  let success = 0;
  let failed = 0;

  for (const raw of productsRaw) {
    try {
      const productDoc = {
        companyId: COMPANY_ID,
        sourceUrl: raw.sourceUrl,

        name: raw.name,
        description: raw.description || "",

        category: null,
        productType: null,

        images: raw.images || [],

        pricing: {
          salePrice: raw.pricing.salePrice,
          mrp: raw.pricing.mrp || null,
          currency: raw.pricing.currency || "INR"
        },

        language: "en",
        isActive: true,

        lastScrapedAt: new Date(),
        scrapeStatus: "success"
      };

      await Product.updateOne(
        {
          companyId: COMPANY_ID,
          sourceUrl: raw.sourceUrl
        },
        { $set: productDoc },
        { upsert: true }
      );

      console.log("✅ Upserted:", raw.name);
      success++;
    } catch (err) {
      console.error("❌ Failed:", raw.sourceUrl);
      failed++;
    }
  }

  console.log("🎉 DB UPSERT COMPLETED");
  console.log("Success:", success);
  console.log("Failed:", failed);

  mongoose.disconnect();
}

upsertProducts();
