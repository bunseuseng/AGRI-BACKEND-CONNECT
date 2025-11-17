import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
