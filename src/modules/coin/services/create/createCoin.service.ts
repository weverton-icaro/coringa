
import AppError from 'src/http/error/AppError';
import { Coin } from "src/shared/infra/typeorm/entities/Coin";
import { inject, injectable } from "tsyringe";
import { ICoinRepository } from "../../interfaces/ICoinRepository";
import { ICreateCoin } from "../../interfaces/ICreateCoin";


@injectable()
export class CreateCoinService {
  constructor(
    @inject('CoinRepository')
    private coinRepository: ICoinRepository
  ) { }

  public async execute({ type, phone }: ICreateCoin): Promise<Coin> {
    const enabled = true;
    const coin = await this.coinRepository.create({ type, phone, isEnabled: enabled });
    if (!coin) throw new AppError('Coin não criado')
    return coin;
  }
}