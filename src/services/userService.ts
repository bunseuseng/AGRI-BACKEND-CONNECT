import { Request, Response } from "express";
import { User } from "../models/User";
import { Types } from "mongoose";

// -------- CREATE USER (Optional if Admin can create users) --------
export const createUserService = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, address, phone } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "firstName, lastName, and email are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({ firstName, lastName, email, password, address, phone });

    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- GET ALL USERS --------
export const getUsersService = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- GET USER BY ID --------
export const getUserByIdService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid user ID" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- UPDATE USER --------
export const updateUserService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid user ID" });

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- DELETE USER --------
export const deleteUserService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid user ID" });

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
