import { Request, Response } from "express";
import { UserRole } from "../models/userRole";
import { User } from "../models/User";
import { Role } from "../models/role";
import { Types } from "mongoose";

// -------- CREATE USER ROLE --------
export const assignUserRoleService = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;

    // 1️⃣ Validate required fields
    if (!userId || !roleId) {
      return res.status(400).json({ message: "userId and roleId are required" });
    }

    // 2️⃣ Validate ObjectId
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({ message: "Invalid userId or roleId" });
    }

    // 3️⃣ Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 4️⃣ Check if role exists
    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    // 5️⃣ Check if user already has this role
    const existing = await UserRole.findOne({ user_id: userId, role_id: roleId });
    if (existing) return res.status(400).json({ message: "User already has this role" });

    // 6️⃣ Create UserRole
    const userRole = await UserRole.create({
      user_id: new Types.ObjectId(userId),
      role_id: new Types.ObjectId(roleId)
    });

    return res.status(201).json({ message: "Role assigned successfully", userRole });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- GET ALL USER ROLES --------
export const getUserRolesService = async (_req: Request, res: Response) => {
  try {
    const userRoles = await UserRole.find()
      .populate("user_id", "firstName lastName email")
      .populate("role_id", "name");

    return res.status(200).json({ userRoles });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- GET USER ROLE BY ID --------
export const getUserRoleByIdService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const userRole = await UserRole.findById(id)
      .populate("user_id", "firstName lastName email")
      .populate("role_id", "name");

    if (!userRole) return res.status(404).json({ message: "User role not found" });

    return res.status(200).json({ userRole });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- UPDATE USER ROLE --------
export const updateUserRoleService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, roleId } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    if (!userId || !roleId) {
      return res.status(400).json({ message: "userId and roleId are required" });
    }

    const userRole = await UserRole.findById(id);
    if (!userRole) return res.status(404).json({ message: "User role not found" });

    // Validate user and role
    const user = await User.findById(userId);
    const role = await Role.findById(roleId);
    if (!user || !role) return res.status(404).json({ message: "User or role not found" });

    // Update
    userRole.user_id = new Types.ObjectId(userId);
    userRole.role_id = new Types.ObjectId(roleId);
    await userRole.save();

    return res.status(200).json({ message: "User role updated successfully", userRole });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- DELETE USER ROLE --------
export const deleteUserRoleService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await UserRole.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User role not found" });

    return res.status(200).json({ message: "User role deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
