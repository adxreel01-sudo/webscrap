const extractProductLinks = require(
  "../scraper/playwright/extractProductLinks.generic"
);

(async () => {
  const urls = await extractProductLinks({
    url: "https://www.bluestone.com/jewellery/rings.html"
  });

  console.log("Products found:", urls.length);
  console.log(urls.slice(0, 5));
})();
