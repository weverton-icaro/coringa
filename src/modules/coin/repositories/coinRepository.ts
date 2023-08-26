import { Coin } from "src/shared/infra/typeorm/entities/Coin";
import { Repository, getRepository } from "typeorm";
import { ICreateCoin } from "../interfaces/ICreateCoin";
import { IUpdateCoin } from "../interfaces/IUpdateCoin";

export class CoinRepository {

  private repository: Repository<Coin>;

  constructor() {
    this.repository = getRepository(Coin);
  }

  async create(data: ICreateCoin): Promise<Coin | undefined> {
    const coin = this.repository.create(data);
    await this.repository.save(coin)
    return coin;
  }

  async find(): Promise<Coin[] | undefined> {
    const queryBuilder = this.repository.createQueryBuilder('coin').take(50)
    const coins = await queryBuilder.getMany();
    return coins;
  }

  async findById(id: number): Promise<Coin | undefined> {
    const coin = await this.repository.findOne(id);
    return coin;
  }

  async findByName(name: string): Promise<Coin | undefined> {
    // @ts-ignore
    const coin = await this.repository.findOne({ name: Like(`%${name}%`) })
    return coin;
  }

  async update(data: IUpdateCoin): Promise<void> {
    await this.repository.save(data);
    return
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    return
  }

}

function Like(arg0: string): string | import("typeorm").FindOperator<string> {
  throw new Error("Function not implemented.");
}