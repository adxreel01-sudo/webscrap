const fs = require("fs");
const path = require("path");
const extractShopifyProduct = require("../adapters/shopify.extractor");

module.exports = async function extractProducts(companyId) {
  const companyDir = path.join(__dirname, "..", "data", String(companyId));

  const urls = JSON.parse(
    fs.readFileSync(path.join(companyDir, "classifiedUrls.json"), "utf-8")
  );

  const products = [];

  for (const url of urls) {
    const product = await extractShopifyProduct(url);
    if (!product) continue;

    products.push({
      companyId,
      sourceUrl: url,

      name: product.name,
      description: product.description,

      images: product.images,
      pricing: product.pricing,
      variants: product.variants,

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
