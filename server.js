const express = require("express");
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/product.routes");
const companyRoutes = require("./src/routes/company.routes");



const app = express();

// Parse JSON body
app.use(express.json());
app.use("/api/company", companyRoutes);
// Connect MongoDB
connectDB();

// Register routes
app.use("/products", productRoutes);

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
