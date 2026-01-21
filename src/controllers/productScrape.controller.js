const Company = require("../models/company.model");
const runPipeline = require("../../scraper/pipeline/runPipeline");

exports.scrapeProducts = async (req, res) => {
  const startTime = Date.now();

  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(200).json({
        success: false,
        status: "failed",
        data: null,
        error: {
          code: "VALIDATION_ERROR",
          message: "companyId is required"
        }
      });
    }

    // Ensure company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(200).json({
        success: false,
        status: "failed",
        data: null,
        error: {
          code: "NOT_FOUND",
          message: "Company not found"
        }
      });
    }

    // 🔥 Trigger pipeline (non-blocking mindset)
    runPipeline().catch(err => {
      console.error(
        `❌ Product pipeline failed for company ${companyId}:`,
        err.message
      );
    });

    return res.status(200).json({
      success: true,
      status: "success",
      data: {
        companyId,
        message: "Product scraping started"
      },
      error: null,
      meta: {
        triggeredAt: new Date().toISOString(),
        durationMs: Date.now() - startTime
      }
    });

  } catch (err) {
    console.error("❌ Product scrape trigger failed:", err.message);

    return res.status(200).json({
      success: false,
      status: "failed",
      data: null,
      error: {
        code: "PRODUCT_SCRAPE_FAILED",
        message: "Unable to trigger product scraping"
      }
    });
  }
};
