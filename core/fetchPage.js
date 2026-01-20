const axios = require("axios");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function hashUrl(url) {
  return crypto.createHash("md5").update(url).digest("hex");
}

async function fetchPage({ url, companyId }) {
  const companyDir = path.join(__dirname, "..", "data", String(companyId));
  const pagesDir = path.join(companyDir, "pages");
  const indexPath = path.join(companyDir, "pageIndex.json");

  // Safety
  if (!fs.existsSync(companyDir)) {
    throw new Error(`Company folder not found: ${companyDir}`);
  }

  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, "{}");
  }

  const pageIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

  // 🔁 FETCH ONCE RULE
  if (pageIndex[url]) {
    const htmlPath = path.join(pagesDir, pageIndex[url]);
    return fs.readFileSync(htmlPath, "utf-8");
  }

  console.log("🌐 Fetching:", url);

  const response = await axios.get(url, {
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120"
    }
  });

  const html = response.data;
  const fileName = `${hashUrl(url)}.html`;
  const filePath = path.join(pagesDir, fileName);

  fs.writeFileSync(filePath, html);

  pageIndex[url] = fileName;
  fs.writeFileSync(indexPath, JSON.stringify(pageIndex, null, 2));

  return html;
}

module.exports = fetchPage;
