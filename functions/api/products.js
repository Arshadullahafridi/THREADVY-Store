export async function onRequestGet({ env }) {
  if (!env.PRINTFUL_TOKEN) {
    return Response.json({ products: [], source: "demo-fallback", message: "Printful API token is not configured." });
  }
  try {
    const response = await fetch("https://api.printful.com/store/products", {
      headers: { Authorization: `Bearer ${env.PRINTFUL_TOKEN}` }
    });
    if (!response.ok) throw new Error(`Printful returned ${response.status}`);
    const payload = await response.json();
    // Printful's Manual/API store is a product/fulfilment API, not a hosted public checkout.
    // Add each public Printful Quick Store product URL here via the Cloudflare variable below.
    let links = {};
    try { links = JSON.parse(env.PRINTFUL_PRODUCT_LINKS || "{}"); } catch { links = {}; }
    const products = (payload.result || []).map((item, index) => {
      const variants = item.sync_variants || [];
      const first = variants[0] || {};
      const product = item.sync_product || item;
      const files = first.files || [];
      const id = String(product.id || item.id);
      const sizeNames = variants.map(v => v.name?.match(/\b(XS|S|M|L|XL|2XL|3XL)\b/)?.[0]).filter(Boolean);
      return {
        id,
        name: product.name || "THREADVY T-shirt",
        description: product.name ? `${product.name} — made to order by Printful.` : "Made-to-order THREADVY essential.",
        price: Number(first.retail_price || 0),
        image: first.product?.image || files[0]?.preview_url || product.thumbnail_url || "",
        sizes: [...new Set(sizeNames)],
        category: /women|crop|fem/i.test(product.name || "") ? "women" : "men",
        tag: index === 0 ? "PRINTFUL" : "MADE TO ORDER",
        buyUrl: typeof links[id] === "string" ? links[id] : ""
      };
    }).filter(p => p.price > 0);
    return Response.json({ products, source: "printful" }, {
      headers: { "Cache-Control": "public, max-age=120" }
    });
  } catch (error) {
    return Response.json({ error: "Could not load the Printful catalogue.", detail: error.message }, { status: 502 });
  }
}