import { Document, Schema, model } from 'mongoose';
import { IUser } from '../types/userType';


const UserSchema = new Schema<IUser>(
{
firstName: { 
  type: String, 
  required: true 
},
lastName: { 
  type: String, 
  required: true 
},
email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
password: { 
    type: String, 
    required: true 
},
address: { type: String },
phone: { 
      type: String, 
      unique: true, 
      sparse: true, 
      match: [/^\d{8,15}$/, "Phone number must be 8-15 digits"] 
    },
// role: {
//     type: [String],
// },

},
{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const User = model<IUser>('User', UserSchema);