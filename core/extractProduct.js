const detectPlatform = require("../adapters/detectPlatform");
const extractShopifyProduct = require("../adapters/shopify/extract");
const extractGenericProduct = require("./genericExtract");
const extractWithPlaywright = require("../scraper/playwright/extractProductPage");

async function extractProduct({ url, html }) {
  // 🟢 CASE 1: We have HTML (fast path)
  if (html) {
    const platform = detectPlatform(html);

    if (platform === "shopify") {
      const shopify = await extractShopifyProduct({ url, html });
      if (shopify) return shopify;
    }

    const generic = extractGenericProduct({ url, html });
    if (generic) return generic;
  }

  // 🟠 CASE 2: No HTML → Playwright PDP (Bluestone, custom sites)
  console.log("🧠 Playwright PDP extract:", url);
  return await extractWithPlaywright({ url });
}

module.exports = extractProduct;
