import { Document, Schema, model } from 'mongoose';


export interface IRole extends Document {
name: string;
createdAt?: Date;
updatedAt?: Date;
}


const RoleSchema = new Schema<IRole>(
{
name: { type: String, required: true, unique: true },
},
{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);


export const Role = model<IRole>('Role', RoleSchema);