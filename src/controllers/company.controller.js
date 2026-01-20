const axios = require("axios");
const cheerio = require("cheerio");
const Company = require("../models/company.model");

exports.scrapeCompany = async (req, res) => {
  try {
    const { website } = req.body;

    if (!website) {
      return res.status(400).json({ error: "website is required" });
    }

    console.log("🌐 Scraping company website:", website);

    const response = await axios.get(website, {
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // -------- BASIC ----------
    const name =
      $("meta[property='og:site_name']").attr("content") ||
      $("title").text().trim() ||
      null;

    const about =
      $("meta[name='description']").attr("content") || null;

    const platform = html.includes("cdn.shopify.com")
      ? "shopify"
      : "unknown";

    // -------- EMAIL ----------
    let email = null;
    const bodyText = $("body").text();
    const emailMatch = bodyText.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );
    if (emailMatch) email = emailMatch[0];

    // -------- PHONE HELPERS ----------
    function extractRawPhones($) {
      const found = [];

      $("a[href^='tel:']").each((_, el) => {
        found.push($(el).attr("href"));
      });

      $("footer").find("p, span, div").each((_, el) => {
        const matches = $(el)
          .text()
          .match(/(\+91[\s\-]?)?[6-9]\d{9}/g);
        if (matches) found.push(...matches);
      });

      return found;
    }

    function normalizePhones(raw) {
      const set = new Set();

      raw.forEach(p => {
        let digits = String(p).replace(/\D/g, "");

        if (digits.startsWith("91") && digits.length === 12) {
          digits = digits.slice(2);
        }

        if (digits.length === 10) {
          set.add("+91" + digits);
        }
      });

      return Array.from(set);
    }

    // -------- CONTACT PAGE ----------
    async function fetchContactPage(baseUrl) {
      const paths = ["/contact", "/contact-us", "/support", "/help"];

      for (const p of paths) {
        try {
          const res = await axios.get(baseUrl.replace(/\/$/, "") + p, {
            timeout: 10000,
            headers: { "User-Agent": "Mozilla/5.0" }
          });
          return cheerio.load(res.data);
        } catch {}
      }
      return null;
    }

    // -------- PHONES ----------
    let rawPhones = extractRawPhones($);
    let phones = normalizePhones(rawPhones);

    if (!email || phones.length === 0) {
      const contact$ = await fetchContactPage(website);
      if (contact$) {
        if (!email) {
          const t = contact$("body").text();
          const em = t.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
          if (em) email = em[0];
        }

        rawPhones = [...rawPhones, ...extractRawPhones(contact$)];
        phones = normalizePhones(rawPhones);
      }
    }

    // -------- SOCIALS ----------
    const socials = {};
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (!href) return;

      if (href.includes("instagram.com")) socials.instagram ??= href;
      if (href.includes("facebook.com")) socials.facebook ??= href;
      if (href.includes("linkedin.com")) socials.linkedin ??= href;
      if (href.includes("wa.me") || href.includes("whatsapp"))
        socials.whatsapp ??= href;
    });

    // -------- LOCATION ----------
    let location = null;
    $("address").each((_, el) => {
      const t = $(el).text().trim();
      if (t.length > 20 && /\d/.test(t)) location = t;
    });

    // -------- UPSERT ----------
    const company = await Company.findOneAndUpdate(
      { website },
      {
        $set: {
          website,
          name,
          about,
          email,
          phones,
          location,
          socials,
          platform
        }
      },
      { upsert: true, new: true }
    );

    res.json({ status: 200, data: company });

  } catch (err) {
    console.error("❌ Company scrape failed:", err);
    res.status(500).json({
      error: "Company scrape failed",
      message: err.message
    });
  }
};
