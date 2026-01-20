const cheerio = require("cheerio");
const fetchPage = require("../../core/fetchPage");
const getPageHtml = require("../../core/getPageHtml");

const PRODUCT_HINTS = [
  "/product/",
  "/products/",
  "/p/",
  "/item/"
];

function normalizeUrl(href, website) {
  if (!href) return null;
  if (href.startsWith("http")) return href;
  if (href.startsWith("/")) return website + href;
  return null;
}

async function discoverFromHomepage({ website, companyId }) {
  const discovered = new Set();

  try {
    await fetchPage({ url: website, companyId });
    const html = getPageHtml({ url: website, companyId });
    if (!html) return [];

    const $ = cheerio.load(html);

    $("a").each((_, a) => {
      const href = normalizeUrl($(a).attr("href"), website);
      if (!href) return;

      if (PRODUCT_HINTS.some(h => href.includes(h))) {
        discovered.add(href);
      }
    });
  } catch {
    return [];
  }

  return Array.from(discovered);
}

module.exports = discoverFromHomepage;
