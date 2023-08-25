import { Request, Response } from "express";
import { logger } from "src/utils/logger";
import { container } from "tsyringe";
import { FindUserService } from "../../services/finds/findUser.service";

export class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, email } = request.params;

    console.log(request.params)

    const userService = container.resolve(FindUserService);

    try {
      let users;

      users = await userService.execute(email, id, name)

      if (users) {
        // Remover o campo de senha antes de retornar a resposta
        if (Array.isArray(users)) {
          users = users.map(user => {
            if (user.password) {
              delete user.password;
            }
            return user;
          });
        } else if (users.password) {
          delete users.password;
        }

        return response.status(200).json(users);
      }

      logger.error('Usuário(s) não encontrado')
      return response.status(404).json({ error: 'Usuário(s) não encontrado' });
    } catch (error) {
      logger.error(error.message)
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}