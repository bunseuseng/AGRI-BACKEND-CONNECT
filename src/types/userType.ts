export interface IUser extends Document {
_id: any;
firstName: string;
lastName: string;
email: string;
password: string;
address?: string;
phone?: string;
createdAt?: Date;
updatedAt?: Date;
}

