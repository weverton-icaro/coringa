import { Provider } from "src/shared/infra/typeorm/entities/Provider";
import { ICreateProvider } from "./ICreateProvider";
import { IFindProvider } from "./IFindProvider";
import { IUpdateProvider } from "./IUpdateProvider";

export interface IProviderRepository {
  create(data: ICreateProvider): Promise<Provider>
  find(data: IFindProvider): Promise<Provider[]>
  update(data: IUpdateProvider): Promise<boolean>
  delete(id: number): Promise<boolean>
}