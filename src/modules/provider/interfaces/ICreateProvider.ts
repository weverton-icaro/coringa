export interface ICreateProvider {
  id?: number;
  slug: string
  name: string
  module: string
  url: string
  publicKey: string
  able: boolean
  createdAt?: Date
  updatedAt?: Date
}