const axios = require("axios");
const xml2js = require("xml2js");

async function fetchSitemap(baseUrl) {
  const urls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
    `${baseUrl}/sitemap-products.xml`
  ];

  for (const url of urls) {
    try {
      const res = await axios.get(url, { timeout: 10000 });
      const parsed = await xml2js.parseStringPromise(res.data);
      const locs =
        parsed.urlset?.url?.map(u => u.loc[0]) ||
        parsed.sitemapindex?.sitemap?.map(s => s.loc[0]) ||
        [];
      if (locs.length) return locs;
    } catch (_) {}
  }
  return [];
}

module.exports = fetchSitemap;
