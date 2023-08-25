import { instanceToInstance } from "class-transformer";
import { User } from "src/shared/infra/typeorm/entities/User";
import { IUserResponse } from "../interfaces/IUserResponde";


export class UserMap {
  static toDTO({
    email,
    id,
    name,
    phone,
    pixKey,
    active
  }: User): IUserResponse {
    const user = instanceToInstance({
      email,
      id,
      name,
      phone,
      pixKey,
      active
    });

    delete (user as any).password;

    return user;
  }
}