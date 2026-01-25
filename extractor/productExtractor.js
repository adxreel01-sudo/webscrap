const extractShopifyProduct = require("../adapters/shopify.extractor");
const extractProductPage =
  require("../scraper/playwright/extractProductPage");

module.exports = async function extractProducts(companyId) {
  const fs = require("fs");
  const path = require("path");

  const companyDir = path.join(__dirname, "..", "data", String(companyId));

  const urls = JSON.parse(
    fs.readFileSync(
      path.join(companyDir, "classifiedUrls.json"),
      "utf-8"
    )
  );

  const products = [];

  for (const url of urls.slice(0, 20)) {
    let product = null;

    // 1️⃣ Shopify fast path
    product = await extractShopifyProduct(url);

    // 2️⃣ Playwright fallback
    if (!product) {
      product = await extractProductPage({ url, companyId });
    }

    if (!product) continue;

    products.push({
      companyId,
      sourceUrl: url,

      name: product.name,
      description: product.description,

      images: product.images,
      pricing: product.pricing,
      variants: product.variants || [],

      category: null,
      productType: null,

      language: "en",
      isActive: true,

      lastScrapedAt: new Date(),
      scrapeStatus: "success"
    });
  }

  fs.writeFileSync(
    path.join(companyDir, "products.json"),
    JSON.stringify(products, null, 2)
  );

  console.log(`📦 Extracted ${products.length} products for ${companyId}`);
};
