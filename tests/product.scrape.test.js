const axios = require("axios");

const BASE_URL = "http://localhost:5000/api/company";

async function testProductScrape() {
  console.log("🧪 Test: Product scrape trigger");

  // Replace with an existing company _id from MongoDB
  const companyId = "69705e58ba058736ff12b5a3";

  const res = await axios.post(
    `${BASE_URL}/${companyId}/scrape-products`
  );

  console.log(res.data);

  if (!res.data.success) {
    throw new Error("Product scrape trigger failed");
  }

  console.log("✅ Product scrape trigger test passed");
}

(async () => {
  try {
    await testProductScrape();
    console.log("🎉 STEP 3 TEST PASSED");
  } catch (err) {
    console.error("❌ TEST FAILED:", err.message);
  }
})();
