const getPageHtml = require("../core/getPageHtml");

const html = getPageHtml({
  url: "https://caketoppersindia.com",
  companyId: "4001"
});

if (!html) {
  console.log("❌ No HTML found");
} else {
  console.log("✅ HTML read from disk");
  cons
  
  ole.log("HTML length:", html.length);
}
