import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "../models/role";
import { UserRole } from "../models/userRole";
import { User } from "../models/User";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_here";

// -------- REGISTER SERVICE --------
export const registerService = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, address, phone } = req.body;

    // 1️⃣ Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phone
    });

    // 4️⃣ Assign Customer role
    const customerRole = await Role.findOne({ name: "Customer" });
    if (customerRole) {
      await UserRole.create({
        user_id: newUser._id,
        role_id: customerRole._id
      });
    }

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// -------- LOGIN SERVICE --------
export const loginService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
