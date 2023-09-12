import { Provider } from "src/shared/infra/typeorm/entities/Provider";
import { ICreateProvider } from "./ICreateProvider";
import { IUpdateProvider } from "./IUpdateProvider";

export interface IProviderRepository {
  create(data: ICreateProvider): Promise<Provider>
  find(): Promise<Provider[]>
  findById(id: number): Promise<Provider>
  findByAble(able: boolean): Promise<Provider[]>
  findByName(name: string): Promise<Provider[]>
  findByModule(modulo: string): Promise<Provider[]>
  update(data: IUpdateProvider): Promise<boolean>
  delete(id: number): Promise<boolean>
}