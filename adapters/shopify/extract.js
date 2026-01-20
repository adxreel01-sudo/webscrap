const cheerio = require("cheerio");

function extractShopifyProduct({ url, html }) {
  const $ = cheerio.load(html);

  // 1️⃣ NAME
  const name =
    $('meta[property="og:title"]').attr("content") ||
    $("h1").first().text().trim();

  if (!name) return null;

  // 2️⃣ DESCRIPTION (Shopify product section only)
  let description = null;

  const descEl =
    $('[itemprop="description"]').first() ||
    $(".product__description").first() ||
    $(".rte").first();

  if (descEl && descEl.text()) {
    const text = descEl.text().trim();
    if (text.length > 100) description = text;
  }

  // 3️⃣ PRICE (structured)
  let salePrice = null;
  let currency = "INR";

  const priceMeta =
    $('meta[property="product:price:amount"]').attr("content") ||
    $('meta[itemprop="price"]').attr("content");

  if (priceMeta) {
    salePrice = Number(priceMeta);
  }

  const currencyMeta =
    $('meta[property="product:price:currency"]').attr("content");

  if (currencyMeta) currency = currencyMeta;

  // 4️⃣ IMAGES (Shopify CDN only)
  const images = [];
  const seen = new Set();

  $('img[src*="cdn.shopify.com"]').each((_, img) => {
    let src =
      $(img).attr("data-src") ||
      $(img).attr("src");

    if (!src) return;

    if (src.startsWith("//")) src = "https:" + src;
    if (seen.has(src)) return;

    seen.add(src);

    images.push({
      url: src,
      isPrimary: images.length === 0
    });
  });

  return {
    sourceUrl: url,
    name,
    description,
    images,
    pricing: {
      salePrice: salePrice || 0,
      currency
    }
  };
}

module.exports = extractShopifyProduct;
