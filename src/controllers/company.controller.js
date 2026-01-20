const axios = require("axios");
const cheerio = require("cheerio");
const Company = require("../models/company.model");

exports.scrapeCompany = async (req, res) => {
  const { website } = req.body;

  if (!website) {
    return res.status(400).json({ error: "website is required" });
  }

  console.log("🌐 Scraping company website:", website);

  try {
    const response = await axios.get(website, {
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // -------- BASIC EXTRACTION ----------
    const name =
      $("title").text().trim() ||
      $("meta[property='og:site_name']").attr("content") ||
      null;

    const about =
      $("meta[name='description']").attr("content") ||
      null;

    // -------- PLATFORM DETECTION ----------
    let platform = "unknown";
    if (html.includes("cdn.shopify.com")) {
      platform = "shopify";
    }

    // -------- PHONE EXTRACTION ----------
    function extractPhoneNumbers($) {
      const phones = new Set();

      $("a[href^='tel:']").each((_, el) => {
        const raw = $(el).attr("href").replace("tel:", "").trim();
        const clean = raw.replace(/\s+/g, "");
        if (isValidPhone(clean)) phones.add(clean);
      });

      $("footer").find("p, span, div").each((_, el) => {
        const text = $(el).text();
        const matches = text.match(/(\+91[\s\-]?)?[6-9]\d{9}/g);
        if (matches) {
          matches.forEach(num => {
            const clean = num.replace(/\s+/g, "");
            if (isValidPhone(clean)) phones.add(clean);
          });
        }
      });

      return Array.from(phones);
    }

    function isValidPhone(phone) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 12) return false;
      if (/^0+$/.test(digits)) return false;
      if (/12345|99999|88888/.test(digits)) return false;
      return true;
    }

    const phones = extractPhoneNumbers($);

    // -------- EMAIL ----------
    const bodyText = $("body").text();
    const emailMatch = bodyText.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );
    const email = emailMatch ? emailMatch[0] : null;

    // 🔥 STEP 1: FORCE REMOVE OLD `phone` FIELD
    await Company.updateOne(
      { website },
      { $unset: { phone: "" } }
    );

    // 🔥 STEP 2: UPSERT CLEAN DATA
    const company = await Company.findOneAndUpdate(
      { website },
      {
        $set: {
          website,
          name,
          about,
          email,
          phones,          // ✅ correct field
          location: null,
          platform
        }
      },
      { upsert: true, new: true }
    );

    console.log("✅ Company scraped:", company.name);

    res.json({
      status: 200,
      data: company
    });
  } catch (err) {
    console.error("❌ Company scrape failed:", err.message);
    res.status(500).json({ error: "Company scrape failed" });
  }
};
