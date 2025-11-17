import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/User";
import { Role } from "../models/role";
import { UserRole } from "../models/userRole";


export const registerService = async (
    name: string, 
    email: string, 
    password: string, 
    address?: string, 
    phone?: string
) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    //Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user in database
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        phone
    });

    // Assign "Customer" role to the newly registered user
    const customerRole = await Role.findOne({name: "Customer"});
    if (customerRole) {
        await UserRole.create({
            user_id: newUser._id,
            role_id: customerRole._id
        });
    }

    return newUser;
};

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email }).exec() as IUser || null;
    if (!user) throw new Error("Invalid credentials!");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials!")

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );

    return { user, token };
};

// export const loginService = async (email: string, password: string) => {
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error("Invalid email or password");
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         throw new Error("Invalid email or password");
//     }

//     if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     return { user, token };
// };

// export const logoutService = async (userId: string) => {
//     // In a stateless JWT authentication, logout can be handled on the client side by deleting the token.
//     // Optionally, you can implement token blacklisting on the server side if needed.
//     return { message: "User logged out successfully" };
// };