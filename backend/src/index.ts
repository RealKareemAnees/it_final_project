import server from "./server";
import { connectToDatabase } from "./db";

async function startServer() {
  try {
    await connectToDatabase();
    server.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
