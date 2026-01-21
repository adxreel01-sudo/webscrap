const axios = require("axios");

const BASE_URL = "http://localhost:5000/api/company";

async function testValidWebsite() {
  console.log("🧪 Test 1: Valid website");

  const res = await axios.post(`${BASE_URL}/scrape`, {
    website: "https://caketoppersindia.com"
  });

  console.log(res.data);

  if (!res.data.success) {
    throw new Error("Expected success=true for valid website");
  }

  if (!res.data.data || !res.data.data.website) {
    throw new Error("Company data missing");
  }

  console.log("✅ Test 1 passed\n");
}

async function testMissingWebsite() {
  console.log("🧪 Test 2: Missing website");

  const res = await axios.post(`${BASE_URL}/scrape`, {});

  console.log(res.data);

  if (res.data.success !== false) {
    throw new Error("Expected success=false for missing website");
  }

  if (res.data.status !== "failed") {
    throw new Error("Expected status=failed");
  }

  console.log("✅ Test 2 passed\n");
}

async function testInvalidWebsite() {
  console.log("🧪 Test 3: Invalid website");

  const res = await axios.post(`${BASE_URL}/scrape`, {
    website: "https://this-domain-does-not-exist-12345.com"
  });

  console.log(res.data);

  if (res.data.status !== "failed") {
    throw new Error("Expected failed status for invalid website");
  }

  console.log("✅ Test 3 passed\n");
}

(async () => {
  try {
    await testValidWebsite();
    await testMissingWebsite();
    await testInvalidWebsite();

    console.log("🎉 ALL STEP 1 TESTS PASSED");
  } catch (err) {
    console.error("❌ TEST FAILED:", err.message);
  }
})();
