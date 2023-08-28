import { Request, Response } from "express";
import { logger } from "src/utils/logger";
import { container } from "tsyringe";
import { GetCoinUseCase } from "../../services/find/getCoin.service";

export class GetCoinsController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id, type, isEnabled } = request.params;

    try {
      const getCoinUseCase = container.resolve(GetCoinUseCase)

      const coin = await getCoinUseCase.execute(id, type, Boolean(isEnabled));

      logger.info({ message: "Coin criado com sucesso!" })
      return response.status(201).json(coin)
    } catch (error) {
      logger.error(error)
      return response.status(400).json({ error: error.message })
    }
  }
}