const detectPlatform = require("../adapters/detectPlatform");
const extractShopifyProduct = require("../adapters/shopify/extract");
const extractGenericProduct = require("./genericExtract"); // your old logic

function extractProduct({ url, html }) {
  const platform = detectPlatform(html);

  if (platform === "shopify") {
    return extractShopifyProduct({ url, html });
  }

  return extractGenericProduct({ url, html });
}

module.exports = extractProduct;
