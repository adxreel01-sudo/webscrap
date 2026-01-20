const cheerio = require("cheerio");

async function isProductPage({ url, html }) {
  if (!html) return false;

  const $ = cheerio.load(html);

  // 1️⃣ Canonical product URL (very strong)
  const canonical = $('link[rel="canonical"]').attr("href");
  if (canonical && canonical.includes("/products/")) {
    return true;
  }

  // 2️⃣ OpenGraph product type
  const ogType = $('meta[property="og:type"]').attr("content");
  if (ogType === "product") {
    return true;
  }

  // 3️⃣ Shopify product JSON
  if (
    html.includes("application/json") &&
    html.includes('"product"')
  ) {
    return true;
  }

  // 4️⃣ Fallback: URL pattern
  if (url.includes("/products/")) {
    return true;
  }

  return false;
}

module.exports = isProductPage;
