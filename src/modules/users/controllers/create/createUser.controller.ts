import { Request, Response } from 'express';
import { logger } from 'src/utils/logger';
import { container } from 'tsyringe';
import { CreateUserService } from '../../services/create/createUser.service';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, email, senha, telefone, chavePix } = request.body;
    const userService = container.resolve(CreateUserService);
    try {
      const user = await userService.execute({
        name: nome,
        email,
        password: senha,
        phone: telefone,
        pixKey: chavePix,
      });

      return response.status(201).json(user);
    } catch (error) {
      logger.error(error.message);
      return response.status(400).json({ error: error.message });
    }
  }
}
