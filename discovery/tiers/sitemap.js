const cheerio = require("cheerio");
const fetchPage = require("../../core/fetchPage");

const PRODUCT_HINTS = [
  "/product/",
  "/products/",
  "/p/",
  "/item/"
];

function looksLikeProductUrl(url) {
  return PRODUCT_HINTS.some(hint => url.includes(hint));
}

async function parseSitemap({ sitemapUrl, companyId }) {
  try {
    const xml = await fetchPage({ url: sitemapUrl, companyId });
    const $ = cheerio.load(xml, { xmlMode: true });

    const urls = [];
    $("url > loc").each((_, el) => {
      const loc = $(el).text().trim();
      if (loc) urls.push(loc);
    });

    return urls;
  } catch {
    return [];
  }
}

async function discoverFromSitemap({ website, companyId }) {
  const discovered = new Set();

  const sitemapCandidates = [
    `${website}/sitemap.xml`,
    `${website}/sitemap_index.xml`
  ];

  for (const sitemapUrl of sitemapCandidates) {
    const urls = await parseSitemap({ sitemapUrl, companyId });

    // Case 1: regular sitemap
    if (urls.some(u => looksLikeProductUrl(u))) {
      urls.forEach(u => {
        if (looksLikeProductUrl(u)) discovered.add(u);
      });
      break;
    }

    // Case 2: sitemap index
    for (const childSitemap of urls) {
      if (!childSitemap.endsWith(".xml")) continue;

      const childUrls = await parseSitemap({
        sitemapUrl: childSitemap,
        companyId
      });

      childUrls.forEach(u => {
        if (looksLikeProductUrl(u)) discovered.add(u);
      });

      if (discovered.size > 500) break;
    }

    if (discovered.size > 0) break;
  }

  return Array.from(discovered);
}

module.exports = discoverFromSitemap;
