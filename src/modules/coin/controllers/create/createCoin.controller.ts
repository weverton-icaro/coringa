import { Request, Response } from 'express';
import { logger } from 'src/utils/logger';
import { container } from 'tsyringe';
import { CreateCoinService } from '../../services/create/createCoin.service';

export class CreateCoinController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { type, phone } = request.body;

    try {
      const createCoinService = container.resolve(CreateCoinService);

      const coin = await createCoinService.execute({ type, phone });

      logger.info({ message: 'Coin criado com sucesso!' });
      return response.status(201).json(coin);
    } catch (error) {
      logger.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
