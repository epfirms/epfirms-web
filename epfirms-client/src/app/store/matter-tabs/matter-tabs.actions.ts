import { createAction, props } from '@ngrx/store';

export const add = createAction('[Matter Tab] Add', props<{payload: number}>());
export const close = createAction('[Matter Tab] Close', props<{payload: number}>());
export const clear = createAction('[Matter Tab] Clear');
export const expand = createAction('[Matter Tab] Expand');
export const minimize = createAction('[Matter Tab] Minimize');
export const toggleExpand = createAction('[Matter Tab] Toggle Expand');