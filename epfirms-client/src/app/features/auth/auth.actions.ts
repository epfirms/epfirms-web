import { createAction, props } from '@ngrx/store';
import { AuthLoginCredential } from './interfaces/auth.interface';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ credential: AuthLoginCredential }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ authenticated: boolean }>()
);

export const signInFailure = createAction(
  '[Auth] Sign In Failure',
  props<{ error: string }>()
);

export const signOut = createAction(
  '[Auth] Sign Out'
);

export const signOutSuccess = createAction(
  '[Auth] Sign Out Success'
);

export const signOutFailure = createAction(
  '[Auth] Sign Out Failure',
  props<{ error: string }>()
);

export const syncUserProfile = createAction(
  '[Auth] Sync User Profile',
  props<{ user: any}>()
);

export const syncUserProfileSuccess = createAction(
  '[Auth] Sync User Profile Success'
);

export const syncUserProfileFailure = createAction(
  '[Auth] Sync User Profile Failure',
  props<{ error: string }>()
);

export const idTokenChanged = createAction(
  '[@angular/fire/auth] ID Token Changed',
  props<{ idToken: string | null}>()
);

export const AuthActions = {
  signIn,
  signInSuccess,
  signInFailure,
  signOut,
  signOutSuccess,
  signOutFailure,
  syncUserProfile,
  syncUserProfileSuccess,
  syncUserProfileFailure,
  idTokenChanged
};