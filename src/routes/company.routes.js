const express = require("express");
const router = express.Router();
const controller = require("../controllers/company.controller");

router.post("/scrape", controller.scrapeCompany);

module.exports = router;
