import { Coin } from 'src/shared/infra/typeorm/entities/Coin';
import { ICreateCoin } from './ICreateCoin';
import { IUpdateCoin } from './IUpdateCoin';

export interface ICoinRepository {
  create(data: ICreateCoin): Promise<Coin | undefined>;
  find(): Promise<Coin[] | undefined>;
  findById(id: number): Promise<Coin | undefined>;
  findByType(type: string): Promise<Coin[] | undefined>;
  findByEnabler(enabler: boolean): Promise<Coin[] | undefined>;
  update(data: IUpdateCoin): Promise<Coin | undefined>;
  delete(id: number): Promise<Boolean>;
}
