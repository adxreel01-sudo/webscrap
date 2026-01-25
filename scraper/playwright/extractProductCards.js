const { chromium } = require("playwright");

async function extractProductCards({ url, maxScrolls = 6 }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120"
  });

  try {
    console.log("🌐 Playwright loading:", url);

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 45000
    });

    // 🔽 Scroll to load dynamic products
    for (let i = 0; i < maxScrolls; i++) {
      await page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight)
      );
      await page.waitForTimeout(2000);
    }

    // 🧠 Generic product-card detection
    const products = await page.evaluate(() => {
      const results = [];
      const seen = new Set();

      const priceRegex = /₹|\$|€|Rs\.?/;

      document.querySelectorAll("img").forEach(img => {
        const card =
          img.closest("a") ||
          img.closest("div");

        if (!card) return;

        const text = card.innerText || "";
        if (!priceRegex.test(text)) return;

        const name = text
          .split("\n")
          .map(t => t.trim())
          .find(t => t.length > 3 && !priceRegex.test(t));

        if (!name) return;

        const priceMatch = text.match(/₹\s?[\d,]+|\$\s?[\d,]+/);
        const price = priceMatch ? priceMatch[0] : null;

        const image = img.src || null;

        const key = name + image;
        if (seen.has(key)) return;
        seen.add(key);

        results.push({
          name,
          price,
          image,
          source: "playwright"
        });
      });

      return results;
    });

    return products;

  } catch (err) {
    console.error("❌ Playwright product extraction failed:", err.message);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = extractProductCards;
