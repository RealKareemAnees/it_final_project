import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db";
import { User } from "../types/user";

const router = Router();
const COLLECTION = "users";

router.get("/", async (req, res) => {
  const db = getDb();
  const users = await db.collection(COLLECTION).find().toArray();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  try {
    const user = await db
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid id" });
  }
});

router.post("/", async (req, res) => {
  const data = req.body as Partial<User>;
  if (!data.name || !data.email)
    return res.status(400).json({ message: "name and email required" });
  const db = getDb();
  const result = await db
    .collection(COLLECTION)
    .insertOne({ name: data.name, email: data.email, age: data.age });
  const inserted = await db
    .collection(COLLECTION)
    .findOne({ _id: result.insertedId });
  res.status(201).json(inserted);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body as Partial<User>;
  const db = getDb();
  try {
    const result = await db
      .collection(COLLECTION)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: "after" },
      );
    if (!result.value)
      return res.status(404).json({ message: "User not found" });
    res.json(result.value);
  } catch (err) {
    res.status(400).json({ message: "Invalid id" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  try {
    const result = await db
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Invalid id" });
  }
});

export default router;
