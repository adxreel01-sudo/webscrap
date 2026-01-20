const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function discoverAllShopifyProducts(baseUrl) {
  let page = 1;
  let allUrls = new Set();

  while (true) {
    const url = `${baseUrl}/collections/all?page=${page}`;
    console.log("🌐 Fetching:", url);

    const res = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(res.data);
    const links = $("a[href^='/products/']");

    if (links.length === 0) break; // ❌ no more pages

    links.each((_, el) => {
      allUrls.add(baseUrl + $(el).attr("href"));
    });

    page++;
  }

  return Array.from(allUrls);
};
