const express = require("express");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/product.routes");

const app = express();

// Parse JSON body
app.use(express.json());

// Connect MongoDB
connectDB();

// Register routes
app.use("/products", productRoutes);

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
