const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

/**
 * Load all active companies from /companies folder
 */
function loadCompanies() {
  const companiesDir = path.join(__dirname, "../../companies");
  const files = fs.readdirSync(companiesDir);

  let companies = [];

  for (const file of files) {
    if (file.endsWith(".json")) {
      const filePath = path.join(companiesDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (data.is_active === 1) {
        companies.push(data);
      }
    }
  }

  return companies;
}

function runScraperForCompany(company) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 Running scraper for ${company.name}`);

    exec(
      "node ./index.js",
      {
        env: {
          ...process.env,              // keep existing env
          COMPANY_ID: company.id,       // add companyId
          COMPANY_WEBSITE: company.website // add website
        }
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Scraper failed for ${company.name}`);
          console.error(stderr);
          return reject(error);
        }

        console.log(stdout);
        resolve();
      }
    );
  });
}

/**
 * Main pipeline runner (called by CRON)
 */
async function runPipeline() {
  console.log("🚀 Pipeline started");

  try {
    const companies = loadCompanies();

    console.log(`🏢 Active companies found: ${companies.length}`);

    for (const company of companies) {
      try {
        console.log(`🔄 Processing company: ${company.name}`);
        await runScraperForCompany(company);
        console.log(`✅ Completed: ${company.name}`);
      } catch (err) {
        console.error(`❌ Error processing ${company.name}:`, err.message);
      }
    }

    console.log("🎉 Pipeline finished successfully");
  } catch (error) {
    console.error("❌ Pipeline failed:", error.message);
  }
}

module.exports = runPipeline;
