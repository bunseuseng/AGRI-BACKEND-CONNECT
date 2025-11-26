// models/Product.ts
import { Schema, model } from "mongoose";
import { IProduct } from "../types/productType";
// export interface IProduct extends Document {
//   name: string;
//   description: string;
//   price: number;
//   category_id: Types.ObjectId | string;
//   created_by: Types.ObjectId | string;
//   updated_by?: Types.ObjectId | string;
//   stock: number;
//   image?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Schema.Types.Decimal128, required: true },
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
    stock: { type: Number, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);
