import { Request, Response } from "express";
import { logger } from "src/utils/logger";

export class createCoinController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.body;

    try {
      logger.info({ message: "createCoinController::handle", })
      return response.status(201).json({})

    } catch (error) {
      logger.error(error)
      return response.status(400).json({})
    }
  }
}