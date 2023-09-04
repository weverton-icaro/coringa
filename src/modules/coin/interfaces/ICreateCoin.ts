type IEnumType = {
    type: 'BRL' | 'EUR' | 'USD'
}
export interface ICreateCoin {
    id?: number
    type: string
    phone: string
    isEnabled?: boolean
    createdAt?: Date
    updatedAt?: Date
}
