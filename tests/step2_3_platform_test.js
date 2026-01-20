const discoverFromPlatform = require("../discovery/tiers/platform");

(async () => {
  console.log("🧪 Platform Discovery Test Started");

  const urls = await discoverFromPlatform({
    website: "https://caketoppersindia.com",
    companyId: "4001"
  });

  console.log("Discovered URLs:", urls.length);
  console.log(urls.slice(0, 5));
})();
