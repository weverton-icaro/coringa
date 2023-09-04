import cors from 'cors';
import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import 'reflect-metadata';
import { dataBaseConnection } from 'src/shared/infra/typeorm';
import { config } from '../../../config/api';
import { logger } from '../../utils/logger';
import AppError from '../error/AppError';
import { router } from '../routes';

import '../../shared/container';

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.init();
  }

  private async init() {
    this.setupExpress();
    this.setupRoutes();
    this.errors();
    await this.dataBase();
  }

  private setupExpress() {
    this.app.set('port', config.SERVER.PORT || this.port || 3001);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      morgan('combined', {
        stream: {
          write: (message: string) => {
            logger.info(message);
          },
        },
      }),
    );
    this.app.use(
      cors({
        origin: config.SERVER.BASEPATH == '/api' ? config.ALLOW_DOMAINS : '*',
      }),
    );
  }

  private setupRoutes() {
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use(router);
  }

  private errors() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        logger.error(err.message);
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({ message: err.message });
        }
        return response.status(500).json({
          status: 'error',
          message: `Internal server error - ${err.message}`,
        });
      },
    );
  }

  private async dataBase() {
    await dataBaseConnection;
  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(
        `${config.SERVER.NAME}, rodando na porta ${this.app.get(
          'port',
        )} e processo ${process.pid}`,
      );
    });
  }
}
