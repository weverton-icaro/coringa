import moment from 'moment-timezone';
import AppError from 'src/http/error/AppError';
import { Coin } from 'src/shared/infra/typeorm/entities/Coin';
import { inject, injectable } from 'tsyringe';
import { ICoinRepository } from '../../interfaces/ICoinRepository';
import { IUpdateCoin } from './../../interfaces/IUpdateCoin';

@injectable()
export class UpdateCoinUseCase {
  constructor(
    @inject('CoinRepository')
    private coinRepository: ICoinRepository,
  ) {}

  async execute({
    id,
    type,
    isEnabled,
  }: IUpdateCoin): Promise<Coin | undefined> {
    const coin = await this.coinRepository.findById(id);

    if (!coin) {
      throw new AppError('Moeda não encontrada', 404);
    }

    coin.type = type;
    coin.isEnabled = isEnabled;
    coin.updatedAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );

    const updatedCoin = await this.coinRepository.update(coin);

    return updatedCoin;
  }
}
