import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";

const config: SocketIoConfig = { url: null, options: {autoConnect: false, transports: ['websocket']} };

export const extModules = [
    SocketIoModule.forRoot(config),
];