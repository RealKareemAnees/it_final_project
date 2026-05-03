import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/users", usersRouter);

  app.get("/", (req, res) =>
    res.json({ ok: true, service: "it-final-backend" }),
  );

  return app;
}

export default createApp;
