const fetchPage = require("../core/fetchPage");

(async () => {
  const html = await fetchPage({
    url: "https://caketoppersindia.com",
    companyId: "4001"
  });

  console.log("HTML length:", html.length);
})();
