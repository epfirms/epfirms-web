var express = require("express");

import { Express } from "express";
import { InitializeMiddleWare } from "./InitializeMiddleware";
import { InitializeRoutes } from "./InitializeRoutes";
import { Database } from "./Database";
import * as ServerConfig from "@configs/ServerConfig.json";

export async function server() {
  let app: Express = express();

  let host = ServerConfig.host;
  let port = ServerConfig.port;

  let link = "http://" + host + ":" + port.toString();
  await Database.connect();
  await Database.start();
  await InitializeMiddleWare.InitializeCommonMiddleware(app);
  await InitializeRoutes.Initialize(app);
  await InitializeMiddleWare.InitializeErrorHandlingMiddleware(app);

  app.listen(port, host, () => {
    console.log(`Server  started listening at ${host} on ${port} port.`);
  });

  return Promise.resolve(app);
}
