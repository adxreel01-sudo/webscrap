const fs = require("fs");
const path = require("path");
const getPageHtml = require("../core/getPageHtml");
const extractProduct = require("../core/extractProduct");

async function extractProducts(companyId, productUrls) {
  const products = [];

  for (const url of productUrls) {
    const html = getPageHtml({ url, companyId });
    if (!html) continue;

    const product = extractProduct({ url, html });
    if (!product) continue;

    products.push(product);
  }

  const outputDir = path.join(__dirname, "..", "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  fs.writeFileSync(
    path.join(outputDir, "productsRaw.json"),
    JSON.stringify(products, null, 2)
  );

  console.log(`📦 Extracted ${products.length} products`);
}

module.exports = extractProducts;
