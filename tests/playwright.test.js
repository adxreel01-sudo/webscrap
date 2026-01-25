const discoverProductUrls =
  require("../scraper/playwright/discoverProductUrls");

(async () => {
  console.log("🧪 Playwright test started");

  const urls = await discoverProductUrls({
    url: "https://www.bluestone.com/jewellery/rings.html"
  });

  console.log("Discovered URLs:", urls.length);
  console.log(urls.slice(0, 5)); // show first 5 only

  process.exit(0);
})();
