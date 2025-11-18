import { User } from "../models/User";
import { Role } from "../models/role";
import { UserRole } from "../models/userRole";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    // Find or create Admin role
    let adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole) {
      adminRole = await Role.create({ name: "Admin" });
      console.log("⚙️ Admin role created");
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@agriculator.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

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
        role: process.env.ADMIN_ROLE || "Admin168"
            });
    
      await UserRole.create({
        user_id: adminUser._id,
        role_id: adminRole._id,
      });
      console.log("✅ Admin user created");
    } else {
      console.log("♻️ Admin already exists");
    }
  } catch (err) {
    console.error("❌ Seed admin failed:", err);
  }
};
