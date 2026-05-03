import { getDb } from "../database";
import { Feedback } from "../types/user";

// Stores a contact form submission in the feedback collection.
export async function addFeedback(feedback: Feedback): Promise<void> {
  const db = getDb();
  const { _id, ...feedbackToInsert } = feedback;
  await db.collection("feedback").insertOne(feedbackToInsert);
}

// Loads every stored feedback entry.
export async function getAllFeedback(): Promise<Feedback[]> {
  const db = getDb();
  const feedback = await db.collection("feedback").find().toArray();
  return feedback as unknown as Feedback[];
}
