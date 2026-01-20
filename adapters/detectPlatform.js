function detectPlatform(html) {
  if (!html) return "generic";

  const lower = html.toLowerCase();

  if (
    lower.includes("cdn.shopify.com") ||
    lower.includes("shopify-section") ||
    lower.includes("shopify-payment-button")
  ) {
    return "shopify";
  }

  if (
    lower.includes("woocommerce") ||
    lower.includes("wp-content")
  ) {
    return "woocommerce";
  }

  return "generic";
}

module.exports = detectPlatform;
