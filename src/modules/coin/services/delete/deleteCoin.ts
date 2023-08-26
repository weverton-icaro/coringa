import { inject, injectable } from "tsyringe";
import { ICoinRepository } from "../../interfaces/ICoinRepository";

@injectable()
export class DeleteCoinUseCase {
  constructor(
    @inject('CoinRepository')
    private coinRepository: ICoinRepository
  ) { }

  async execute(id: string): Promise<Boolean> {
    const coin = await this.coinRepository.delete(Number(id))
    return coin
  }
}