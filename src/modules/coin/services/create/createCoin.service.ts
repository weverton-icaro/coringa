
import { inject, injectable } from "tsyringe";
import { ICoinResponse } from "../../interfaces/ICoinResponse";
import { ICreateCoin } from "../../interfaces/ICreateCoin";
import { Coin } from "src/shared/infra/typeorm/entities/Coin";


@injectable()
export class CreateCoinService {
  constructor(@inject('CoinRepository') private coinRepository: ICoinResponse) { }

  public async execute({ type, isEnabled }: ICreateCoin): Promise<Coin> {
    const coin = await this.coinRepository.

    return coin;
  }

}