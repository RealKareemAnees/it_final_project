import { promises as fs } from "fs";
import { join } from "path";
import { Session } from "../types/user";

const DATA_DIR = join(__dirname, "../../data");
const SESSIONS_FILE = join(DATA_DIR, "sessions.json");

// Helper to read sessions from file
async function readSessions(): Promise<Session[]> {
  try {
    const content = await fs.readFile(SESSIONS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

// Helper to write sessions to file
async function writeSessions(sessions: Session[]): Promise<void> {
  await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2), "utf-8");
}

// Creates a session document that links a user to a generated session id.
export async function createSession(
  userId: string,
  sessionId: string,
): Promise<void> {
  const sessions = await readSessions();
  sessions.push({
    userId,
    sessionId,
    createdAt: Date.now(),
  });
  await writeSessions(sessions);
}

// Retrieves a stored session by its session id.
export async function getSession(sessionId: string): Promise<Session | null> {
  const sessions = await readSessions();
  return sessions.find((s) => s.sessionId === sessionId) || null;
}

// Deletes a session document when a user logs out.
export async function deleteSession(sessionId: string): Promise<void> {
  const sessions = await readSessions();
  const filtered = sessions.filter((s) => s.sessionId !== sessionId);
  await writeSessions(filtered);
}
