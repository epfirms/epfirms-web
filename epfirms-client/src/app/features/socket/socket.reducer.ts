import { createReducer, on } from '@ngrx/store';
import * as SocketActions from './socket.actions';

export const socketFeatureKey = 'socket';

export interface State {
  loading: boolean;
  error: string | null;
  connected: boolean;
  namespace: string | null;
}

export const initialState: State = {
  loading: false,
  error: null, 
  connected: false,
  namespace: null
};

export const reducer = createReducer(
  initialState,
  on(SocketActions.connectSocket, state => ({
    ...state,
    loading: true
  })),
  on(SocketActions.connectSocketSuccess, (state, action) => ({
    ...state,
    loading: false,
    connected: true,
    namespace: action.namespace
  })),
  on(SocketActions.connectSocketFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
    connected: false,
    namespace: null
  })),

);
