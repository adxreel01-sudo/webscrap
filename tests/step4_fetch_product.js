const fetchPage = require("../core/fetchPage");

(async () => {
  await fetchPage({
    url: "https://caketoppersindia.com/products/personalized-luxurious-ring-platter-with-ring-box-floral-ring-platter",
    companyId: "4001"
  });

  console.log("✅ Product page fetched and stored");
})();
