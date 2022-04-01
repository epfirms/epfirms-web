import { FirmAccess, UserProfile, UserScope } from '@app/core/interfaces/user-profile';
import { createReducer, createSelector, on } from '@ngrx/store';
import {
  clearCurrentUser,
  loadCurrentUser
} from './current-user.actions';

export interface CurrentUserState {
  user: UserProfile | null;
  scope: UserScope | null;
}

export const initialState: CurrentUserState = {
  user: null,
  scope: null,
};

const _currentUserReducer = createReducer(

  initialState,
  on(loadCurrentUser, (state, { user, scope }) => {
    // if the user has not been defined, define it as the passed in user data
    if (state.user === null) {
      return {
        ...state,
        user: user,
        scope: scope,      
      };
    }
    else {
      return state;
    }
  }),
  on(clearCurrentUser, () => {
      return {
        user: null,
        scope: null
      };
  }),
);

export function currentUserReducer(state, action) {
  return _currentUserReducer(state, action);
}
