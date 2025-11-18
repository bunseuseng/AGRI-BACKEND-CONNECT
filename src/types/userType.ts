export interface UserType {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
