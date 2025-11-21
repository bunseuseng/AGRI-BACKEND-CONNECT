// Category model
import { Document, Schema, model } from 'mongoose';
import { ICategory } from '../types/categoryType';

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    }
},
{
    timestamps: { 
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt' 
    } 
})

export const Category = model<ICategory>('Category', CategorySchema);