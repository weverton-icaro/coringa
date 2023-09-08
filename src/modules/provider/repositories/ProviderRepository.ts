import AppError from "src/http/error/AppError";
import { Provider } from "src/shared/infra/typeorm/entities/Provider";
import { Repository, getRepository } from "typeorm";
import { ICreateProvider } from "../interfaces/ICreateProvider";
import { IFindProvider } from "../interfaces/IFindProvider";
import { IProviderRepository } from "../interfaces/IProviderRepository";
import { IUpdateProvider } from "../interfaces/IUpdateProvider";

export class ProviderRepository implements IProviderRepository {
  private repository: Repository<Provider>

  constructor() {
    this.repository = getRepository(Provider)
  }

  async create(data: ICreateProvider): Promise<Provider> {
    throw new Error("Method not implemented.");
  }
  async find(data: IFindProvider): Promise<Provider[]> {
    throw new Error("Method not implemented.");
  }
  async update(data: IUpdateProvider): Promise<boolean> {
    try {
      const repository = await this.repository.findOne(data.id)
      if (!repository) throw new AppError("Provedor não encontrado", 404)
      const provider = await this.repository.update(data.id, data)
      if (provider) return true
    } catch (error) {
      return error
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const repository = await this.repository.findOne(id)
      if (repository) await this.repository.delete(repository)
      return true
    } catch (error) {
      return error
    }
  }

}