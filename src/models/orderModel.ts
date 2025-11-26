import { Schema, model } from "mongoose";
import { IOrder } from "../types/orderType";

const OrderSchema = new Schema<IOrder>({
    id: { type: String, required: true, unique: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Schema.Types.Decimal128, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'cancelled'], 
        default: 'pending' 
    },
}, { timestamps: true });

export const Order = model<IOrder>("Order", OrderSchema);