import { createFeature, createReducer, on } from '@ngrx/store';
import { ConnectionState } from '@twilio/conversations';
import { ConversationActions } from './conversation.actions';

export interface ConversationState {
  unreadMessageCount: number | null;
  connectionState: ConnectionState;
  accessToken: string | null;
}

export const initialState: ConversationState = {
  unreadMessageCount: 0,
  connectionState: 'unknown',
  accessToken: null
};

export const conversationFeature = createFeature({
  name: 'conversation',
  reducer: createReducer(
    initialState,
    on(ConversationActions.UpdateUnreadMessageCount, (state, { payload }) => {
      return {
        ...state,
        unreadMessageCount: payload,
      };
    }),
    on(ConversationActions.UpdateConnectionState, (state, { payload }) => {
      return {
        ...state,
        connectionState: payload,
      };
    }),
    on(ConversationActions.IncreaseUnreadMessageCount, (state, { payload }) => {
      return {
        ...state,
        unreadMessageCount: state.unreadMessageCount + payload,
      };
    }),
    on(ConversationActions.DecreaseUnreadMessageCount, (state, { payload }) => {
      return {
        ...state,
        unreadMessageCount: state.unreadMessageCount - payload,
      };
    }),
    on(ConversationActions.SetAccessToken, (state, { payload }) => {
      return {
        ...state,
        accessToken: payload,
      };
    }),
    on(ConversationActions.ClearAccessToken, (state) => {
      return {
        ...state,
        accessToken: null,
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
  selectAccessToken,
} = conversationFeature;
