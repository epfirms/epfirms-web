import { UserProfile, UserScope } from '@app/core/interfaces/user-profile';
import { createAction, props } from '@ngrx/store';


export const clearCurrentUser = createAction('[Current User] Clear User');
export const loadCurrentUser = createAction('[Current User] Load User', props<{user: UserProfile, scope: UserScope}>());
export const changePortal = createAction('[Current User] Change Portal');
export const logout = createAction('[Current User] Logout');