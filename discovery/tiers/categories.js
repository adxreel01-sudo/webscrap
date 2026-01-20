const cheerio = require("cheerio");
const fetchPage = require("../../core/fetchPage");
const getPageHtml = require("../../core/getPageHtml");

const CATEGORY_HINTS = [
  "/collections",
  "/category",
  "/shop"
];

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

function looksLikeProduct(url) {
  return PRODUCT_HINTS.some(h => url.includes(h));
}

function looksLikeCategory(url) {
  return CATEGORY_HINTS.some(h => url.includes(h));
}

async function discoverFromCategories({ website, companyId }) {
  const discovered = new Set();
  const visitedCategories = new Set();

  // 1️⃣ Fetch homepage
  await fetchPage({ url: website, companyId });
  const homeHtml = getPageHtml({ url: website, companyId });
  if (!homeHtml) return [];

  const $home = cheerio.load(homeHtml);

  const categoryUrls = [];

  $home("a").each((_, a) => {
    const href = normalizeUrl($home(a).attr("href"), website);
    if (href && looksLikeCategory(href)) {
      categoryUrls.push(href);
    }
  });

  // Limit categories
  const limitedCategories = categoryUrls.slice(0, 10);

  // 2️⃣ Crawl each category once
  for (const categoryUrl of limitedCategories) {
    if (visitedCategories.has(categoryUrl)) continue;
    visitedCategories.add(categoryUrl);

    await fetchPage({ url: categoryUrl, companyId });
    const html = getPageHtml({ url: categoryUrl, companyId });
    if (!html) continue;

    const $ = cheerio.load(html);

    $("a").each((_, a) => {
      const href = normalizeUrl($(a).attr("href"), website);
      if (href && looksLikeProduct(href)) {
        discovered.add(href);
      }
    });

    if (discovered.size > 100) break;
  }

  return Array.from(discovered);
}

module.exports = discoverFromCategories;
