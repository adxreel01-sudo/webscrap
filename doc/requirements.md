npm init -y
npm install express mongoose dotenv cors

STEP 2 — INSTALL SCRAPER DEPENDENCIES

From repo root:

cd scraper
npm init -y
npm install axios cheerio xml2js p-limit

npm uninstall p-limit

npm install node-cron
npm install playwright
npx playwright install chromium
