// scraper/playwright/discoverProductUrls.js
const { chromium } = require("playwright");

module.exports = async function discoverProductUrls({ url }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("🌐 Playwright loading:", url);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  // ⬇️ FORCE LAZY LOAD
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 3000);
    await page.waitForTimeout(1500);
  }

  // ⏳ Wait for product cards
  await page.waitForTimeout(3000);

  // 🔍 Extract product links
  const productUrls = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a"));
    return anchors
      .map(a => a.href)
      .filter(h =>
        h &&
        (
          h.includes("/product/") ||
          h.includes("/jewellery/")
        )
      );
  });

  await browser.close();

  return [...new Set(productUrls)];
};
