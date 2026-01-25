const { chromium } = require("playwright");

async function extractViaNetwork({ url, maxScrolls = 6 }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const products = [];

  try {
    // 👂 Listen to network responses
    page.on("response", async response => {
        try {
    const ct = response.headers()["content-type"] || "";
    if (!ct.includes("application/json")) return;

    const url = response.url();

    console.log("🟡 JSON response:", url);

    const text = await response.text();
    console.log(text.slice(0, 500)); // first 500 chars
  } catch {}
    });

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 45000
    });

    // Trigger lazy loading
    for (let i = 0; i < maxScrolls; i++) {
      await page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight)
      );
      await page.waitForTimeout(2000);
    }

    return products;

  } catch (err) {
    console.error("❌ Network extraction failed:", err.message);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = extractViaNetwork;
