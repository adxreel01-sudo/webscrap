const getPageHtml = require("../core/getPageHtml");
const isProductPage = require("../core/isProductPage");

const COMPANY_ID = "4001";
const TEST_URL =
  "https://caketoppersindia.com/products/personalized-luxurious-ring-platter-with-ring-box-floral-ring-platter";

const html = getPageHtml({
  url: TEST_URL,
  companyId: COMPANY_ID
});

if (!html) {
  console.log("❌ HTML not found. Run fetchPage first.");
  process.exit(1);
}

const result = isProductPage({
  url: TEST_URL,
  html
});

console.log("Is product page?", result);
