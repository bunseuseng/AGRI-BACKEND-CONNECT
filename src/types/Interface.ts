// Role.ts
export interface Role {
  id: number;
  name: string;
}

// User.ts
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string; //address & phone can be null, because it's an optional.
}

// UserRole.ts
export interface UserRole {
  id: number;
  user_id: number;
  role_id: number;
}
