# THREADVY — Custom Printful Store

Premium black-and-white T-shirt storefront starter for men's and women's collections.

## Included
- Responsive editorial storefront, brand story, men's/women's grids, offers, best sellers, cart UI and policy pages.
- Cloudflare Pages Functions backend.
- `GET /api/products` reads published Printful Sync Products using a server-side secret.
- The storefront does not collect payments. Each BUY NOW button redirects to the product-specific Printful Quick Store URL configured by you.
- AdSense script placeholder; approval and ad placement are not automatic.

## Important security action
The Printful token previously pasted into chat should be treated as exposed. Revoke it in Printful and create a fresh private token. Do not paste the new token into HTML, JavaScript, GitHub, or chat. Store it only as the encrypted Cloudflare secret `PRINTFUL_TOKEN`.

For a Printful Manual order/API store, create a store in Printful and create a private token scoped to that store. For catalog reads, grant the required product-read scope (and `sync_products` if managing Sync Products). Add order permissions only when the paid checkout flow is implemented. Printful docs: https://developers.printful.com/docs/

## Deploy free on Cloudflare Pages
1. Put this folder in a GitHub repository.
2. In Cloudflare Dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository. Framework preset: **None**. Build command: leave blank. Build output directory: `public`.
4. Deploy. Cloudflare assigns a `*.pages.dev` address. Rename the project to `threadvy` if available to use `https://threadvy.pages.dev`.
5. Open the Pages project → **Settings → Variables and Secrets** → add encrypted secret:
   - Name: `PRINTFUL_TOKEN`
   - Value: your newly generated token
6. Redeploy. Test `https://YOUR-SITE.pages.dev/api/health` and `/api/products`.

Cloudflare Pages Functions run from the root `functions/` folder. Static assets are served from `public/`.

## Connect Printful products
1. In Printful Dashboard → Stores, create/connect a **Manual order / API** store.
2. Publish products and variants to that store. A Manual/API store does not automatically publish a public storefront; this site reads its product feed through the API.
3. Create a private token for that store and keep it in Cloudflare as `PRINTFUL_TOKEN`.
4. Ensure each product has synced variants and retail prices. Product display mapping in `functions/api/products.js` is a starter and may need adjusting to match the exact Printful product payload and your product naming/category conventions.

## Ads / Google AdSense
- Replace `ca-pub-REPLACE_WITH_YOUR_ID` in `public/index.html` only after AdSense gives you your publisher ID.
- Add ad units only after the site is approved; use the exact code generated in AdSense.
- Publish original useful content, real contact details, privacy/cookie disclosures and accurate shipping/returns policies. Approval is not guaranteed. A free subdomain may be less straightforward for verification/approval; follow the site-ownership instructions shown in your AdSense account.
- Never click your own ads or ask others to click them.

## BUY NOW redirects to Printful
Important: a Printful Manual/API store is not itself a public customer checkout. Printful's own hosted buyer-facing option is Quick Stores. Create/publish the products in a Printful Quick Store, then copy each product's public product URL.

In Cloudflare Pages → Settings → Variables and Secrets, add a plain-text variable named `PRINTFUL_PRODUCT_LINKS` containing a JSON object mapping each Printful Sync Product ID to its matching Quick Store product URL. Example (replace IDs and URLs with your real values):

```json
{"123456789":"https://YOUR-PRINTFUL-QUICK-STORE-LINK/product/your-tee","987654321":"https://YOUR-PRINTFUL-QUICK-STORE-LINK/product/another-tee"}
```

The API endpoint reads the Printful catalogue and attaches the corresponding external URL. The BUY NOW button opens that URL in a new tab. If a product has no URL configured, the site displays a reminder instead of sending shoppers to a broken destination. Re-deploy after adding/updating the variable.

This setup uses Printful's API for product catalogue data and Printful Quick Store for buyer checkout. It does not create a custom checkout or place orders from your site.

## Product content
The initial product cards and customer reviews are demo content. Replace demo prices, images, size availability and sample reviews with accurate product information and verified customer reviews before launch. The live Printful product feed will show products published to your API store. Assign a valid Quick Store product URL to every product you want customers to buy.

## Local preview
For a quick visual preview, extract the ZIP and open `public/index.html` in your browser; the CSS and JavaScript now use relative paths and will load from the folder. Product API calls require deployment (or Wrangler), so local `file://` preview uses demo products. For full API testing, use a static server for the `public/` folder. To test Functions locally, use Wrangler Pages dev with a local `.dev.vars` file containing a fresh test token. Never commit `.dev.vars`.
