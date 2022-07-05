import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { NgxStripeModule } from "ngx-stripe";
import { environment } from "../environment.prod";

const config: SocketIoConfig = { url: '', options: {path: '/socket', autoConnect: false, transports: ['websocket'], reconnectionAttempts: 10} };

export const extModules = [
    SocketIoModule.forRoot(config),
    NgxStripeModule.forRoot('pk_live_mzO5V7qI60RcWnmcIeNdlJ4T009iQBAV7B'),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
];