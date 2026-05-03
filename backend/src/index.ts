import createApp from "./server";
import { connectToDatabase } from "./db";
import { PORT } from "./config";

async function main() {
  const app = createApp();
  await connectToDatabase();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});
