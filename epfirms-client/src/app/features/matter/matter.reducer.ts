import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Matter } from './matter.model';
import * as MatterActions from './matter.actions';

export const mattersFeatureKey = 'matters';

export interface State extends EntityState<Matter> {
  // additional entities state properties
  selectedMatter: number | null;
  loading: boolean;
  sort: {
    column: string | null;
    direction: 'asc' | 'desc' | null;
  }
}

export const adapter: EntityAdapter<Matter> = createEntityAdapter<Matter>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedMatter: null,
  loading: false,
  sort: {
    column: 'task',
    direction: 'asc'
  }
});

export const reducer = createReducer(
  initialState,
  on(MatterActions.addMatter,
    (state, action) => adapter.addOne(action.matter, state)
  ),
  on(MatterActions.upsertMatter,
    (state, action) => adapter.upsertOne(action.matter, state)
  ),
  on(MatterActions.addMatters,
    (state, action) => adapter.addMany(action.matters, state)
  ),
  on(MatterActions.upsertMatters,
    (state, action) => adapter.upsertMany(action.matters, state)
  ),
  on(MatterActions.updateMatter,
    (state, action) => adapter.updateOne(action.matter, state)
  ),
  on(MatterActions.updateMatters,
    (state, action) => adapter.updateMany(action.matters, state)
  ),
  on(MatterActions.deleteMatter,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(MatterActions.deleteMatters,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(MatterActions.loadMattersSuccess,
    (state, action) => adapter.setAll(action.matters, state)
  ),
  on(MatterActions.clearMatters,
    state => adapter.removeAll(state)
  ),
  on(MatterActions.updateSort,
    (state, action) => ({...state, sort: {
      column: state.sort.direction === 'desc' ? null : action.sort.column,
      direction: !state.sort.direction ? 'asc' : state.sort.direction === 'asc' ? 'desc' : null
    } })
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectSort = (state: State) => state.sort;
