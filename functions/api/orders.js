// Intentionally disabled until a payment provider is integrated and verified.
// Never create/confirm a Printful order merely because a browser sends a checkout request.
export async function onRequestPost() {
  return Response.json({
    error: "Checkout is not active yet.",
    message: "Connect and verify a payment provider before enabling paid orders."
  }, { status: 501 });
}