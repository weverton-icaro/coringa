import { User } from "src/shared/infra/typeorm/entities/User";
import { Repository, getRepository } from "typeorm";
import { IUserCreate } from "../interfaces/ICreateUser";

export class UserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: IUserCreate): Promise<User> {
    const user = this.repository.create(data)

    await this.repository.save(user)

    return user
  }
}