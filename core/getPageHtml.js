const fs = require("fs");
const path = require("path");

function getPageHtml({ url, companyId }) {
  const companyDir = path.join(__dirname, "..", "data", String(companyId));
  const indexPath = path.join(companyDir, "pageIndex.json");

  if (!fs.existsSync(indexPath)) return null;

  const pageIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  const fileName = pageIndex[url];
  if (!fileName) return null;

  const htmlPath = path.join(companyDir, "pages", fileName);
  if (!fs.existsSync(htmlPath)) return null;

  return fs.readFileSync(htmlPath, "utf-8");
}

module.exports = getPageHtml;
