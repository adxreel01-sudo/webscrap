const discoverFromSitemap = require("./tiers/sitemap");
const discoverFromPlatform = require("./tiers/platform");
const discoverFromCategories = require("./tiers/categories");
const discoverFromHomepage = require("./tiers/homepage");
const discoverWithPlaywright = require("../scraper/playwright/extractProductLinks.generic");

async function discoverUrls({ website, companyId }) {
  console.log("🔍 Discovery started");

  let urls = [];

  // TIER 1 — Sitemap
  urls = await discoverFromSitemap({ website, companyId });
  if (urls.length > 0) {
    console.log(`✅ Sitemap discovery success (${urls.length})`);
    return urls;
  }

  // TIER 2 — Platform fallback
  urls = await discoverFromPlatform({ website, companyId });
  if (urls.length > 0) {
    console.log(`✅ Platform discovery success (${urls.length})`);
    return urls;
  }

  // TIER 3 — Category crawl
  urls = await discoverFromCategories({ website, companyId });
  if (urls.length > 0) {
    console.log(`✅ Category discovery success (${urls.length})`);
    return urls;
  }

  // TIER 4 — Homepage crawl
urls = await discoverFromHomepage({ website, companyId });
console.log(`⚠️ Homepage discovery result (${urls.length})`);

if (urls.length > 0) return urls;

// 🔥 TIER 5 — Playwright fallback (GENERIC)
console.log("🧠 Falling back to Playwright discovery");

try {
  const playwrightUrls = await discoverWithPlaywright({
    url: website +"/jewellery/rings.html"
  });

  console.log(
    `✅ Playwright discovery result (${playwrightUrls.length})`
  );

  return playwrightUrls;
} catch (err) {
  console.error("❌ Playwright discovery failed:", err.message);
  return [];
}

}

module.exports = discoverUrls;
