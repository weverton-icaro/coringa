import { User } from 'src/shared/infra/typeorm/entities/User';
import { ICreateUser } from './ICreateUser';
import { IUpdateUser } from './IUpdateUser';

export interface IUserRepository {
  create(data: ICreateUser): Promise<User | undefined>;
  find(): Promise<User[] | User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  findByName(name: string): Promise<User | undefined>;
  update(data: IUpdateUser): Promise<any>;
  delete(id: number): Promise<void>;
}
