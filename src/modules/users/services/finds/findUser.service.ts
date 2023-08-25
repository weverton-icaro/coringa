import { inject, injectable } from "tsyringe";
import { UserMap } from "../../Mapper/UserMap";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { IUserResponse } from "../../interfaces/IUserResponde";


@injectable()
export class FindUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute(email?: string, id?: string, name?: string): Promise<IUserResponse[] | IUserResponse> {
    if (id) return UserMap.toDTO(await this.userRepository.findById(Number(id)))
    if (email) return UserMap.toDTO(await this.userRepository.findByEmail(email))
    if (name) return UserMap.toDTO(await this.userRepository.findByName(name))
    return await this.userRepository.find();
  }

}