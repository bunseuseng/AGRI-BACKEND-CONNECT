import { User } from "../models/User";
import { Role } from "../models/role";
import { UserRole } from "../models/userRole";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    // ---- 1) Create base roles ----
    const baseRoles = ["Admin", "Customer", "Farmer"];

    for (const roleName of baseRoles) {
      const existing = await Role.findOne({ name: roleName });
      if (!existing) {
        await Role.create({ name: roleName });
        console.log(`⚙️ Role created: ${roleName}`);
      }
    }

    // ---- 2) Ensure Admin role exists ----
    const adminRole = await Role.findOne({ name: "Admin" });

    // ---- 3) Check if admin user already exists ----
    const adminEmail = process.env.ADMIN_EMAIL || "admin@agriculator.com";
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "admin123",
        10
      );

      adminUser = await User.create({
        name: process.env.ADMIN_NAME || "Admin User",
        email: adminEmail,
        password: hashedPassword,
        phone: process.env.ADMIN_PHONE || "000000000",
        address: process.env.ADMIN_ADDRESS || "Phnom Penh",
      });

      console.log("✅ Admin user created");
    } else {
      console.log("♻️ Admin already exists");
    }

    // ---- 4) Create UserRole mapping only if not exists ----
    const existingMapping = await UserRole.findOne({
      user_id: adminUser._id,
      role_id: adminRole!._id,
    });

    if (!existingMapping) {
      await UserRole.create({
        user_id: adminUser._id,
        role_id: adminRole!._id,
      });
      console.log("🔗 Admin linked to Admin role");
    } else {
      console.log("🔗 Admin role already assigned");
    }

    console.log("🎉 Admin seeding finished successfully");

  } catch (err) {
    console.error("❌ Seed admin failed:", err);
  }
};
