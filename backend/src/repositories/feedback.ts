import { promises as fs } from "fs";
import { join } from "path";
import { Feedback } from "../types/user";

const DATA_DIR = join(__dirname, "../../data");
const FEEDBACK_FILE = join(DATA_DIR, "feedback.json");

// Helper to read feedback from file
async function readFeedback(): Promise<Feedback[]> {
  try {
    const content = await fs.readFile(FEEDBACK_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

// Helper to write feedback to file
async function writeFeedback(feedback: Feedback[]): Promise<void> {
  await fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedback, null, 2), "utf-8");
}

// Stores a contact form submission in the feedback collection.
export async function addFeedback(feedback: Feedback): Promise<void> {
  const feedbacks = await readFeedback();
  const { _id, ...feedbackToInsert } = feedback;
  feedbacks.push(feedbackToInsert as Feedback);
  await writeFeedback(feedbacks);
}

// Loads every stored feedback entry.
export async function getAllFeedback(): Promise<Feedback[]> {
  return readFeedback();
}
