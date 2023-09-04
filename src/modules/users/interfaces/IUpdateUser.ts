export interface IUpdateUser {
    id: number
    name?: string
    email?: string
    password?: string
    pixKey?: string
    phone?: string
    active?: boolean
    admin?: boolean
    updatedAt?: Date
}
