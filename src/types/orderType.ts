import { Decimal128 } from "mongoose";

export interface IOrder extends Document {
    id: string;
    product_id: string; // reference to Product id
    user_id: string;    // reference to User id
    quantity: number;
    total_price: Decimal128;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}