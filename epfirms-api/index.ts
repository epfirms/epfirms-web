require('module-alias/register')
import { server } from "./src/core/Server";

let epf = server();
export const epfserver = epf;