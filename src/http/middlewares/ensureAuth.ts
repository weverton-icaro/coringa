import 'dotenv/config';
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from 'src/modules/users/repositories/userRespository';
import { logger } from 'src/utils/logger';
import AppError from '../error/AppError';

interface ITokenPayload {
  token: string;
  userId: string;
}

export async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token inválido", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await new Promise<ITokenPayload>((resolve, reject) => {
      verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as ITokenPayload);
        }
      });
    });

    const { userId } = decoded;

    const id = Number(userId)

    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    request.user = {
      id,
    };

    return next();
  } catch (err) {
    logger.error(err.message)
    throw new AppError(`Token inválido: ${err.message}`, 401);
  }
}
