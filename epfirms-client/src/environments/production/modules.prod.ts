import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { NgxStripeModule } from "ngx-stripe";

const config: SocketIoConfig = { url: '', options: {path: '/socket', autoConnect: false, transports: ['websocket'], reconnectionAttempts: 10} };

export const extModules = [
    SocketIoModule.forRoot(config),
    NgxStripeModule.forRoot('pk_live_mzO5V7qI60RcWnmcIeNdlJ4T009iQBAV7B'),
];