import { IncomingMessage, ServerResponse } from "http";
import { getAllFeedback } from "../repositories/feedback";
import { requireAdmin } from "../lib/auth";
import { sendJSON } from "../lib/http";

// Handles admin-only API routes.
export async function handleAdminRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  urlPath: string,
  method: string,
): Promise<boolean> {
  if (urlPath === "/api/admin/feedback" && method === "GET") {
    const admin = await requireAdmin(req);
    if (!admin) {
      sendJSON(res, { error: "Admin only" }, 403);
      return true;
    }

    const feedback = await getAllFeedback();
    sendJSON(res, { feedback });
    return true;
  }

  return false;
}
