import { Coin } from "src/shared/infra/typeorm/entities/Coin";
import { inject, injectable } from "tsyringe";
import { ICoinRepository } from "../../interfaces/ICoinRepository";


@injectable()
export class GetCoinUseCase {
  constructor(
    @inject('CoinRepository')
    private coinRepository: ICoinRepository
  ) { }

  async execute(id?: string, type?: string, isEnable?: boolean): Promise<Coin[] | undefined> {
    let coins: Coin[] = [];

    if (id) {
      const coin = await this.coinRepository.findById(Number(id));
      if (coin) {
        coins.push(coin);
      }
    } else if (type) {
      coins = await this.coinRepository.findByType(type);
    } else if (isEnable !== undefined) {
      coins = await this.coinRepository.findByEnabler(isEnable);
    } else {
      coins = await this.coinRepository.find();
    }

    return coins;
  }
}