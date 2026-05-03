import { getDb } from "../database";
import { Session } from "../types/user";

// Creates a session document that links a user to a generated session id.
export async function createSession(
  userId: string,
  sessionId: string,
): Promise<void> {
  const db = getDb();
  await db.collection("sessions").insertOne({
    userId,
    sessionId,
    createdAt: Date.now(),
  });
}

// Retrieves a stored session by its session id.
export async function getSession(sessionId: string): Promise<Session | null> {
  const db = getDb();
  const session = await db.collection("sessions").findOne({ sessionId });
  return session as unknown as Session | null;
}

// Deletes a session document when a user logs out.
export async function deleteSession(sessionId: string): Promise<void> {
  const db = getDb();
  await db.collection("sessions").deleteOne({ sessionId });
}
