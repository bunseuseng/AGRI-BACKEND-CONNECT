import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/userRole";

interface jwtPayload {
    id: string;
    role: string;
    description?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload ;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token  = req.headers.authorization?.split(" ")[1];
    if (!token) 
        return res.status(401).json({message: "No token provided"});

    try {
        // Why decoded as jwtPayload?
        // Because we defined the structure of our JWT payload in the jwtPayload interface.
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
};

export const checkRole = (roles: string[]) => {
    // async used because of await inside
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            // Extract user ID from request
            const userId = req.user.id;

            // Get roles for this user and populate role details
            const userRoles = await UserRole.find({ user_id: userId }).populate("role_id");

            // Extract role names
            const roleNames = userRoles.map(ur => (ur.role_id as any).name);
            // Check if user has at least one of the required roles
            const hasRole = roles.some(role => roleNames.includes(role));

            if (!hasRole) {
                return res.status(403).json({ message: "Forbidden: Insufficient role" });
            }

            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    };
};

