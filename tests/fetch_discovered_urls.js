const fs = require("fs");
const fetchPage = require("../core/fetchPage");

const COMPANY_ID = "4001";
const urls = JSON.parse(
  fs.readFileSync("./data/4001/discoveredUrls.json", "utf-8")
);

(async () => {
  console.log("🌐 Fetching discovered URLs");

  for (const url of urls) {
    await fetchPage({ url, companyId: COMPANY_ID });
  }

  console.log("✅ All discovered URLs fetched");
})();
