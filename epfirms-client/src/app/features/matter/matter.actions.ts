import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Matter } from './matter.model';

export const loadMatters = createAction(
  '[Matter/API] Load Matters'
);

export const loadMattersSuccess = createAction(
  '[Matter/API] Load Matters Success',
  props<{ matters: Matter[] }>(),
);

export const loadMattersFailure = createAction(
  '[Matter/API] Load Matters Failure',
  props<{ error: string }>(),
);

export const addMatter = createAction('[Matter/API] Add Matter', props<{ matter: Matter }>());

export const upsertMatter = createAction('[Matter/API] Upsert Matter', props<{ matter: Matter }>());

export const addMatters = createAction('[Matter/API] Add Matters', props<{ matters: Matter[] }>());

export const upsertMatters = createAction(
  '[Matter/API] Upsert Matters',
  props<{ matters: Matter[] }>(),
);

export const updateMatter = createAction(
  '[Matter/API] Update Matter',
  props<{ matter: Update<Matter> }>(),
);

export const updateMatters = createAction(
  '[Matter/API] Update Matters',
  props<{ matters: Update<Matter>[] }>(),
);

export const deleteMatter = createAction('[Matter/API] Delete Matter', props<{ id: string }>());

export const deleteMatters = createAction(
  '[Matter/API] Delete Matters',
  props<{ ids: string[] }>(),
);

export const clearMatters = createAction('[Matter/API] Clear Matters');

export const updateSort = createAction(
  '[Matter] Update sort order',
  props<{ sort: {
    column: string | null;
    direction: 'asc' | 'desc' | null;
  } }>(),
);

export const MatterActions = {
  loadMatters,
  loadMattersSuccess,
  loadMattersFailure,
  addMatter,
  upsertMatter,
  addMatters,
  upsertMatters,
  updateMatter,
  updateMatters,
  deleteMatter,
  deleteMatters,
  clearMatters,
  updateSort
};
