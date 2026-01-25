const extractProductCards =
  require("../scraper/playwright/extractProductCards");

(async () => {
  console.log("🧪 Product card extraction test");

  const products = await extractProductCards({
    url: "https://www.bluestone.com/jewellery/rings.html"
  });

  console.log("Products found:", products.length);
  console.log(products.slice(0, 5));

  process.exit(0);
})();
