import { IncomingMessage, ServerResponse } from "http";
import { readFileSync } from "fs";

// Reads and parses the request body as JSON, or resolves to an empty object when no body is sent.
export function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";

    // Appends each incoming data chunk to the buffered body string.
    const handleData = (chunk: string) => {
      body += chunk;
    };

    // Parses the buffered body once the request has finished streaming.
    const handleEnd = () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    };

    // Propagates stream errors to the returned promise.
    const handleError = (error: Error) => {
      reject(error);
    };

    req.on("data", handleData);
    req.on("end", handleEnd);
    req.on("error", handleError);
  });
}

// Writes a cookie header with a fixed HttpOnly path-scoped session style.
export function setCookie(
  res: ServerResponse,
  name: string,
  value: string,
  maxAge = 3600000,
): void {
  res.setHeader(
    "Set-Cookie",
    `${name}=${value}; HttpOnly; Path=/; Max-Age=${Math.floor(maxAge / 1000)}`,
  );
}

// Pulls a named cookie value from the request headers.
export function getCookie(req: IncomingMessage, name: string): string | null {
  const cookies = req.headers.cookie?.split(";") || [];
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) return value;
  }

  return null;
}

// Sends a JSON response with the provided status code.
export function sendJSON(res: ServerResponse, data: any, status = 200): void {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Serves a static HTML file and falls back to a 404 page when the file is missing.
export function serveHTML(res: ServerResponse, filePath: string): void {
  try {
    const content = readFileSync(filePath, "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }
}

// Redirects the client to a different location using the provided status code.
export function redirect(
  res: ServerResponse,
  location: string,
  status = 302,
): void {
  res.writeHead(status, { Location: location });
  res.end();
}
