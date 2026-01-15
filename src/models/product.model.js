const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  isPrimary: { type: Boolean, default: false }
});

const VariantSchema = new mongoose.Schema({
  name: String,
  price: Number,
  attributes: {
    color: String,
    size: String
  }
});

const ProductSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    sourceUrl: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    description: String,

    category: String,
    productType: String,

    images: {
      type: [ImageSchema],
      required: true
    },

    pricing: {
      salePrice: { type: Number, required: true },
      mrp: Number,
      currency: { type: String, default: "INR" }
    },

    variants: [VariantSchema],

    language: {
      type: String,
      default: "en"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    lastScrapedAt: Date,

    scrapeStatus: {
      type: String,
      enum: ["success", "failed", "partial"],
      default: "success"
    }
  },
  { timestamps: true }
);

ProductSchema.index({ companyId: 1, sourceUrl: 1 }, { unique: true });

module.exports = mongoose.model("Product", ProductSchema);
