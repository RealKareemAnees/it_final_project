import { IncomingMessage, ServerResponse } from "http";

// Page routes are intentionally disabled — backend only exposes API endpoints.
export async function handlePageRoutes(
  _req: IncomingMessage,
  _res: ServerResponse,
  _urlPath: string,
  _method: string,
): Promise<boolean> {
  return false;
}
