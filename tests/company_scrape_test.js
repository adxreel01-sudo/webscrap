const axios = require("axios");

(async () => {
  console.log("🧪 Company Scrape Test Started");

  const response = await axios.post(
    "http://localhost:5000/api/company/scrape",
    {
      website: "https://caketoppersindia.com"
    }
  );

  console.log("✅ API Response:");
  console.log(response.data);
})();
