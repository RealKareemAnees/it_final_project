import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

// Opens the MongoDB connection once and reuses the cached database instance.
export async function connectToDatabase() {
  if (dbInstance) return dbInstance;

  client = new MongoClient("mongodb://localhost:27017/it_project");
  await client.connect();
  dbInstance = client.db();
  return dbInstance;
}

// Returns the active database handle and fails fast if initialization has not happened yet.
export function getDb() {
  if (!dbInstance) {
    throw new Error("Database not connected. Call connectToDatabase first.");
  }

  return dbInstance;
}

// Closes the MongoDB client and clears the cached connection state.
export async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    dbInstance = null;
  }
}
