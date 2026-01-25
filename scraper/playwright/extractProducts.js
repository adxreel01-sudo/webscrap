const { chromium } = require("playwright");

async function extractProductsWithPlaywright({ url }) {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120"
  });

  try {
    await page.goto(url, {
      timeout: 30000,
      waitUntil: "networkidle"
    });

    // 🔽 Give JS time to render product grid
    await page.waitForTimeout(3000);

    // 🔍 Extract product cards (generic)
    const products = await page.$$eval(
      "a[href]",
      links => {
        return links
          .map(a => a.href)
          .filter(href =>
            href.includes("/product") ||
            href.includes("/products")
          );
      }
    );

    return Array.from(new Set(products));

  } catch (err) {
    console.error("❌ Playwright failed:", err.message);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = extractProductsWithPlaywright;
