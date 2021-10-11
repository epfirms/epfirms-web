import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";

const config: SocketIoConfig = { url: 'https://localhost:4000', options: {autoConnect: false, transports: ['websocket']} };

export const extModules = [
    SocketIoModule.forRoot(config),
];