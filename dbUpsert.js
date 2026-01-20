const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Product model
const Product = require("./src/models/product.model");

// ✅ Helper: always convert companyId to ObjectId
function toObjectId(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id);
  }

  // Deterministic ObjectId for numeric/string companyIds (SAFE for submission)
  return new mongoose.Types.ObjectId(String(id).padStart(24, "0"));
}

async function upsertProducts(companyId) {
  try {
    // 1️⃣ Connect DB
    await mongoose.connect("mongodb://localhost:27017/product_platform");
    console.log("✅ MongoDB connected");

    const companyObjectId = toObjectId(companyId);

    // 2️⃣ Load products.json
    const companyDir = path.join(__dirname, "data", String(companyId));
    const productsPath = path.join(companyDir, "products.json");

    if (!fs.existsSync(productsPath)) {
      console.log("⚠️ No products.json found");
      return;
    }

    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    let success = 0;
    let failed = 0;

    // 3️⃣ Upsert products
    for (const product of products) {
      try {
        await Product.updateOne(
          {
            companyId: companyObjectId,
            sourceUrl: product.sourceUrl
          },
          {
            $set: {
              ...product,
              companyId: companyObjectId,
              lastScrapedAt: new Date()
            }
          },
          { upsert: true }
        );

        success++;
      } catch (err) {
        failed++;
        console.error("❌ Failed upsert:", product.sourceUrl);
      }
    }

    console.log("🎉 DB UPSERT COMPLETED");
    console.log("Success:", success);
    console.log("Failed:", failed);
  } catch (err) {
    console.error("❌ DB UPSERT ERROR:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

module.exports = upsertProducts;
