import { Request, Response } from 'express';
import { logger } from 'src/utils/logger';
import { container } from 'tsyringe';
import { UpdateCoinUseCase } from '../../services/update/updateCoin.service';

export class UpdateCoinController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { type, isEnabled } = request.body;

    try {
      const updateCoinUseCase = container.resolve(UpdateCoinUseCase);

      const coin = await updateCoinUseCase.execute({
        id: Number(id),
        type,
        isEnabled,
      });

      logger.info({ message: 'Coin atualizado com sucesso!' });
      return response.status(200).json(coin);
    } catch (error) {
      logger.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
