import { IncomingMessage, ServerResponse } from "http";
import { addFeedback } from "../repositories/feedback";
import { parseBody, sendJSON } from "../lib/http";

// Handles contact form submissions from the public site.
export async function handleContactRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  urlPath: string,
  method: string,
): Promise<boolean> {
  if (urlPath === "/api/contact" && method === "POST") {
    const body = await parseBody(req);
    const { name, email, message } = body;

    if (!name || !email || !message) {
      sendJSON(res, { error: "Name, email, and message are required" }, 400);
      return true;
    }

    await addFeedback({
      name,
      email,
      message,
      createdAt: Date.now(),
    });

    sendJSON(res, { success: true });
    return true;
  }

  return false;
}
