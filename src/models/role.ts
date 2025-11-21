import { Document, Schema, model } from 'mongoose';
import { IRole } from '../types/roleType';


const RoleSchema = new Schema<IRole>(
{
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String 
    },
},
{ 
    timestamps: { 
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt' 
    } 
}
);


export const Role = model<IRole>('Role', RoleSchema);