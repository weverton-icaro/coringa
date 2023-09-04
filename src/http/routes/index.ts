import { Router } from 'express'
import { coinRouter } from './coinRoutes'
import { authRouter } from './loginRoutes'
import { userRouter } from './userRoutes'

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/coins', coinRouter)

export { router }
