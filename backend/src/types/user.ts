export interface User {
  _id?: string; // MongoDB ObjectId as string
  username: string;
  password: string;
  wishList: string[];
  theme: "light" | "dark";
  role?: "user" | "admin";
}

export interface Session {
  _id?: string;
  userId: string;
  sessionId: string;
  createdAt: number;
}

export interface Feedback {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: number;
}
