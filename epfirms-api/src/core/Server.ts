var express = require("express");
const { SERVER_HOST, SERVER_PORT, REDIS_HOST, REDIS_PORT } = require('@configs/vars');
import { Express } from "express";
import { InitializeMiddleWare } from "./InitializeMiddleware";
import { InitializeRoutes } from "./InitializeRoutes";
import { Database } from "./Database";

import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClient } from 'redis';
import { Logger } from "@utils/logger/Logger";
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('@configs/vars');
const axios = require("axios").default;

export async function server() {
  let app: Express = express();

  let host = SERVER_HOST;
  let port = SERVER_PORT;

  await Database.connect();
  await Database.start();
  await InitializeMiddleWare.InitializeCommonMiddleware(app);
  await InitializeRoutes.Initialize(app);
  await InitializeMiddleWare.InitializeErrorHandlingMiddleware(app);

  const httpServer = app.listen(port, host, () => {
    console.log(`Server  started listening at ${host} on ${port} port. Redis: ${REDIS_HOST}:${REDIS_PORT}`);
  });

  await socketServer(httpServer);

  return Promise.resolve(app);
}

export async function socketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*/*'
    },
    transports: ['websocket']
  });
  const pubClient = new RedisClient({ host: REDIS_HOST, port: REDIS_PORT });
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));

  // Parent namespace in the form of firm-#
  const firmWorkspace = io.of(/^\/firm-\d+$/)

  // Middleware to authorize a user's credentials via auth token
  firmWorkspace.use((socket, next) => {
    const isValid = getSocketRoom(socket.handshake.auth.token);

    if (isValid) {
      next();
    } else {
      const err = new Error("not authorized");
      let logger = Logger.getLogger();
      logger.info("not authorized");
      next(err);
    }
  });
  
  // Namespace connection handler
  firmWorkspace.on("connection", socket => {
    let logger = Logger.getLogger();
    logger.info("Socket connected to workspace");
    logger.info(socket)

    console.log("Socket connected");
    console.log("----------------");

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
    socket.on('add', message => {
      namespace.emit(`add:${message.name}`, message.data)
    });

    socket.on('update', message => {
      namespace.emit(`update:${message.name}`, message.data)
    });

    socket.on('delete', message => {
      namespace.emit(`delete:${message.name}`, message.data)
    })

    socket.on('test', test => {
      console.log(test);
      console.log(io.engine.clientsCount);
      console.log(io.of('/').sockets.size);
      namespace.to('room1').emit('response', {msg: 'test received'});
    })

    socket.on("disconnect", socket => {
      console.log(socket, ' disconnect')
    })
  });

  return Promise.resolve(io);
}

function getSocketRoom(token): string {
  return jwt.verify(token, JWT_SECRET, function (err, user) {
    if (err) {
      return null;
    }

    if (!user.id) {
      return null
    }

    if (!user.firm_access) {
      return null;
    }

    return `/firm-${user.firm_access.firm_id}`;
  });
}