const cheerio = require("cheerio");

function isProductPage({ url, html }) {
  if (!html) return false;

  const $ = cheerio.load(html);
  let score = 0;

  // 1️⃣ Product title
  const h1Text = $("h1").first().text().trim();
  if (h1Text.length > 3) score += 2;

  // 2️⃣ Price signals
  if (/₹|\$|€|price/i.test(html)) score += 2;

  // 3️⃣ Buy intent buttons
  if (/add to cart|buy now/i.test(html)) score += 3;

  // 4️⃣ Image density
  if ($("img").length > 3) score += 1;

  return score >= 5;
}

module.exports = isProductPage;
