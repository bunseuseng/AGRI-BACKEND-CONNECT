import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Database connection logic here
        if (!process.env.MONGO_URL) throw new Error ("MONGO_URL is not definded");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");

    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};

export default connectDB;