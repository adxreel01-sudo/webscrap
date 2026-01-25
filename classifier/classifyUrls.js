async function classifyUrls({ companyId, urls }) {
  if (!Array.isArray(urls)) return [];

  const productUrls = urls.filter(url =>
    url.match(/~\d+\.html$/) ||   // Bluestone-style
    url.includes("/products/") || // Shopify
    url.split("/").length > 5     // generic deep product URL
  );

  console.log(`🧠 Classified product URLs: ${productUrls.length}`);

  return productUrls;
}

module.exports = classifyUrls;
