import { onRequestGet as __api_health_js_onRequestGet } from "C:\\Users\\user\\Downloads\\THREADVY-Printful-Redirect-Store\\THREADVY-Store\\functions\\api\\health.js"
import { onRequestPost as __api_orders_js_onRequestPost } from "C:\\Users\\user\\Downloads\\THREADVY-Printful-Redirect-Store\\THREADVY-Store\\functions\\api\\orders.js"
import { onRequestGet as __api_products_js_onRequestGet } from "C:\\Users\\user\\Downloads\\THREADVY-Printful-Redirect-Store\\THREADVY-Store\\functions\\api\\products.js"

export const routes = [
    {
      routePath: "/api/health",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_health_js_onRequestGet],
    },
  {
      routePath: "/api/orders",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_orders_js_onRequestPost],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_products_js_onRequestGet],
    },
  ]