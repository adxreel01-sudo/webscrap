const { chromium } = require("playwright");

module.exports = async function extractProductPage({ url }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("🛒 Extracting PDP:", url);

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 60000
    });

    // Ensure lazy content loads
    await page.waitForTimeout(2000);

    const product = await page.evaluate(() => {
      // ---- NAME ----
      const name =
        document.querySelector("h1")?.innerText?.trim() ||
        document.querySelector('[itemprop="name"]')?.innerText?.trim() ||
        null;

      if (!name) return null;

      // ---- PRICE ----
      let salePrice = null;
      const priceText = document.body.innerText;
      const match = priceText.replace(/,/g, "").match(/₹\s?(\d+)/);
      if (match) salePrice = Number(match[1]);

      // ---- IMAGES ----
      const images = [];
      document.querySelectorAll("img").forEach(img => {
        const src =
          img.getAttribute("data-src") ||
          img.getAttribute("src");

        if (
          src &&
          src.startsWith("http") &&
          !src.includes("icon") &&
          !src.includes("logo")
        ) {
          images.push({
            url: src,
            isPrimary: images.length === 0
          });
        }
      });

      // ---- DESCRIPTION ----
      let description = null;
      document.querySelectorAll("p, div").forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.length > 120 && !description) {
          description = text;
        }
      });

      return {
        name,
        description,
        images,
        pricing: {
          salePrice: salePrice || 0,
          currency: "INR"
        }
      };
    });

    await browser.close();
    return product;
  } catch (err) {
    await browser.close();
    return null;
  }
};
