import { NextFunction, Request, Response } from 'express';
import { UserRepository } from 'src/modules/users/repositories/userRespository';
import { logger } from 'src/utils/logger';
import AppError from '../error/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const usersRepository = new UserRepository();
  const user = await usersRepository.findById(id);

  if (user.admin !== true) {
    logger.error('Usuário não possui permissão de administrador');
    throw new AppError('Usuário não possui permissão de administrador', 401);
  }

  return next();
}
