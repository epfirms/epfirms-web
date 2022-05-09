import express from 'express';
import { Express } from 'express';
import { Database } from './Database';
import { Server as SocketServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClient } from 'redis';
import { Logger } from '@utils/logger/Logger';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
const {
  SERVER_HOST,
  SERVER_PORT,
  REDIS_HOST,
  REDIS_PORT,
  JWT_SECRET,
  COMMIT_ID,
} = require('@configs/vars');
import { stripeWebhookRouter } from './routes/stripewebhook/stribewebhook';
import { v1Router } from './routes/api/v1';
import { webhookRouter } from './routes/webhook/webhook';
import { CommonMiddleware } from '@src/middleware/CommonMiddleware';
import { ErrorHandlingMiddleware } from '../middleware/ErrorHandlingMiddleware';

@Service()
export class Server {
  app: Express;

  constructor(
    private _middleware: CommonMiddleware,
    private _errorHandlingMiddleware: ErrorHandlingMiddleware,
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

    socketServer(httpServer);
  }

  initializeRoutes() {
    this.app.use('/api', v1Router);
    this.app.use('/webhook', webhookRouter);
  }

  intializeUnparsedRoutes() {
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

export function socketServer(httpServer) {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: '*/*',
    },
    path: '/socket',
    transports: ['websocket'],
  });
  const pubClient = new RedisClient({ host: REDIS_HOST, port: REDIS_PORT });
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));

  // Parent namespace in the form of firm-#
  const firmWorkspace = io.of(/^\/firm-\d+$/);

  // Middleware to authorize a user's credentials via auth token
  firmWorkspace.use((socket, next) => {
    const requestedNamespace = socket.nsp.name;
    const authorizedNamespace = getSocketRoom(socket.handshake.auth.token);
    const isValid = requestedNamespace === authorizedNamespace;

    if (isValid) {
      next();
    } else {
      const err = new Error('not authorized');
      let logger = Logger.getLogger();
      logger.info(`Error connecting to socket room.`);
      if (socket.handshake?.auth?.token) {
        logger.info(`Token: ${socket.handshake.auth.token}`);
      } else {
        logger.info(`No token found in socket.handshake.auth.token`);
      }
      next(err);
    }
  });

  // Namespace connection handler
  firmWorkspace.on('connection', (socket) => {
    let logger = Logger.getLogger();
    logger.info(
      `Socket connected to workspace: ${socket.nsp.name} (${socket.handshake.auth.token})`,
    );

    socket.emit(`app:version`, COMMIT_ID);
    // Firm namespace
    const namespace = socket.nsp;

    // User connected 'http' request
    // socket.on('request', async (message) => {
    //   try {
    //   console.log(message);
    //   const accessToken = socket.handshake.auth.token;
    //   const response = await axios({
    //     headers: {'Authorization': `Bearer ${accessToken}`},
    //     method: message.method,
    //     url: message.url,
    //     data: message.data,
    //     baseURL: `http://${SERVER_HOST}:${SERVER_PORT}`
    //   });

    // Emit status to socket who sent request
    // console.log(response);
    // socket.emit('request', {
    //   status: response.status,
    //   statusText: response.statusText
    // });

    //TODO: If successful, emit update to namespace. Else, emit error to sending socket
    // let action;
    // if (message.method === 'post') {
    //   action = 'add-one'
    // } else if (message.method === 'patch') {
    // action = ''
    // }

    // Emit new entity to everyone connected to the firm namespace. Example, 'add-one:client'
    //   namespace.emit(`${action}:${message.name}`, {
    //     data: response.data
    //   })
    // } catch (err) {
    //   console.log(err.message);
    // }
    // });
    socket.on('add', (message) => {
      socket.broadcast.emit(`add:${message.name}`, message.data);
      // namespace.emit(`add:${message.name}`, message.data);
    });

    socket.on('update', (message) => {
      socket.broadcast.emit(`update:${message.name}`, message.data);
    });

    socket.on('delete', (message) => {
      socket.broadcast.emit(`delete:${message.name}`, message.data);
    });

    socket.on('test', (test) => {
      console.log(test);
      console.log(io.engine.clientsCount);
      console.log(io.of('/').sockets.size);
      namespace.to('room1').emit('response', { msg: 'test received' });
    });

    socket.on('disconnect', (socket) => {
      console.log(socket, ' disconnect');
    });
  });

  return Promise.resolve(io);
}

function getSocketRoom(token) {
  let logger = Logger.getLogger();
  try {
    const jwtPayload: any = jwt.verify(token, JWT_SECRET);

    if (!jwtPayload.id) {
      throw jwtPayload;
    }

    if (!jwtPayload.firm_access) {
      throw jwtPayload;
    }

    return `/firm-${jwtPayload.firm_access.firm_id}`;
  } catch (err) {
    logger.info(err);
    return null;
  }
}
