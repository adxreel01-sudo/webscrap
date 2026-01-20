const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

module.exports = async function discoverUrls(website, companyId) {

  const sitemapUrl = website.replace(/\/$/, "") + "/sitemap.xml";
  console.log(`🌐 Using sitemap: ${sitemapUrl}`);

  let productUrls = [];

  try {
    const res = await axios.get(sitemapUrl, { timeout: 15000 });
    const $ = cheerio.load(res.data, { xmlMode: true });

    $("loc").each((_, el) => {
      const url = $(el).text();
      if (url.includes("/products/")) {
        productUrls.push(url);
      }
    });
  } catch (err) {
    console.log("⚠️ Sitemap fetch failed");
  }

  const companyDir = path.join(__dirname, "..", "data", String(companyId));
  if (!fs.existsSync(companyDir)) {
    fs.mkdirSync(companyDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(companyDir, "discoveredUrls.json"),
    JSON.stringify(productUrls, null, 2)
  );

  console.log(`✅ Discovered ${productUrls.length} URLs for ${companyId}`);
};
