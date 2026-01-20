const discoverFromSitemap = require("../discovery/tiers/sitemap");

(async () => {
  console.log("🧪 Sitemap Discovery Test Started");

  const urls = await discoverFromSitemap({
    website: "https://caketoppersindia.com",
    companyId: "4001"
  });

  console.log("Discovered URLs:", urls.length);
  console.log(urls.slice(0, 5));
})();
