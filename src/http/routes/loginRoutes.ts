import { Router } from 'express'
import { AuthController } from 'src/modules/auth/controller/login.controller'

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/login', authController.login)
authRouter.post('/refresh-token', authController.refresh)

export { authRouter }
