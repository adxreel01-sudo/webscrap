async function classifyUrls({ companyId, urls }) {
  if (!Array.isArray(urls)) return [];

  // PRODUCTION RULE:
  // If discovery already found product-like URLs, trust them
  const productUrls = urls.filter(url =>
    url.includes("/products/")
  );

  return productUrls;
}

module.exports = classifyUrls;
