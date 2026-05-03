import { createServer, IncomingMessage, ServerResponse } from "http";
import { sendJSON } from "./lib/http";
import { handlePageRoutes } from "./routes/pages";
import { handleAuthRoutes } from "./routes/auth";
import { handleUserRoutes } from "./routes/users";
import { handleAdminRoutes } from "./routes/admin";
import { handleContactRoutes } from "./routes/contact";
import { handleCarRoutes } from "./routes/cars";

// Routes each request through the page, auth, user, admin, contact, and car handlers in order.
async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  // Normalizes the URL and HTTP method so route matching can be consistent.
  const url = req.url || "";
  const method = req.method || "";
  const urlPath = url.split("?")[0];

  try {
    // Gives the page router first chance to serve HTML pages.
    if (await handlePageRoutes(req, res, urlPath, method)) return;
    // Routes authentication requests next because they establish sessions.
    if (await handleAuthRoutes(req, res, urlPath, method)) return;
    // Handles user profile and wishlist requests after auth.
    if (await handleUserRoutes(req, res, urlPath, method)) return;
    // Handles admin-only API requests after the user routes.
    if (await handleAdminRoutes(req, res, urlPath, method)) return;
    // Handles public contact-form submissions.
    if (await handleContactRoutes(req, res, urlPath, method)) return;
    // Handles car listing and CRUD routes last in the chain.
    if (await handleCarRoutes(req, res, urlPath, method, url)) return;

    // Returns a 404 response when no route matches.
    sendJSON(res, { error: "Not Found" }, 404);
  } catch (error) {
    // Logs unexpected route-handler failures for server-side debugging.
    console.error("Error:", error);
    // Sends a safe error message to the client.
    sendJSON(
      res,
      { error: error instanceof Error ? error.message : "Internal error" },
      500,
    );
  }
}

// Creates the shared HTTP server with the unified request handler.
const server = createServer(handleRequest);

export default server;
