import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {autoConnect: false, transports: ['websocket']} };

export const extModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    autoPause: true,
  }),
  SocketIoModule.forRoot(config),
];
