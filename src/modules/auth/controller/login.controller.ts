import { Request, Response } from 'express'
import { login, refresh } from '../services/login.service'

export class AuthController {
    async login(request: Request, response: Response) {
        const { email, password } = request.body
        try {
            const tokens = await login(email, password)
            return response.json(tokens)
        } catch (error) {
            return response.status(401).json({ message: 'Email ou senha inválidos' })
        }
    }

    async refresh(request: Request, response: Response) {
        const { token } = request.body
        try {
            const refreshToken = await refresh(token)
            return response.json(refreshToken)
        } catch (error) {
            return response.status(401).json({ message: 'Token inválido.' })
        }
    }
}
