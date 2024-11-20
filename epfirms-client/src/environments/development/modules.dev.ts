import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environment.dev';

const config: SocketIoConfig = { url: 'http://localhost:4000', options: {path:'/socket', autoConnect: false, transports: ['websocket']} };

export const extModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    autoPause: true,
  }),
  SocketIoModule.forRoot(config),
  NgxStripeModule.forRoot('pk_test_NaQ0K78jrNRGyacbblmpM2RW00mvwDjEh6'),
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFirestoreModule,
];
