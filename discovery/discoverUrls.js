const discoverFromSitemap = require("./tiers/sitemap");
const discoverFromPlatform = require("./tiers/platform");
const discoverFromCategories = require("./tiers/categories");
const discoverFromHomepage = require("./tiers/homepage");

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

  return urls;
}

module.exports = discoverUrls;
