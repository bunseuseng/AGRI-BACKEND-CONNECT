import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/userRole";
import { Role } from "../models/role";

interface jwtPayload {
    id: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload ;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token  = req.headers.authorization?.split("")[1];
    if (!token) return res.status(401).json({message: "No token provided"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
};


// export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = (req as any).user.id; // from authenticateJWT
//     // Get roles for this user
//     const userRoles = await UserRoles.find({ user_id: userId }).populate("role_id");
//     const isAdmin = userRoles.some(ur => (ur.role_id as any).name === "Admin");
//     if (!isAdmin) {
//       return res.status(403).json({ message: "Forbidden: Admins only" });
//     }
//     next();
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };