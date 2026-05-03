import { MongoClient, Db, MongoClientOptions } from "mongodb";

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

export async function connectToDatabase() {
  if (dbInstance) return dbInstance;

  client = new MongoClient("mongodb://localhost:27017/it_final_db" as string);
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
