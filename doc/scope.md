PROJECT: Multi-Company Product Extraction System

1. Target Websites
   - E-commerce websites only
   - Platforms may include Shopify, WooCommerce, custom HTML
   - No blogs, forums, or service-only sites

2. Multi-Company Support
   - System must support multiple companies
   - Each company has isolated product data
   - Scraping config is per company

3. Technology Stack
   - Backend: Node.js (primary)
   - Scraping: Python or Node.js (best-fit)
   - Database (temporary): MySQL
   - Database (final): MongoDB

4. Product Data Ownership
   - Scraped data is read-only
   - Admin can activate/deactivate products
   - Price source is always the company website

5. Non-Goals (Explicitly Out of Scope)
   - Order processing
   - Payment gateways
   - User reviews scraping
   - Inventory prediction
