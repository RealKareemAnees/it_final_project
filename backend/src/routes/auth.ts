import { randomUUID } from "crypto";
import { IncomingMessage, ServerResponse } from "http";
import { createSession, deleteSession } from "../repositories/sessions";
import { createUser, getUserInfoByUsername } from "../repositories/users";
import { safeUser } from "../lib/auth";
import { parseBody, sendJSON, setCookie, getCookie } from "../lib/http";
import { User } from "../types/user";

// Handles registration, login, and logout endpoints.
export async function handleAuthRoutes(
  req: IncomingMessage,
  res: ServerResponse,
  urlPath: string,
  method: string,
): Promise<boolean> {
  if (urlPath === "/api/auth/register" && method === "POST") {
    // Reads the JSON payload that contains the registration credentials.
    const body = await parseBody(req);
    const { username, password } = body;

    if (!username || !password) {
      // Rejects the request when either required credential is missing.
      sendJSON(res, { error: "Username and password required" }, 400);
      return true;
    }

    // Checks whether the username already exists before creating a new account.
    const existingUser = await getUserInfoByUsername(username);
    if (existingUser) {
      // Prevents duplicate accounts with the same username.
      sendJSON(res, { error: "User already exists" }, 409);
      return true;
    }

    const newUser: User = {
      username,
      password,
      wishList: [],
      theme: "light",
      role: "user",
    };

    // Persists the newly created user record.
    await createUser(newUser);

    // Generates a unique session identifier for the new login state.
    const sessionId = randomUUID();
    // Stores the session so the server can recognize this user later.
    await createSession(username, sessionId);
    // Sends the session cookie back to the browser.
    setCookie(res, "sessionId", sessionId);

    // Returns the safe user object without the password field.
    sendJSON(res, { success: true, user: safeUser(newUser) });
    return true;
  }

  if (urlPath === "/api/auth/login" && method === "POST") {
    // Reads the JSON payload that contains the login credentials.
    const body = await parseBody(req);
    const { username, password } = body;

    if (!username || !password) {
      // Rejects the request when either required credential is missing.
      sendJSON(res, { error: "Username and password required" }, 400);
      return true;
    }

    // Looks up the matching user record for the supplied username.
    const user = await getUserInfoByUsername(username);
    if (!user || user.password !== password) {
      // Rejects invalid credentials before issuing a session.
      sendJSON(res, { error: "Invalid credentials" }, 401);
      return true;
    }

    // Generates a fresh session id for the authenticated user.
    const sessionId = randomUUID();
    // Saves the session so subsequent requests can be authenticated.
    await createSession(username, sessionId);
    // Sends the session cookie back to the browser.
    setCookie(res, "sessionId", sessionId);

    // Returns the authenticated user without the password.
    sendJSON(res, { success: true, user: safeUser(user) });
    return true;
  }

  if (urlPath === "/api/auth/logout" && method === "POST") {
    // Reads the session cookie so the server can invalidate it.
    const sessionId = getCookie(req, "sessionId");
    if (sessionId) {
      // Deletes the stored session only when one exists.
      await deleteSession(sessionId);
    }

    // Clears the cookie in the browser and confirms logout.
    res.setHeader("Set-Cookie", "sessionId=; Path=/; Max-Age=0");
    sendJSON(res, { success: true });
    return true;
  }

  return false;
}
