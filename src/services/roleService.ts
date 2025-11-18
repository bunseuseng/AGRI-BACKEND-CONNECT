// Role service to handle role-related operations
import { Role, IRole } from "../models/role";

export const createRole = async (name: string, description?: string) => {
  const existingRole = await Role.findOne({ name });
  if (existingRole) throw new Error("Role already exists");

  const role = await Role.create({ name, description });
  return role;
};

export const getAllRoles = async () => {
  return await Role.find();
};

export const getRoleById = async (id: string) => {
  const role = await Role.findById(id);
  if (!role) throw new Error("Role not found");
  return role;
};

export const updateRole = async (id: string, name?: string, description?: string) => {
  const role = await Role.findById(id);
  if (!role) throw new Error("Role not found");

  if (name) role.name = name;
  if (description) role.description = description;

  await role.save();
  return role;
};

export const deleteRole = async (id: string) => {
  const role = await Role.findByIdAndDelete(id);
  if (!role) throw new Error("Role not found");
  return role;
};
