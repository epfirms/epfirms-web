import {  createFeature, createReducer, on } from '@ngrx/store';
import { ConnectionState } from '@twilio/conversations';
import { updateConnectionState, updateUnreadMessageCount } from './conversation.actions';

export interface ConversationState {
  unreadMessageCount: number;
  connectionState: ConnectionState;
}

export const initialState: ConversationState = {
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
    })
  ),
});

export const {
  name,
  reducer,
  selectConversationState,
  selectConnectionState,
  selectUnreadMessageCount,
} = conversationFeature;
