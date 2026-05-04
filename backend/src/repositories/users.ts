import { getDb } from "../database";
import { User } from "../types/user";

// Loads a user record by username.
export async function getUserInfoByUsername(
  username: string,
): Promise<User | null> {
  const db = getDb();
  const user = await db.collection("users").findOne({ username });
  return user as unknown as User | null;
}

// Inserts a new user record while stripping the MongoDB identifier field.
export async function createUser(user: User): Promise<void> {
  const db = getDb();
  const { _id, ...userToInsert } = user;
  await db.collection("users").insertOne(userToInsert);
}

// Updates the stored theme preference for a user.
export async function updateUserTheme(
  username: string,
  theme: "light" | "dark",
): Promise<void> {
  const db = getDb();
  await db.collection("users").updateOne({ username }, { $set: { theme } });
}

// Appends a value to the user's wishlist array.
export async function addToWishList(
  username: string,
  item: string,
): Promise<void> {
  const db = getDb();
  await db
    .collection("users")
    .updateOne({ username }, { $push: { wishList: item } });
}

// Removes a value from the user's wishlist array.
export async function removeFromWishList(
  username: string,
  item: string,
): Promise<void> {
  const db = getDb();
  await db
    .collection("users")
    .updateOne({ username }, { $pull: { wishList: item } });
}

// Applies a partial update to the stored user record.
export async function updateUser(
  username: string,
  updates: Partial<User>,
): Promise<void> {
  const db = getDb();
  await db.collection("users").updateOne({ username }, { $set: updates });
}

// Deletes a user record entirely.
export async function deleteUserByUsername(username: string): Promise<void> {
  const db = getDb();
  await db.collection("users").deleteOne({ username });
}

// Loads every user record from the database.
export async function getAllUsers(): Promise<User[]> {
  const db = getDb();
  const users = await db.collection("users").find().toArray();
  return users as unknown as User[];
}
