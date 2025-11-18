import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/userRole";

export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id; // from authenticateJWT middleware

    // Get roles for this user and populate role details
    const userRoles = await UserRole.find({ user_id: userId }).populate("role_id");

    // Check if user has an "Admin" role
    const isAdmin = userRoles.some(ur => (ur.role_id as any).name === "Admin");

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
