import { hash } from 'bcryptjs'
import AppError from 'src/http/error/AppError'
import { ICreateUser } from 'src/modules/users/interfaces/ICreateUser'
import { IUserRepository } from 'src/modules/users/interfaces/IUserRepository'
import { User } from 'src/shared/infra/typeorm/entities/User'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute({ name, password, email, pixKey, phone }: ICreateUser): Promise<User> {
        const userAlreadyExists = await this.userRepository.findByEmail(email)
        if (userAlreadyExists) throw new AppError('Email já cadastrado', 400)

        if (password.length < 6) throw new AppError('Senha não pode ser menor que 6 caracteres')

        const passwordHash = await hash(password, 8)

        const user = await this.userRepository.create({
            name,
            password: passwordHash,
            email,
            active: true,
            admin: false,
            pixKey,
            phone,
        })

        if (user && user.password) {
            delete user.password
        }

        return user
    }
}
