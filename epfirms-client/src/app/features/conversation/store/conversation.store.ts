import { createFeature, createReducer, on } from '@ngrx/store';
import { ConnectionState, State } from '@twilio/conversations';
import {
  decreaseUnreadMessageCount,
  increaseUnreadMessageCount,
  updateClientState,
  updateConnectionState,
  updateUnreadMessageCount,
} from './conversation.actions';

export interface ConversationState {
  clientState: State | null;
  unreadMessageCount: number | null;
  connectionState: ConnectionState;
}

export const initialState: ConversationState = {
  clientState: null,
  unreadMessageCount: 0,
  connectionState: 'unknown',
};

export const conversationFeature = createFeature({
  name: 'conversation',
  reducer: createReducer(
    initialState,
    on(updateUnreadMessageCount, (state, { unreadMessageCount }) => {
      return {
        ...state,
        unreadMessageCount,
      };
    }),
    on(updateConnectionState, (state, { connectionState }) => {
      return {
        ...state,
        connectionState,
      };
    }),
    on(updateClientState, (state, { clientState }) => {
      return {
        ...state,
        clientState,
      };
    }),
    on(increaseUnreadMessageCount, (state, { payload }) => {
      return {
        ...state,
        unreadMessageCount: state.unreadMessageCount + payload,
      };
    }),
    on(decreaseUnreadMessageCount, (state, { payload }) => {
      return {
        ...state,
        unreadMessageCount: state.unreadMessageCount - payload,
      };
    }),
  ),
});

export const {
  name,
  reducer,
  selectConversationState,
  selectConnectionState,
  selectUnreadMessageCount,
  selectClientState,
} = conversationFeature;
