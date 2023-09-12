import { Repository, getRepository } from 'typeorm'

import { ITransactionRepository } from '../interfaces/ITransactionRepository'
import { Transaction } from 'src/shared/infra/typeorm/entities/Transaction'
import { ITransactionCreate } from '../interfaces/ITransactionCreate'

export class TransactionRepository implements ITransactionRepository {
    private repository: Repository<Transaction>

    constructor() {
        this.repository = getRepository(Transaction)
    }

    async create(data: ITransactionCreate): Promise<Transaction | undefined> {
        const transaction = this.repository.create(data)
        await this.repository.save(transaction)
        return transaction
    }

    async find(): Promise<Transaction | Transaction[]> {}
}
