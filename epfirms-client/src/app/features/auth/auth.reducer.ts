import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  loading: boolean;
  error: string | null;
  authenticated: boolean;
}

export const initialState: State = {
  loading: false,
  error: null,
  authenticated: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.signIn, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.signInSuccess, (state, { authenticated }) => ({
    ...state,
    loading: false,
    authenticated,
  })),
  on(AuthActions.signInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    authenticated: false,
    error,
  })),
  on(AuthActions.signOut, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.signOutSuccess, (state) => ({
    ...state,
    loading: false,
    authenticated: false,
  })),
  on(AuthActions.signOutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.syncUserProfile, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.syncUserProfileSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(AuthActions.syncUserProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
