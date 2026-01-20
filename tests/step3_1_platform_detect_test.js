const fs = require("fs");
const path = require("path");
const detectPlatform = require("../adapters/detectPlatform");

// load pageIndex
const pageIndex = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/4001/pageIndex.json"), "utf-8")
);

// pick first cached page
const [url, fileName] = Object.entries(pageIndex)[0];

const htmlPath = path.join(
  __dirname,
  "../data/4001/pages",
  fileName
);

const html = fs.readFileSync(htmlPath, "utf-8");

console.log("URL:", url);
console.log("Detected platform:", detectPlatform(html));
