import server from "./server";
import { connectToDatabase, createUser, getUserInfoByUsername } from "./db";
import { seedCars } from "./seed/cars";
import { getAllCars, addCar } from "./repositories/cars";

// Starts the application by connecting to the database, ensuring an admin user exists, and then listening for traffic.
async function startServer() {
  try {
    // Initializes the file-based database and ensures data directory exists.
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

    // Seeds initial cars so the browse page isn't empty on first run.
    const existingCars = await getAllCars();
    if (existingCars.length === 0) {
      for (const car of seedCars) {
        await addCar(car);
      }
      console.log(`Seeded ${seedCars.length} cars`);
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
