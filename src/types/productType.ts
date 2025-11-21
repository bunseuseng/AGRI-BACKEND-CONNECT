//Product Type
import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
    id: string;
    name: string;
    description: string;
    price: number;
    category_id: Types.ObjectId | string; // reference to Category id
    created_by: Types.ObjectId | string; // reference to User id who created the product
    updated_by?: Types.ObjectId | string; // reference to User id who last updated the product
    stock: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}