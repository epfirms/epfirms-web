import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSocket from './socket.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SocketEffects } from './socket.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromSocket.socketFeatureKey, fromSocket.reducer),
    EffectsModule.forFeature([SocketEffects])
  ]
})
export class SocketModule { }
