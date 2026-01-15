const Product = require("../models/product.model");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json({ status: 200, data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// INTERNAL: Create product (for now manual)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ status: 201, data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH product status
exports.updateProductStatus = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );
    res.json({ status: 200, data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
