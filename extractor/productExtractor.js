const axios = require("axios");

async function extractProduct(url) {
  try {
    const jsonUrl = url.endsWith(".json") ? url : `${url}.json`;

    const response = await axios.get(jsonUrl, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
        "Accept": "application/json"
      }
    });

    const product = response.data.product;
    if (!product) return null;

    return {
      sourceUrl: url,
      name: product.title,
      description: product.body_html
        ? product.body_html.replace(/<[^>]*>/g, "").trim()
        : "",
      images: product.images.map((img, index) => ({
        url: img.src,
        isPrimary: index === 0
      })),
      pricing: {
        salePrice: product.variants?.[0]?.price
          ? Number(product.variants[0].price)
          : null,
        mrp: null,
        currency: "INR"
      },
      isActive: product.available
    };
  } catch (error) {
    return null;
  }
}

module.exports = extractProduct;
