export interface ICreateUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  pixKey: string;
  phone: string;
  active?: boolean;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}