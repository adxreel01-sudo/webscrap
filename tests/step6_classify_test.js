const fs = require("fs");
const path = require("path");
const classifyUrls = require("../classifier/classifyUrls");

(async () => {
  console.log("🧪 Classification Test Started");

  const companyId = "4001";

  // Load discovered URLs (THIS IS REQUIRED)
  const discoveredUrlsPath = path.join(
    __dirname,
    "../data/4001/discoveredUrls.json"
  );

  if (!fs.existsSync(discoveredUrlsPath)) {
    console.error("❌ discoveredUrls.json not found");
    process.exit(1);
  }

  const urls = JSON.parse(fs.readFileSync(discoveredUrlsPath, "utf-8"));

  console.log("Discovered URLs:", urls.length);

  const productUrls = await classifyUrls({
    companyId,
    urls
  });

  console.log("✅ Product URLs found:", productUrls.length);
  console.log(productUrls.slice(0, 5));
})();
