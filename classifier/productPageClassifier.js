const axios = require("axios");
const cheerio = require("cheerio");

async function isProductPage(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120"
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    let score = 0;

    // 1️⃣ Product title
    if ($("h1").text().trim().length > 3) score += 2;

    // 2️⃣ Price detection
    if (html.match(/₹|\$|€|price/i)) score += 2;

    // 3️⃣ Add to cart / Buy button
    if (
      html.match(/add to cart/i) ||
      html.match(/buy now/i)
    ) {
      score += 3;
    }

    // 4️⃣ Product images
    if ($("img").length > 3) score += 1;

    // Decision
    return score >= 5;
  } catch (error) {
    return false;
  }
}

module.exports = isProductPage;
