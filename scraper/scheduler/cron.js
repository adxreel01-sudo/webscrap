const cron = require("node-cron");
const runPipeline = require("../pipeline/runPipeline");

console.log("🟢 Product Scraper Cron Scheduler Started");

// ✅ Production schedule:
// Every Sunday at 03:00 AM (low traffic)
cron.schedule("0 3 * * 0", async () => {
  console.log("⏰ Weekly cron triggered");

  try {
    await runPipeline();
    console.log("✅ Weekly pipeline completed");
  } catch (err) {
    console.error("❌ Weekly pipeline failed:", err.message);
  }
});
