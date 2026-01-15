const axios = require("axios");
const cheerio = require("cheerio");
const { productPatterns } = require("../utils/urlRules");

function looksLikeProduct(url) {
  return productPatterns.some(p => url.includes(p));
}

async function crawlCategories(startUrl, maxPages = 50) {
  const visited = new Set();
  const productUrls = new Set();
  const queue = [startUrl];

  while (queue.length && visited.size < maxPages) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    try {
      const res = await axios.get(url, { timeout: 10000 });
      const $ = cheerio.load(res.data);

      $("a[href]").each((_, a) => {
        const href = $(a).attr("href");
        if (!href) return;

        const abs = href.startsWith("http")
          ? href
          : new URL(href, startUrl).href;

        if (looksLikeProduct(abs)) {
          productUrls.add(abs);
        } else if (!visited.has(abs)) {
          queue.push(abs);
        }
      });
    } catch (err) {
      console.error("Failed to crawl:", url);
    }
  }

  return Array.from(productUrls);
}

module.exports = crawlCategories;
