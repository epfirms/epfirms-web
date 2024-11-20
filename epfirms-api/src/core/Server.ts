import express from 'express';
import { Express } from 'express';
import { Database } from './Database';
import { Service } from 'typedi';
const {
  SERVER_HOST,
  SERVER_PORT,
  REDIS_HOST,
  REDIS_PORT,
} = require('@configs/vars');
import { stripeWebhookRouter } from './routes/stripewebhook/stribewebhook';
import { v1Router } from './routes/api/v1';
import { webhookRouter } from './routes/webhook/webhook';
import { CommonMiddleware } from '@src/middleware/CommonMiddleware';
import { ErrorHandlingMiddleware } from '../middleware/ErrorHandlingMiddleware';
import { SocketServer } from './SocketServer';

@Service()
export class Server {
  app: Express;

  constructor(
    private _middleware: CommonMiddleware,
    private _errorHandlingMiddleware: ErrorHandlingMiddleware,
    private _socketServer: SocketServer
  ) {
    this.app = express();
    Database.connect();
    Database.start();
    this.intializeUnparsedRoutes();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandlingMiddleware();
    this.start();
  }

  start() {
    const httpServer = this.app.listen(SERVER_PORT, SERVER_HOST, () => {
      console.log(
        `Server  started listening at ${SERVER_HOST} on ${SERVER_PORT} port. Redis: ${REDIS_HOST}:${REDIS_PORT}`,
      );
    });

    this._socketServer.init(httpServer);
  }

  initializeRoutes() {
    this.app.use('/api', v1Router);
  }

  intializeUnparsedRoutes() {
    this.app.use('/webhook', webhookRouter);
    this.app.use('/stripewebhook', stripeWebhookRouter);
  }

  initializeMiddleware() {
    this.app.use(this._middleware.useCompression());
    this.app.use(this._middleware.usePassport());
    this.app.use(this._middleware.useHelmet());
    this.app.use(this._middleware.useBodyParser());
    this.app.use(this._middleware.useURLencoded());
    this.app.use(this._middleware.useCors());
    this.app.use(this._middleware.logRequests());
  }

  initializeErrorHandlingMiddleware() {
    this.app.use(this._errorHandlingMiddleware.handle404Error());
  }
}
