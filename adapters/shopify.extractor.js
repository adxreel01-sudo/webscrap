const axios = require("axios");

async function extractShopifyProduct(productUrl) {
  try {
    // Convert product page URL → Shopify JSON URL
    const jsonUrl = productUrl.endsWith(".js")
      ? productUrl
      : productUrl + ".js";

    const { data } = await axios.get(jsonUrl, { timeout: 15000 });

    if (!data || !data.title || !data.variants) return null;
    const cleanDescription = data.description
  ? data.description
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  : null;


return {
  name: data.title,

  description: cleanDescription,

  images: data.images.map((url, index) => ({
    url: url.startsWith("//") ? "https:" + url : url,
    isPrimary: index === 0
  })),

  pricing: {
    salePrice: Number(data.variants[0].price) / 100,
    currency: "INR"
  },

  variants: data.variants.map(v => ({
    name: v.title,
    price: Number(v.price) / 100,
    attributes: {
      color: v.option1 || null,
      size: v.option2 || null
    }
  }))
};

  } catch (err) {
    return null;
  }
}

module.exports = extractShopifyProduct;
