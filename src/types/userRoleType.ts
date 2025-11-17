export interface UserRoleType {
  id: string;
  user_id: string;   // reference to User id
  role_id: string;   // reference to Role id
  assignedAt?: Date;
}
