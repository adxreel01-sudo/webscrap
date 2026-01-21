const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");
const productScrapeController = require("../controllers/productScrape.controller");

router.post("/scrape", companyController.scrapeCompany);

// ✅ STEP 3: Product scrape trigger
router.post(
  "/:companyId/scrape-products",
  productScrapeController.scrapeProducts
);

module.exports = router;
