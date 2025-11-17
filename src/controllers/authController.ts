import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/authService";

export const register = async (req: Request, res: Response, next: NextFunction ) => {
    try{
        const { name, email, password, address, phone } = req.body;

        // Call logic from service layer to handle registration process
        const user = await AuthService.registerService(
            name, 
            email, 
            password,
            address,
            phone
        );

        // Send success response to client if registration is successful
        res.status(201).json({ 
            success: true,
            message: "Register successfully",
            userId: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone
            }
        });

    } catch (err: any) {
        // res.status(400).json({ message: err.message });
    res.status(400).json({ message: err.message });
    } // Catch block to handle errors during registration process
};

// Controller function to handle user login requests 
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Call logic from service layer to handle login process
        const { user, token } = await AuthService.loginService(email, password);
        res.status(201).json({
            success: true,
            message: "Login successfully!", 
            token,
        userId: user._id});
    } catch(err: any) {
    res.status(400).json({ message: err.message });
    }
};
