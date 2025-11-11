import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: "admin" | "farmer" | "customer";
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        role: { type: String, enum: ["admin", "farmer", "customer"], required: true },
    },
    { timestamps: true
    }
);

const User = model<IUser>("User", userSchema);
export default User;
