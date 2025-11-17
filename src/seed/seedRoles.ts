import { Role } from "../models/role";

export const seedRoles = async () => {
  const roles = ["Admin", "Farmer", "Customer"];

  for (const roleName of roles) {
    const exists = await Role.findOne({ name: roleName });
    if (!exists) {
      await Role.create({ name: roleName });
      console.log(`✅ Role created: ${roleName}`);
    }
  }

  console.log("🎉 All roles seeded");
};
