import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserService } from '../../services/update/updateUser.service';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, pixKey, phone, active, admin } =
      request.body;

    console.log(request.params);

    const userService = container.resolve(UpdateUserService);

    try {
      await userService.execute(Number(id), {
        name,
        email,
        password,
        pixKey,
        phone,
        active,
        admin,
      });
      return response
        .status(200)
        .json({ message: 'User updated successfully' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
