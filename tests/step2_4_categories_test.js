const discoverFromCategories = require("../discovery/tiers/categories");

(async () => {
  console.log("🧪 Category Crawl Test Started");

  const urls = await discoverFromCategories({
    website: "https://caketoppersindia.com",
    companyId: "4001"
  });

  console.log("Discovered URLs:", urls.length);
  console.log(urls.slice(0, 5));
})();
