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
