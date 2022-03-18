import { createAction, props } from '@ngrx/store';
import { ConnectionState, State } from '@twilio/conversations';

export const init = createAction('[Conversation] Initialize Client');
export const connect = createAction('[Conversation] Connect');
export const updateUnreadMessageCount = createAction(
  '[Conversation] Update Unread Message Count',
  props<{ unreadMessageCount: number }>(),
);
export const updateConnectionState = createAction(
  '[Conversation] Update Connection State',
  props<{ connectionState: ConnectionState }>(),
);
export const updateAccessToken = createAction('[Conversation] Update Access Token');
export const updateClientState = createAction(
  '[Conversation] Update Client State',
  props<{ clientState: State }>(),
);
export const loadUnreadMessageCount = createAction('[Conversation] Load Unread Message Count');
export const loadConversations = createAction('[Conversation] Load Conversations');
export const increaseUnreadMessageCount = createAction(
  '[Conversation] Increase Unread Message Count',
  props<{ payload: number }>(),
);
export const decreaseUnreadMessageCount = createAction(
  '[Conversation] Decrease Unread Message Count',
  props<{ payload: number }>(),
);
