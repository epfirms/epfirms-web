import { staffSelectors } from '@app/store/staff/staff.selectors';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from './task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.State>(
  fromTask.tasksFeatureKey
);

export const selectTasks = createSelector(
  selectTaskState,
  fromTask.selectAll
);

export const selectTasksWithAssignees = createSelector(
  selectTasks,
  staffSelectors.selectEntityMap,
  (tasks, staff) => tasks.map(t => ({
    ...t,
    assignee: staff[t.assignee_id]?.user
  }))
)

export const selectTaskEntities = createSelector(
  selectTaskState,
  fromTask.selectEntities
);