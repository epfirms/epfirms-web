import { createAction, props } from '@ngrx/store';
import { ConnectionState } from '@twilio/conversations';

export const connect = createAction('[Conversation] Connect');
export const updateUnreadMessageCount = createAction('[Conversation] Update Unread Message Count', props<{unreadMessageCount: number}>());
export const updateConnectionState = createAction('[Conversation] Update Connection State', props<{connectionState: ConnectionState}>());
export const updateAccessToken = createAction('[Conversation] Update Access Token');