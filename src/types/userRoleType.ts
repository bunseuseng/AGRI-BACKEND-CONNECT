
import { Document, Types } from 'mongoose';
// export interface UserRoleType {
//   id: string;
//   user_id: string;   // reference to User id
//   role_id: string;   // reference to Role id
//   assignedAt?: Date;
// }
export interface IUserRole extends Document {
id: string;
user_id: Types.ObjectId;
role_id: Types.ObjectId;
assignedAt?: Date;
}
