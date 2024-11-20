import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLoading = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.error
);

export const selectAuthenticated = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.authenticated
);