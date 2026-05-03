import { IncomingMessage } from "http";
import { User } from "../types/user";
import { getSession } from "../repositories/sessions";
import { getUserInfoByUsername } from "../repositories/users";
import { getCookie } from "./http";

// Removes the password field before returning user data to the client.
export function safeUser(user: User | null) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

// Checks whether the supplied user should be treated as an administrator.
export function isAdmin(user: User | null): boolean {
  return Boolean(user && (user.username === "admin" || user.role === "admin"));
}

// Resolves the current signed-in user from the session cookie, if one exists.
export async function getAuthenticatedUser(
  req: IncomingMessage,
): Promise<User | null> {
  const sessionId = getCookie(req, "sessionId");
  if (!sessionId) return null;

  const session = await getSession(sessionId);
  if (!session) return null;

  const user = await getUserInfoByUsername(session.userId);
  return user;
}

// Returns the authenticated user only when that user has admin privileges.
export async function requireAdmin(req: IncomingMessage): Promise<User | null> {
  const user = await getAuthenticatedUser(req);
  if (!isAdmin(user)) return null;
  return user;
}
