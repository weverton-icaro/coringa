import AppError from "src/http/error/AppError";
import { Provider } from "src/shared/infra/typeorm/entities/Provider";
import { Repository, getRepository } from "typeorm";
import { ICreateProvider } from "../interfaces/ICreateProvider";
import { IProviderRepository } from "../interfaces/IProviderRepository";
import { IUpdateProvider } from "../interfaces/IUpdateProvider";

export class ProviderRepository implements IProviderRepository {
  private repository: Repository<Provider>

  constructor() {
    this.repository = getRepository(Provider)
  }

  async create(data: ICreateProvider): Promise<Provider> {
    try {
      const provider = await this.repository.create(data)
      return await this.repository.save(provider)
    } catch (error) {
      return error
    }
  }

  async find(): Promise<Provider[]> {
    return await this.repository.find()
  }

  async findById(id: number): Promise<Provider> {
    return await this.repository.findOne(id)
  }

  async findByAble(able: boolean): Promise<Provider[]> {
    return await this.repository.find({ able: able })
  }

  async findByName(name: string): Promise<Provider[]> {
    return await this.repository.createQueryBuilder().where("providers.name", { name: `%${name}%` }).getMany()
  }

  async findByModule(modulo: string): Promise<Provider[]> {
    return await this.repository.find({ module: modulo })
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