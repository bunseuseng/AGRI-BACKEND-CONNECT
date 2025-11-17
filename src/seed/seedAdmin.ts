import { User } from "../models/User";
import { Role } from "../models/role";
import { UserRole } from "../models/userRole";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const seedAdmin = async () => {
  try {
    // ✅ Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || "admin@agriculator.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    const adminRole = await Role.findOne({ name: "Admin" });

    if (!adminRole) throw new Error("Admin role not found");

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "admin123",
        10
      );

      const adminUser = await User.create({
        name: process.env.ADMIN_NAME || "Admin User",
        email: adminEmail,
        password: hashedPassword,
        phone: process.env.ADMIN_PHONE || "000000000",
        address: process.env.ADMIN_ADDRESS || "Phnom Penh",
      });

      await UserRole.create({
        user_id: adminUser._id,
        role_id: adminRole._id,
      });

      console.log("✅ Admin user seeded with Admin role");
    } else {
      console.log("♻️ Admin already exists");
    }
  } catch (err) {
    console.error("❌ Seed failed:", err);
  }
};
