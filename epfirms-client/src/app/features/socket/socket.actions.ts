import { createAction, props } from '@ngrx/store';

export const connectSocket = createAction(
  '[Socket] Connect Socket'
);

export const connectSocketSuccess = createAction(
  '[Socket] Connect Socket Success',
  props<{ namespace: string }>()
);

export const connectSocketFailure = createAction(
  '[Socket] Connect Socket Failure',
  props<{ error: any }>()
);

export const disconnectSocket = createAction(
  '[Socket] Disconnect Socket'
);

export const disconnectSocketSuccess = createAction(
  '[Socket] Disconnect Socket Success'
);

export const disconnectSocketFailure = createAction(
  '[Socket] Disconnect Socket Failure',
  props<{ error: any }>()
);