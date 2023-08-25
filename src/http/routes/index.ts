import { Router } from "express";
import { authRouter } from "./loginRoutes";
import { userRouter } from "./userRoutes";

const router = Router();

router.use('/users', userRouter)
router.use('/auth', authRouter)

export { router };
