import { User } from 'src/shared/infra/typeorm/entities/User'
import { Repository, getRepository } from 'typeorm'
import { ICreateUser } from '../interfaces/ICreateUser'
import { IUpdateUser } from '../interfaces/IUpdateUser'
import { IUserRepository } from '../interfaces/IUserRepository'

export class UserRepository implements IUserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async create(data: ICreateUser): Promise<User | undefined> {
        const user = this.repository.create(data)
        await this.repository.save(user)
        return user
    }

    async find(): Promise<User[] | undefined> {
        const queryBuilder = this.repository.createQueryBuilder('user').take(50)
        const users = await queryBuilder.getMany()
        return users
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ email })
        return user
    }

    async findById(id: number): Promise<User | undefined> {
        const user = await this.repository.findOne(id)
        return user
    }

    async findByName(name: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ name: Like(`%${name}%`) })
        return user
    }

    async update(data: IUpdateUser): Promise<void> {
        await this.repository.save(data)
        return
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
        return
    }
}

function Like(arg0: string): string | import('typeorm').FindOperator<string> {
    throw new Error('Function not implemented.')
}
