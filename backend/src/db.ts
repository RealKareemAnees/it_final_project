import { MongoClient, Db, MongoClientOptions } from "mongodb";
import { MONGODB_URI } from "./config";

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

export async function connectToDatabase() {
  if (dbInstance) return dbInstance;
  if (!MONGODB_URI) throw new Error("MONGODB_URI not set in environment");

  client = new MongoClient(MONGODB_URI as string);
  await client.connect();
  dbInstance = client.db();
  return dbInstance;
}

export function getDb() {
  if (!dbInstance)
    throw new Error("Database not connected. Call connectToDatabase first.");
  return dbInstance;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    dbInstance = null;
  }
}
