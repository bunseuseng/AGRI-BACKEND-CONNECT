import { Document, Schema, model } from 'mongoose';
import { IUserRole } from '../types/userRoleType';

const UserRoleSchema = new Schema<IUserRole>(
{
user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
assignedAt: { type: Date, default: Date.now },
}
);


UserRoleSchema.index({ user_id: 1, role_id: 1 }, { unique: true });


export const UserRole = model<IUserRole>('UserRole', UserRoleSchema);