import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSocket from './socket.reducer';

export const selectSocketState = createFeatureSelector<fromSocket.State>(
  fromSocket.socketFeatureKey
);
