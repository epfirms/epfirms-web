var express = require("express");
const { SERVER_HOST, SERVER_PORT } = require('@configs/vars');
import { Express } from "express";
import { InitializeMiddleWare } from "./InitializeMiddleware";
import { InitializeRoutes } from "./InitializeRoutes";
import { Database } from "./Database";

export async function server() {
  let app: Express = express();

  let host = SERVER_HOST;
  let port = SERVER_PORT;

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
