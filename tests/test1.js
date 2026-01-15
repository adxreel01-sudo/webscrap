const fs = require("fs");
const fetchSitemap = require("./crawler/sitemap");
const crawlCategories = require("./crawler/categoryCrawler");
const isProductPage = require("./classifier/productPageClassifier");
const productUrls = require("./output/productUrls.json");


(async () => {
  const baseUrl = "https://caketoppersindia.com/"; // change this
  let productUrls = [];

  // 1) Try sitemap
  const sitemapUrls = await fetchSitemap(baseUrl);
  productUrls = sitemapUrls.filter(u => u.includes("/product"));

  // 2) Fallback to crawling
  if (!productUrls.length) {
    productUrls = await crawlCategories(baseUrl);
  }

  fs.writeFileSync(
    "./output/productUrls.json",
    JSON.stringify(productUrls, null, 2)
  );

  console.log(`✅ Discovered ${productUrls.length} product URLs`);
  const valid = [];
  const invalid = [];

  for (const url of productUrls) {
    const result = await isProductPage(url);
    if (result) {
      valid.push(url);
      console.log("✅ PRODUCT:", url);
    } else {
      invalid.push(url);
      console.log("❌ NOT PRODUCT:", url);
    }
  }

  fs.writeFileSync(
    "./output/validProductUrls.json",
    JSON.stringify(valid, null, 2)
  );

  fs.writeFileSync(
    "./output/invalidProductUrls.json",
    JSON.stringify(invalid, null, 2)
  );

  console.log("🎉 Classification completed");
  console.log("Valid products:", valid.length);
  console.log("Invalid pages:", invalid.length);




})();
