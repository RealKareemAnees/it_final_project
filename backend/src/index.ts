import server from "./server";
import { connectToDatabase, createUser, getUserInfoByUsername } from "./db";

// Starts the application by connecting to the database, ensuring an admin user exists, and then listening for traffic.
async function startServer() {
  try {
    // Connects to MongoDB before any route handler tries to use it.
    await connectToDatabase();

    // Looks up the default admin account so it can be created only once.
    const adminUser = await getUserInfoByUsername("admin");
    if (!adminUser) {
      // Inserts the built-in admin user when the database does not have one yet.
      await createUser({
        username: "admin",
        password: "admin",
        wishList: [],
        theme: "light",
        role: "admin",
      });
    }

    // Logs the server URL once the HTTP listener is ready.
    const handleListen = () => {
      console.log("Server is running on http://localhost:3000");
    };

    // Starts listening for incoming HTTP requests on port 3000.
    server.listen(3000, handleListen);
  } catch (error) {
    // Reports startup failures instead of crashing silently.
    console.error("Failed to start server:", error);
  }
}

startServer();
