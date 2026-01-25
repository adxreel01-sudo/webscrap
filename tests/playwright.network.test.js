const extractViaNetwork =
  require("../scraper/playwright/extractViaNetwork");

(async () => {
  console.log("🧪 Network API extraction test");

  const products = await extractViaNetwork({
    url: "https://www.bluestone.com/jewellery/rings.html"
  });

  console.log("Products found:", products.length);
  console.log(products.slice(0, 5));

  process.exit(0);
})();
