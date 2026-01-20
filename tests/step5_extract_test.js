const getPageHtml = require("../core/getPageHtml");
const extractProduct = require("../core/extractProduct");

const COMPANY_ID = "4001";
const PRODUCT_URL =
  "https://caketoppersindia.com/products/personalized-luxurious-ring-platter-with-ring-box-floral-ring-platter";

console.log("🧪 Extractor Test Started");

// 1️⃣ Read HTML from Page Store (NO NETWORK)
const html = getPageHtml({
  url: PRODUCT_URL,
  companyId: COMPANY_ID
});

if (!html) {
  console.error("❌ HTML not found in Page Store");
  console.error("➡️ Run fetchPage for this URL first");
  process.exit(1);
}

// 2️⃣ Extract product
const product = extractProduct({
  url: PRODUCT_URL,
  html
});

if (!product) {
  console.error("❌ Extraction failed (returned null)");
  process.exit(1);
}

// 3️⃣ Validate output
console.log("\n✅ Extracted Product Object:");
console.log(product);

// 4️⃣ Minimal assertions (manual)
console.log("\n🔎 Validation checks:");
console.log("Name:", product.name ? "✅" : "❌");
console.log("Images:", product.images.length > 0 ? "✅" : "❌");
console.log(
  "Sale Price:",
  product.pricing.salePrice === null || typeof product.pricing.salePrice === "number"
    ? "✅"
    : "❌"
);
console.log(
  "Description:",
  product.description === null || product.description.length > 0 ? "✅" : "❌"
);

console.log("\n🎉 Extractor test completed successfully");
