import { Request, Response } from "express";
import * as RoleService from "../services/roleService";

// CREATE ROLE
export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // ✅ Controller-level validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({ success: false, message: "Role name is required and must be a string" });
    }

    const role = await RoleService.createRole(name, description);
    res.status(201).json({ success: true, role });
  } catch (err: any) {
    console.error("createRole Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};

// GET ALL ROLES
export const getAllRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.status(200).json({ success: true, roles });
  } catch (err: any) {
    console.error("getAllRoles Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};

// GET ROLE BY ID
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Role ID is required" });

    const role = await RoleService.getRoleById(id);
    if (!role) return res.status(404).json({ success: false, message: "Role not found" });

    res.status(200).json({ success: true, role });
  } catch (err: any) {
    console.error("getRoleById Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};

// UPDATE ROLE
export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) return res.status(400).json({ success: false, message: "Role ID is required" });
    if (!name || typeof name !== "string") {
      return res.status(400).json({ success: false, message: "Role name is required and must be a string" });
    }

    const role = await RoleService.updateRole(id, name, description);
    res.status(200).json({ success: true, role });
  } catch (err: any) {
    console.error("updateRole Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};

// DELETE ROLE
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Role ID is required" });

    await RoleService.deleteRole(id);
    res.status(200).json({ success: true, message: "Role deleted" });
  } catch (err: any) {
    console.error("deleteRole Error:", err);
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};
