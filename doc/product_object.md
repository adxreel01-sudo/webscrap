FREEZE PRODUCT DATA CONTRACT (VERY IMPORTANT)

This is the single source of truth for everything.

Final Product Object (production-ready)
{
  "companyId": "ObjectId",
  "sourceUrl": "string",

  "name": "string",
  "description": "string",

  "category": "string",
  "productType": "string",

  "images": [
    {
      "url": "string",
      "isPrimary": true
    }
  ],

  "pricing": {
    "salePrice": number,
    "mrp": number,
    "currency": "INR"
  },

  "variants": [
    {
      "name": "string",
      "price": number,
      "attributes": {
        "color": "string",
        "size": "string"
      }
    }
  ],

  "language": "en",
  "isActive": true,

  "lastScrapedAt": "datetime",
  "scrapeStatus": "success",

  "createdAt": "datetime",
  "updatedAt": "datetime"
}


 Rule:
Scraper, DB, API, AI — ALL must follow this.
PRODUCT DATA CONTRACT — RULES (v1.0)
1️⃣ Identity & Uniqueness

companyId + sourceUrl MUST be unique

sourceUrl is the primary identity of a product

Same product on different companies = different records

2️⃣ Ownership & Authority

Website is the source of truth

Scraper reads only

Admin can only:

Toggle isActive

Edit productType (AI/business tag)

Prices must not be edited manually

3️⃣ Required vs Optional Fields

Required (must exist):

companyId

sourceUrl

name

pricing.salePrice

pricing.currency

images[0].url

isActive

createdAt, updatedAt

Optional (can be null/empty):

description

pricing.mrp

variants

category

productType

4️⃣ Pricing Rules

pricing.salePrice = current selling price

pricing.mrp = original price (optional)

currency defaults to "INR"

No negative prices

If mrp < salePrice → ignore mrp

5️⃣ Image Rules

Image URLs must be absolute

At least one image required

One image must have isPrimary: true

Broken images → product set to isActive = false

6️⃣ Category vs Product Type

category = website taxonomy (scraped)

productType = business / AI classification

Scraper fills category

AI/Admin fills productType

7️⃣ Variants Rules

Variants are optional

If variants exist:

Each variant must have a name

Variant price overrides base price

No variant → use base pricing

8️⃣ Language & Localization

language defaults to "en"

One product record = one language

Multilingual versions = separate records

9️⃣ Scraping Lifecycle Rules

Scraper never deletes products

If product disappears from site:

Set isActive = false

Every scrape must update:

lastScrapedAt

scrapeStatus (success | failed | partial)

🔟 Deduplication & Updates

Re-scraping the same product:

UPDATE, never INSERT

Price/image change → update record

No duplicate products allowed

1️⃣1️⃣ API Rules

APIs return only isActive = true by default

Pagination is mandatory

Raw scraper fields never exposed to frontend

1️⃣2️⃣ Versioning Rule (VERY IMPORTANT)

Current version: Schema v1.0

Any schema change → new version (v1.1, v2.0)

No silent changes allowed
----------------------------------------------------

✅ STEP 2 — DATABASE (MongoDB FIRST, MySQL TEMP)
MongoDB (Primary – forward-looking)

Create collections:

companies

products

scrape_jobs

scrape_logs

Add indexes:

companyId

sourceUrl (unique)

isActive

👉 Even if MySQL exists, MongoDB is the future.

STEP 3 — PRODUCT API (YOU ALREADY HAVE 80%)

You already showed:

GET /products

| Method | Endpoint                       |
| ------ | ------------------------------ |
| GET    | `/products`                    |
| GET    | `/products/company/:companyId` |
| POST   | `/products` (internal use)     |
| PATCH  | `/products/:id/status`         |
