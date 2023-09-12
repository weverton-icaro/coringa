import { Transaction } from 'src/shared/infra/typeorm/entities/Transaction'
import { ITransactionCreate } from './ITransactionCreate'

export interface ITransactionRepository {
    create(data: ITransactionCreate): Promise<Transaction | undefined>
    find(): Promise<Transaction[] | Transaction | undefined>
}
