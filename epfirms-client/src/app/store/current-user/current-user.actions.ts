import { createAction, props } from '@ngrx/store';


export const clearCurrentUser = createAction('[Current User] Clear User');
export const loadCurrentUser = createAction('[Current User] Load User', props<{user: any, scope: any}>());
export const changePortal = createAction('[Current User] Change Portal');
export const logout = createAction('[Current User] Logout');