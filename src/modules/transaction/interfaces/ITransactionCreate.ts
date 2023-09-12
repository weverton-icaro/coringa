export interface ITransactionCreate {
    id?: number
    requestUuid: string
    sessionId: number
    amount: number
    header: string
    payload: string
    response: string
    responseHeader: string
}
