import { Matter } from '@app/_models/matter';
import { Tabs } from '@app/_models/tabs';
import { EntitySelectorsFactory } from '@ngrx/data';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  add,
  clear,
  close,
  expand,
  minimize,
  toggleExpand,
} from './matter-tabs.actions';

export const initialState: Tabs = {
  expanded: false,
  openTabs: [],
  subtabs: ['tasks', 'activity', 'notes', 'documents', 'intake', 'billing']
};

const _matterTabsReducer = createReducer(
  initialState,
  on(add, (state, { payload }) => {
    const idExists = state.openTabs.includes(payload);

    if (!idExists) {
      return {
        ...state,
        openTabs: [payload, ...state.openTabs],
      };
    }

    return state;
  }),
  on(close, (state, { payload }) => {
    if (state.openTabs.length > 1) {
      return {
        ...state,
        openTabs: state.openTabs.filter((_, index) => index !== payload),
      };
    }

    return {
      ...state,
      expanded: false,
      openTabs: state.openTabs.filter((_, index) => index !== payload),
    };
  }),
  on(clear, (state) => {
    return {
      ...initialState
    };
  }),
  on(expand, (state) => {
    if (!state.expanded) {
      return {
        ...state,
        expanded: true,
      };
    }

    return state;
  }),
  on(minimize, (state) => {
    if (state.expanded) {
      return {
        ...state,
        expanded: false,
      };
    }

    return state;
  }),
  on(toggleExpand, (state) => {
    return {
      ...state,
      expanded: !state.expanded,
    };
  })
);
export const matterSelectors = new EntitySelectorsFactory().create<Matter>('Matter');
const selectTabState = createFeatureSelector<Tabs>('matterTabs');
export const selectOpenTabsState = createSelector(selectTabState, (tabs: Tabs) => tabs.openTabs);
export const selectedOpenTabs = createSelector(matterSelectors.selectEntityMap, selectOpenTabsState, (matters, openTabs) => openTabs.map(t => ({
  ...matters[t]
})))

export function matterTabsReducer(state, action) {
  return _matterTabsReducer(state, action);
}
