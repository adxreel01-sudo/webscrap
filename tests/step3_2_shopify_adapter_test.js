const extractShopifyProduct = require("../adapters/shopify.extractor");

(async () => {
  console.log("🧪 Shopify JSON API Test");

  const product = await extractShopifyProduct(
    "https://caketoppersindia.com/products/personalized-luxurious-ring-platter-with-ring-box-floral-ring-platter"
  );

  console.log(product);

  console.log("\nValidation:");
  console.log("Name:", product?.name ? "✅" : "❌");
  console.log("Images:", product?.images?.length ? "✅" : "❌");
  console.log("Price:", product?.pricing?.salePrice ? "✅" : "❌");
})();
