import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCoinUseCase } from "../../services/delete/deleteCoin";

export class DeleteCoinController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const createCoinService = container.resolve(DeleteCoinUseCase)
      const coin = await createCoinService.execute(id)
      return response.status(204).json(coin)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}