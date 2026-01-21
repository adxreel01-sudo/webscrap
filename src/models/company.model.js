const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    website: { type: String, required: true, unique: true },
    name: String,
    about: String,
    email: String,
    phones: { type: [String], default: [] },
    location: String,
    socials: {
      instagram: String,
      whatsapp: String,
      facebook: String,
      twitter: String,
      linkedin: String
    },
    platform: String,

    // ✅ STEP 1 ADDITIONS
    scrapeStatus: {
      type: String,
      enum: ["success", "partial", "failed"],
      default: "success"
    },
    lastScrapedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
