import { Server as SocketIO } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClient } from 'redis';
import { Logger } from '@utils/logger/Logger';
import { Service } from 'typedi';
const {
  REDIS_HOST,
  REDIS_PORT,
  COMMIT_ID,
} = require('@configs/vars');
import { AuthFirebaseService } from '@src/modules/auth/services/auth-firebase.service';

@Service()
export class SocketServer {
  io: SocketIO;

  constructor(private authService: AuthFirebaseService) {}

  init(httpServer) {
    this.io = new SocketIO(httpServer, {
      cors: {
        origin: '*/*',
      },
      path: '/socket',
      transports: ['websocket'],
    });

    this._setAdapter();
    this._start();
  }

  private _setAdapter() {
    const pubClient = new RedisClient({ host: REDIS_HOST, port: REDIS_PORT });
    const subClient = pubClient.duplicate();
    this.io.adapter(createAdapter(pubClient, subClient));
  }



  private _start() {
    // Parent namespace in the form of firm-#
    const firmWorkspace = this.io.of(/^\/firm-\d+$/);

    // Middleware to authorize a user's credentials via auth token
    firmWorkspace.use(this._authCheck);

    // Namespace connection handler
    firmWorkspace.on('connection', (socket) => {
      let logger = Logger.getLogger();
      logger.info(
        `Socket connected to workspace: ${socket.nsp.name} (${socket.handshake.auth.token})`,
      );

      socket.emit(`app:version`, COMMIT_ID);

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

      socket.on('disconnect', (socket) => {
        console.log(socket, ' disconnect');
      });
    });

    return Promise.resolve(this.io);
  }

  _authCheck = async (socket, next) => {
    try {
      const requestedNamespace = socket.nsp.name;
      const authorizedNamespace = await this.getSocketRoom(socket.handshake.auth.token);
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
    } catch(err) {
      console.log(err);
    }
  }

  getSocketRoom = async (token) => {
      let logger = Logger.getLogger();
      try {
    
        const decodedIdToken = await this.authService.verifyIdToken(token);
        logger.info(decodedIdToken);
        if (!decodedIdToken.id) {
          throw decodedIdToken;
        }
    
        if (!decodedIdToken.firm_access) {
          throw decodedIdToken;
        }
        return `/firm-${decodedIdToken.firm_access.firm_id}`;
      } catch (err) {
        logger.info(err);
        return null;
      }
    }
}