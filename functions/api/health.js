export async function onRequestGet() {
  return Response.json({ ok: true, service: "THREADVY", printfulConfigured: false }, {
    headers: { "Cache-Control": "no-store" }
  });
}