import { IncomingMessage, ServerResponse } from "http";
import { join } from "path";
import { getAuthenticatedUser, requireAdmin } from "../lib/auth";
import { redirect, serveHTML } from "../lib/http";

// Builds the absolute path for a file in the public directory.
function publicFilePath(fileName: string): string {
  return join(process.cwd(), "public", fileName);
}

// Serves the correct static page for browser routes and guards protected pages.
export async function handlePageRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  urlPath: string,
  method: string,
): Promise<boolean> {
  if (urlPath === "/" && method === "GET") {
    serveHTML(res, publicFilePath("index.html"));
    return true;
  }

  if (urlPath === "/login" && method === "GET") {
    serveHTML(res, publicFilePath("login.html"));
    return true;
  }

  if (urlPath === "/register" && method === "GET") {
    serveHTML(res, publicFilePath("register.html"));
    return true;
  }

  if (urlPath === "/dashboard" && method === "GET") {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      redirect(res, "/login");
      return true;
    }

    serveHTML(res, publicFilePath("dashboard.html"));
    return true;
  }

  if (urlPath === "/profile" && method === "GET") {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      redirect(res, "/login");
      return true;
    }

    serveHTML(res, publicFilePath("profile.html"));
    return true;
  }

  if (urlPath === "/contact" && method === "GET") {
    serveHTML(res, publicFilePath("contact.html"));
    return true;
  }

  if (urlPath === "/admin-dashboard" && method === "GET") {
    const user = await requireAdmin(req);
    if (!user) {
      redirect(res, "/dashboard");
      return true;
    }

    serveHTML(res, publicFilePath("admin-dashboard.html"));
    return true;
  }

  if (urlPath === "/manage-cars" && method === "GET") {
    const user = await requireAdmin(req);
    if (!user) {
      redirect(res, "/dashboard");
      return true;
    }

    serveHTML(res, publicFilePath("cars-manage.html"));
    return true;
  }

  return false;
}
