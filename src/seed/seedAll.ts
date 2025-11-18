import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedAdmin } from "./seedAdmin";

dotenv.config();

const startSeed = async () => {
  try {
    console.log("🚀 Starting seeding...");

    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected");

    await seedAdmin();

    console.log("🎉 Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

startSeed();
