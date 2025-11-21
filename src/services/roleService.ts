import { Request, Response } from "express";
import { Role } from "../models/role";
import { Types } from "mongoose";

// -------- CREATE ROLE --------
export const createRoleService = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Role name is required" });

    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ message: "Role already exists" });

    const newRole = await Role.create({ name });

    return res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- GET ALL ROLES --------
export const getRolesService = async (_req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    return res.status(200).json({ roles });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- GET ROLE BY ID --------
export const getRoleByIdService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });

    const role = await Role.findById(id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json({ role });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- UPDATE ROLE --------
export const updateRoleService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });

    const updatedRole = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedRole) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json({ message: "Role updated successfully", role: updatedRole });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- DELETE ROLE --------
export const deleteRoleService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });

    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
