const cron = require("node-cron");
const runPipeline = require("../pipeline/runPipeline");

console.log("🟢 Cron scheduler started");

// TEMP: every minute (testing only)
cron.schedule("* * * * *", async () => {
  console.log("⏰ Cron triggered");
  await runPipeline();
});
