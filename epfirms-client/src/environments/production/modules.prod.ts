import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";

const config: SocketIoConfig = { url: '', options: {path: '/socket', autoConnect: false, transports: ['websocket'], reconnectionAttempts: 10} };

export const extModules = [
    SocketIoModule.forRoot(config),
];