import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db";
import app from "./app";
import { seedAdmin } from "./seed/seedAdmin";
import { seedRoles } from "./seed/seedRoles";

connectDB();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Seed admin user first 
  await seedAdmin();
  await seedRoles();
  app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
}



startServer();