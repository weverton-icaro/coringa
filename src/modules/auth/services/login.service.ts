import { compare } from 'bcryptjs'
import AppError from 'src/http/error/AppError'
import { User } from 'src/shared/infra/typeorm/entities/User'
import { logger } from 'src/utils/logger'
import { getRepository } from 'typeorm'
import {
    decodeToken,
    generateAccessToken,
    generateRefreshToken,
    validateToken,
} from '../../../../config/authToken'

export interface RefreshResult {
    token: string
}

export const login = async (email: string, password: string): Promise<any> => {
    try {
        // Verificar se o usuário existe
        const userRepository = getRepository(User)
        const user = await userRepository.findOne({ email })

        if (!user) throw new AppError('Email ou senha inválidos', 401)

        // Verificar a senha do usuário
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new AppError('Email ou senha inválidos', 401)
        }

        if (user.active !== true) throw new AppError('Usuário encontra-se inativo', 401)

        // Gerar token de acesso e refresh
        const accessToken = generateAccessToken(
            user.id,
            user.name,
            user.email,
            user.pixKey,
            user.phone,
            user.active,
            user.admin
        )

        return { accessToken }
    } catch (error) {
        logger.error(`ERROR REFRESH TOKEN: ${JSON.stringify(error.message)}`)
        throw new AppError(error.message)
    }
}

export const refresh = async (token: string): Promise<RefreshResult> => {
    try {
        const isValid = await validateToken(token)

        if (!isValid) return { token }

        const { userId, userName, userEmail, userPixKey, userPhone, userActive, userAdmin } =
            await decodeToken(token)

        if (!userActive) throw new AppError('Usuário não encontra-se ativo', 401)

        const refreshToken = generateRefreshToken(
            userId,
            userName,
            userEmail,
            userPixKey,
            userPhone,
            userActive,
            userAdmin
        )

        return { token: refreshToken }
    } catch (error) {
        logger.error(`ERROR REFRESH TOKEN: ${JSON.stringify(error.message)}`)
        throw new AppError(error.message)
    }
}
