import { createAction, props } from '@ngrx/store';
import { ConnectionState } from '@twilio/conversations';

const Init = createAction('[Conversation] Initialize Client');
const InitSuccess = createAction('[Conversation] Initialize Client Success');

const Connect = createAction('[Conversation] Connect');
const UpdateUnreadMessageCount = createAction(
  '[Conversation] Update Unread Message Count',
  props<{ payload: number }>(),
);
const UpdateConnectionState = createAction(
  '[Conversation] Update Connection State',
  props<{ payload: ConnectionState }>(),
);
const LoadUnreadMessageCount = createAction('[Conversation] Load Unread Message Count');
const LoadConversations = createAction('[Conversation] Load Conversations');
const IncreaseUnreadMessageCount = createAction(
  '[Conversation] Increase Unread Message Count',
  props<{ payload: number }>(),
);
const DecreaseUnreadMessageCount = createAction(
  '[Conversation] Decrease Unread Message Count',
  props<{ payload: number }>(),
);

const SetAccessToken = createAction(
  '[Conversation] Set Access Token',
  props<{ payload: string }>(),
);

const UpdateAccessToken = createAction('[Conversation] Update Access Token');
const ClearAccessToken = createAction('[Conversation] Clear Access Token');

const SyncUserProfile = createAction('[Conversation] User Profile Synced');

export const ConversationActions = {
  Init,
  InitSuccess,
  Connect,
  UpdateUnreadMessageCount,
  UpdateConnectionState,
  UpdateAccessToken,
  LoadUnreadMessageCount,
  LoadConversations,
  IncreaseUnreadMessageCount,
  DecreaseUnreadMessageCount,
  SetAccessToken,
  ClearAccessToken,
  SyncUserProfile
};
