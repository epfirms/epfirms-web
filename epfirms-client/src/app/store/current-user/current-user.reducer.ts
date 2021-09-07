import { Tabs } from '@app/_models/tabs';
import { createReducer, on } from '@ngrx/store';
import { MergeScanOperator } from 'rxjs/internal/operators/mergeScan';
import {
  clearCurrentUser,
  loadCurrentUser
} from './current-user.actions';

export const initialState: any = {
  user: undefined,
  scope: undefined,
};

const _currentUserReducer = createReducer(

  initialState,
  on(loadCurrentUser, (state, { user, scope }) => {
    // if the user has not been defined, define it as the passed in user data
    if (state.user === undefined) {
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
  on(clearCurrentUser, (state) => {
      return {
        user: undefined
      };
  }),
);

export function currentUserReducer(state, action) {
  return _currentUserReducer(state, action);
}
