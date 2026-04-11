## 🛠 Complete Shopify Configuration Guide (For 100% Real Data)

To ensure this storefront displays real data instead of placeholders, the following configurations must be set up in your Shopify Admin dashboard.

### 1. Products & Variants (Products section)

- **Bestseller Badge:** Add the exact tag `Bestseller` (case-insensitive) to any product you want to feature with the maroon bestseller badge on product cards.
- **Variant Pills (Size/Quantity):** Ensure your product options are named clearly, exactly as `Quantity`, `Size`, or `Weight` (e.g., Option Name: Size, Option Value: `100g`, `500ml`). The site code automatically grabs these variant values for display on the pink pill below product images.
- **Media Content:**
  - The first image uploaded acts as the primary card image.
  - To feature a product in the homepage "Our Products in Real Life" section, you **must attach at least one Video** to the product media in Shopify.

### 2. Collections (Shop By Category & Concern)

- **Collection Images:** Every collection must have a "Collection Image" assigned in the Shopify Admin. The Mega Menu and Mobile "Shop By" sections rely on these cover images for their high-fidelity cards.
- **Auto-Categorization Logic in Menus:**
  - The site automatically ignores any collection named exactly "All".
  - The first **8 active collections** (alphabetical or based on your custom sorting) are displayed under the **"Shop By Category"** mega menu.
  - The next **8 active collections** (collections 9 through 16) are automatically grouped under the **"Shop By Concern"** mega menu.
  - _Tip:_ Use Shopify's manual sorting to control exactly which collections appear where.
- **Certifications (Homepage):** Create a specific collection with the exact handle `certifiedbadge`. Add your certification logos (like FDA, GMP, ISO, Halal) to this collection as products/images. The homepage fetches from this specific collection to build the certifications slider.

### 3. Pages (Static Content & Hero Text)

Navigate to **Online Store > Pages** and create pages with the following exact handles to control major text areas dynamically:

- **`home`**: The 'Title' and 'Content' of this page populate the primary Hero Banner text on the homepage.
- **`why-aarshaveda`**: Populates the descriptive text for the "Why Aarshaveda" interactive product breakdown section.
- **`retreat`**: Populates the text overlay for the "Sacred Lotus Retreat" atmospheric banner at the bottom of the homepage.
- **`about`**: The main content populates the immersive "/about" page (The Story, The Process, B2B services, etc).

### 4. Blogs (Testimonials / Customer Reviews)

To populate the Testimonials slider on the homepage:

- Navigate to **Online Store > Blog Posts > Manage Blogs** and create a new blog with the exact handle `testimonials`.
- **Add Reviews:** Create a new "Article" within this blog for every customer review.
  - **Article Title:** Use this for the Customer's Name (e.g., "Priya Verma").
  - **Article Content:** Use this for the actual review text. (HTML formatting is fully supported).

### 5. Metaobjects (Ayurvedic Experts / Doctors)

The "Ayurvedic Experts" section is powered by a highly structured Shopify Metaobject (not a basic blog), ensuring a clean and professional layout.

- Navigate to **Settings > Custom Data > Metaobjects** and create a new definition.
- **Type Name / Handle:** `expert`
- **Required Fields (Add these exactly):**
  - `name`: (Type: Single line text) - e.g., "Dr. Aditi Sharma"
  - `designation`: (Type: Single line text) - e.g., "BAMS, MD (Ayurveda)"
  - `image`: (Type: File) - Upload a high-resolution portrait image.
  - `bio`: (Type: Multi-line text - optional) - Useful for future dedicated expert detail pages.
- After creating the definition, go to **Content > Metaobjects** in your Shopify Admin, select `expert`, and add your doctor profiles.

### 6. Navigation (Menus)

- Navigate to **Online Store > Navigation** and ensure a menu exists with the exact handle `customer-account-main-menu`.
- This exact menu dictates the primary links shown in the mobile hamburger menu and secondary header links (like About, Blog, Contact, etc.). The dynamic "Shop By" dropdowns are handled entirely automatically by the collections logic mentioned above in Step 2.

### 7. Newsletter Integrations

- The footer newsletter signup form is fully functional. It uses a Next.js Server Action to securely submit data directly to Shopify's underlying `/contact` API.
- **No extra config needed:** When a user signs up, their email is automatically added to your **Customers** list in Shopify, tagged instantly with `newsletter`. Ensure your Shopify Storefront API has customer permissions enabled.

> **Technical Note:** Because the site uses advanced Next.js caching for extreme performance, changes made in the Shopify Admin might take a few minutes to reflect on the live storefront unless an on-demand revalidation webhook is triggered.

---

EC2 Setup Steps:

1. Launch EC2 — Ubuntu 22.04, t3.small or higher, open ports 22/80/443
2. SSH in and run: bash scripts/ec2-setup.sh
3. Copy nginx.conf and configure your domain
4. Add GitHub Secrets in your repo settings:

┌─────────────────────────────────┬────────────────────────────┐
│ Secret │ Value │
├─────────────────────────────────┼────────────────────────────┤
│ EC2_HOST │ Your EC2 public IP │
├─────────────────────────────────┼────────────────────────────┤
│ EC2_USER │ ubuntu │
├─────────────────────────────────┼────────────────────────────┤
│ EC2_SSH_KEY │ Contents of your .pem file │
├─────────────────────────────────┼────────────────────────────┤
│ COMPANY_NAME │ Aarshaveda LLC │
├─────────────────────────────────┼────────────────────────────┤
│ SITE_NAME │ Aarshaveda │
├─────────────────────────────────┼────────────────────────────┤
│ SHOPIFY_REVALIDATION_SECRET │ From Shopify │
├─────────────────────────────────┼────────────────────────────┤
│ SHOPIFY_STOREFRONT_ACCESS_TOKEN │ From Shopify │
├─────────────────────────────────┼────────────────────────────┤
│ SHOPIFY_STORE_DOMAIN │ arshavedaa.myshopify.com │
└─────────────────────────────────┴────────────────────────────┘

5. Push to main — GitHub Actions will build, ship Docker image to EC2, and deploy automatically.
6. SSL: sudo certbot --nginx -d your-domain.com

Verifast chatbot will work because the bridge handles postMessage communication and the Nginx proxy passes all headers correctly.
