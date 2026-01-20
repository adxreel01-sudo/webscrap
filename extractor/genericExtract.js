const cheerio = require("cheerio");

function extractGenericProduct({ url, html }) {
  const $ = cheerio.load(html);

  const name = $("h1").first().text().trim();
  if (!name) return null;

  // price
  let salePrice = null;
  const priceText = $('[class*="price"], [id*="price"]').first().text();
  if (priceText) {
    const match = priceText.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
    if (match) salePrice = Number(match[1]);
  }

  // images
  const images = [];
  $("img").each((_, img) => {
    let src =
      $(img).attr("data-src") ||
      $(img).attr("src");

    if (!src) return;
    if (src.startsWith("//")) src = "https:" + src;
    if (!src.startsWith("http")) return;

    images.push({
      url: src,
      isPrimary: images.length === 0
    });
  });

  // description
  let description = null;
  $(".product-description, .description, .rte").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 100 && !description) description = text;
  });

  return {
    sourceUrl: url,
    name,
    description,
    images,
    pricing: {
      salePrice: salePrice || 0,
      currency: "INR"
    }
  };
}

module.exports = extractGenericProduct;
