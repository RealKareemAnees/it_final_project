import { promises as fs } from "fs";
import { join } from "path";
import { User } from "../types/user";

const DATA_DIR = join(__dirname, "../../data");
const USERS_FILE = join(DATA_DIR, "users.json");

// Helper to read users from file
async function readUsers(): Promise<User[]> {
  try {
    const content = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

// Helper to write users to file
async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

// Loads a user record by username.
export async function getUserInfoByUsername(
  username: string,
): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.username === username) || null;
}

// Inserts a new user record while stripping the MongoDB identifier field.
export async function createUser(user: User): Promise<void> {
  const users = await readUsers();
  const { _id, ...userToInsert } = user;
  users.push(userToInsert as User);
  await writeUsers(users);
}

// Updates the stored theme preference for a user.
export async function updateUserTheme(
  username: string,
  theme: "light" | "dark",
): Promise<void> {
  const users = await readUsers();
  const user = users.find((u) => u.username === username);
  if (user) {
    user.theme = theme;
    await writeUsers(users);
  }
}

// Appends a value to the user's wishlist array.
export async function addToWishList(
  username: string,
  item: string,
): Promise<void> {
  const users = await readUsers();
  const user = users.find((u) => u.username === username);
  if (user && !user.wishList.includes(item)) {
    user.wishList.push(item);
    await writeUsers(users);
  }
}

// Removes a value from the user's wishlist array.
export async function removeFromWishList(
  username: string,
  item: string,
): Promise<void> {
  const users = await readUsers();
  const user = users.find((u) => u.username === username);
  if (user) {
    user.wishList = user.wishList.filter((i) => i !== item);
    await writeUsers(users);
  }
}

// Applies a partial update to the stored user record.
export async function updateUser(
  username: string,
  updates: Partial<User>,
): Promise<void> {
  const users = await readUsers();
  const user = users.find((u) => u.username === username);
  if (user) {
    Object.assign(user, updates);
    await writeUsers(users);
  }
}

// Deletes a user record entirely.
export async function deleteUserByUsername(username: string): Promise<void> {
  const users = await readUsers();
  const filtered = users.filter((u) => u.username !== username);
  await writeUsers(filtered);
}

// Loads every user record from the database.
export async function getAllUsers(): Promise<User[]> {
  return readUsers();
}
