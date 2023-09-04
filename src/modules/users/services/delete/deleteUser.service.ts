import AppError from 'src/http/error/AppError'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../interfaces/IUserRepository'

@injectable()
export class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute(id: number): Promise<Boolean> {
        const userExists = await this.userRepository.findById(id)
        if (!userExists) throw new AppError('Usuário não encontrado.', 404)
        await this.userRepository.delete(id)
        return
    }
}
