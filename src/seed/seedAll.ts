import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedAdmin } from "./seedAdmin";
import { seedCategories } from "./seedCategory";

dotenv.config();

const startSeed = async () => {
  try {
    console.log("🚀 Starting seeding...");

    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected");

    await seedCategories();

    await seedAdmin();

    console.log("🎉 Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

startSeed();


// When the Role, user, userRole crud was complete we should contoinues with Product and order order item.
// In user crud may have pagination and filtering features.
// Also adding more detailed swagger documentations for each route and model.
