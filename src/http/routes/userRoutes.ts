import { Router } from "express";
import { CreateUserController } from "src/modules/users/controllers/create/createUser.controller";
import { DeleteUserController } from "src/modules/users/controllers/delete/deleteUser.controller";
import { FindUserController } from "src/modules/users/controllers/finds/findUser.controller";
import { UpdateUserController } from "src/modules/users/controllers/update/updateUser.controller";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuth } from "../middlewares/ensureAuth";

const userRouter = Router();
const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

userRouter.post('/', createUserController.handle);

// Rota para buscar usuários
userRouter.get('/', ensureAuth, findUserController.handle);

// Rota para atualizar um usuário
userRouter.put('/:id', ensureAuth, updateUserController.handle);

// Rota para deletar um usuário
userRouter.delete('/:id', ensureAuth, ensureAdmin, deleteUserController.handle);

export { userRouter };
