import { promises as fs } from "fs";
import { join } from "path";

const DATA_DIR = join(__dirname, "../data");

// Initialize database by ensuring data directory and files exist
export async function connectToDatabase() {
  try {
    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Initialize empty JSON files if they don't exist
    const files = ["users.json", "cars.json", "sessions.json", "feedback.json"];
    for (const file of files) {
      const filePath = join(DATA_DIR, file);
      try {
        await fs.access(filePath);
      } catch {
        // File doesn't exist, create it with empty array
        await fs.writeFile(filePath, "[]", "utf-8");
      }
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

// Cleanup function (no-op for file-based storage)
export async function closeDatabase() {
  // No cleanup needed for file-based storage
}

// Minimal getDb for backwards compatibility
export function getDb() {
  throw new Error(
    "Direct database access is deprecated. Use repository functions instead.",
  );
}
