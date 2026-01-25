const { chromium } = require("playwright");

module.exports = async function extractProductLinks({ url }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("🌐 Loading:", url);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  // Trigger lazy loading
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1000);
  }

  const productUrls = await page.evaluate(() => {
    const candidates = [];

    document.querySelectorAll("a[href]").forEach(a => {
      const href = a.href;
      if (!href) return;

      const card = a.closest("div, li, article");
      if (!card) return;

      const text = card.innerText || "";

      // 🧠 GENERIC PRODUCT SIGNALS
      const hasPrice = /₹|\$|€|Rs\.?|INR/i.test(text);
      const hasImage = card.querySelector("img");
      const hasName = text.length > 10 && text.length < 200;

      if (hasPrice && hasImage && hasName) {
        candidates.push(href.split("?")[0]);
      }
    });

    return [...new Set(candidates)];
  });
  const cleanProductUrls = productUrls.filter(u => {
    if (!u.startsWith("http")) return false;
    if (u.includes("#") || u.includes("video") || u.includes("banner"))
      return false;

    return (
      u.match(/~\d+\.html$/) ||
      u.split("/").length >= 5
    );
  });
  console.log(`🔗 Found ${cleanProductUrls.length} product links.`);
  

  await browser.close();
  return productUrls;
};
