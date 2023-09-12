export interface IUpdateProvider {
  id: number;

  slug?: string

  name?: string

  module?: string

  url?: string

  publicKey?: string

  able?: boolean

  updatedAt?: Date
}