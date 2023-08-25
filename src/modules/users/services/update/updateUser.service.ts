import { hash } from 'bcryptjs';
import moment from "moment";
import AppError from "src/http/error/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../../interfaces/ICreateUser";
import { IUserRepository } from "../../interfaces/IUserRepository";


@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  async execute(id: number, { name,
    email,
    password,
    pixKey,
    phone,
    active,
    admin
  }: ICreateUser): Promise<boolean> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    if (email && email !== user.email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email);

      if (emailAlreadyExists) {
        throw new AppError('E-mail já em uso.', 400);
      }

      user.email = email;
    }

    user.name = name !== user.name ? name : user.name;

    if (password) {
      const hashedPassword = await hash(password, 8);
      user.password = hashedPassword;
    }

    user.pixKey = pixKey !== user.pixKey ? pixKey : user.pixKey;
    user.phone = phone !== user.phone ? phone : user.phone;
    user.active = active !== user.active ? active : user.active;
    user.admin = admin !== user.admin ? admin : user.admin;

    const updateDate = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

    user.updatedAt = new Date(updateDate);

    await this.userRepository.update(user);
    return
  }

}