const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router.get("/", controller.getProducts);
router.post("/", controller.createProduct);
router.patch("/:id/status", controller.updateProductStatus);

module.exports = router;
