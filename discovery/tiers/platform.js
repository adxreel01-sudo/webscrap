const cheerio = require("cheerio");
const fetchPage = require("../../core/fetchPage");
const getPageHtml = require("../../core/getPageHtml");

function normalizeUrl(href, website) {
  if (!href) return null;
  if (href.startsWith("http")) return href;
  if (href.startsWith("/")) return website + href;
  return null;
}

async function discoverFromPlatform({ website, companyId }) {
  const discovered = new Set();

  const candidates = [
    `${website}/collections/all`,
    `${website}/shop`,
    `${website}/store`,
    `${website}/products`
  ];

  for (const url of candidates) {
    try {
      await fetchPage({ url, companyId });
      const html = getPageHtml({ url, companyId });
      if (!html) continue;

      const $ = cheerio.load(html);

      $("a[href*='/products/']").each((_, a) => {
        const href = $(a).attr("href");
        const fullUrl = normalizeUrl(href, website);
        if (fullUrl) discovered.add(fullUrl);
      });

      if (discovered.size > 0) break;
    } catch {
      continue;
    }
  }

  return Array.from(discovered);
}

module.exports = discoverFromPlatform;
