import { clientSelectors } from '@app/store/client/client.selector';
import { legalAreaSelectors } from '@app/store/legal-area/legal-area.selectors';
import { staffSelectors } from '@app/store/staff/staff.selectors';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from '../task/task.model';
import { selectTaskEntities, selectTasks, selectTasksWithAssignees } from '../task/task.selectors';
import { Matter } from './matter.model';
import * as fromMatter from './matter.reducer';

export const matterSelectors = createFeatureSelector<fromMatter.State>(
  fromMatter.mattersFeatureKey,
);

export const selectMatters = createSelector(matterSelectors, fromMatter.selectAll);

export const selectMatterEntities = createSelector(matterSelectors, fromMatter.selectEntities);

export const selectLoading = createSelector(
  matterSelectors,
  (state: fromMatter.State) => state.loading,
);

export const selectDenormalizedMatters = createSelector(
  selectMatters,
  selectTaskEntities,
  staffSelectors.selectEntityMap,
  legalAreaSelectors.selectEntityMap,
  clientSelectors.selectEntityMap,
  (matters: Matter[], tasks: Dictionary<Task>, staff, legalArea, clients) =>
    matters.map((matter) => ({
      ...matter,
      // matter_tasks: tasks.filter((t) => t.matter_id === matter.id),
      next_task: tasks[matter.next_task_id],
      attorney: staff[matter.attorney_id],
      legal_area: legalArea[matter.legal_area_id],
      client: clients[matter.client_id],
      spouse: clients[matter.spouse_id],
      opposing_counsel: clients[matter.opposing_counsel_id],
      point_of_contact: clients[matter.point_of_contact_id]
    })),
);

export const selectLeads = createSelector(
  selectDenormalizedMatters,
  (matters) => matters.filter(m => m.matter_type === 'lead')
)

export const selectCases = createSelector(
  selectDenormalizedMatters,
  (matters) => matters.filter(m => m.matter_type === 'case')
)

export const selectSortValues = createSelector(
  matterSelectors,
  fromMatter.selectSort
);