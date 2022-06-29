import { Matter } from '@app/core/interfaces/matter';
import { Tabs } from '@app/core/interfaces/tabs';
import { EntitySelectorsFactory } from '@ngrx/data';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  add,
  clear,
  close,
  expand,
  minimize,
  setSelectedIndex,
  toggleExpand,
} from './matter-tabs.actions';

export const initialState: Tabs = {
  selectedIndex: null,
  expanded: false,
  openTabs: [],
  subtabs: ['tasks', 'activity', 'notes', 'documents', 'intake', 'billing' ],
};

const _matterTabsReducer = createReducer(
  initialState,
  on(add, (state, { payload }) => {
    const existingIndex = state.openTabs.indexOf(payload);

    if (existingIndex < 0) {
      return {
        ...state,
        openTabs: [...state.openTabs, payload],
        selectedIndex: state.openTabs.length + 1,
      };
    }

    return {
      ...state,
      selectedIndex: existingIndex,
    };
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
  on(clear, () => {
    return {
      ...initialState,
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
  }),
  on(setSelectedIndex, (state, { payload }) => {
    return {
      ...state,
      selectedIndex: payload,
    };
  }),
);

export function matterTabsReducer(state, action) {
  return _matterTabsReducer(state, action);
}

export const matterSelectors = new EntitySelectorsFactory().create<Matter>('Matter');
const selectTabState = createFeatureSelector<Tabs>('matterTabs');
export const selectOpenTabsState = createSelector(selectTabState, (tabs: Tabs) => tabs.openTabs);
export const selectedOpenTabs = createSelector(
  matterSelectors.selectEntityMap,
  selectOpenTabsState,
  (matters, openTabs) =>
    openTabs.map((t) => ({
      ...matters[t],
    })),
);
