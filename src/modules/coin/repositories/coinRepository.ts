import { Coin } from 'src/shared/infra/typeorm/entities/Coin';
import { Like, Repository, getRepository } from 'typeorm';
import { ICoinRepository } from '../interfaces/ICoinRepository';
import { ICreateCoin } from '../interfaces/ICreateCoin';
import { IUpdateCoin } from '../interfaces/IUpdateCoin';

export class CoinRepository implements ICoinRepository {
  private repository: Repository<Coin>;

  constructor() {
    this.repository = getRepository(Coin);
  }

  async create(data: ICreateCoin): Promise<Coin | undefined> {
    const coin = this.repository.create(data);
    await this.repository.save(coin);
    return coin;
  }

  async find(): Promise<Coin[] | undefined> {
    const queryBuilder = this.repository.createQueryBuilder('coin').take(50);
    const coins = await queryBuilder.getMany();
    return coins;
  }

  async findById(id: number): Promise<Coin | undefined> {
    const coin = await this.repository.findOne(id);
    return coin;
  }

  async findByType(tipe: string): Promise<Coin[] | undefined> {
    // @ts-ignore
    const coin = await this.repository.find({ type: Like(`%${type}%`) });
    return coin;
  }

  async findByEnabler(enabler: boolean): Promise<Coin[] | undefined> {
    const coin = await this.repository.find({ isEnabled: enabler });
    return coin;
  }

  async update(data: IUpdateCoin): Promise<Coin | undefined> {
    await this.repository.save(data);
    return;
  }

  async delete(id: number): Promise<Boolean> {
    try {
      await this.repository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
