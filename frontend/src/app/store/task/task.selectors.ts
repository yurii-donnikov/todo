import { createSelector } from '@ngrx/store';
import { Store } from '../app.state';

export const selectTaskState = (state: Store) => state.task;

export const selectTasks = createSelector(
  selectTaskState,
  (state) => state.list
);

export const selectNewTasks = createSelector(
  selectTaskState,
  (state) => state.list?.filter((task) => task.status === 'new') ?? []
);

export const selectInProgressTasks = createSelector(
  selectTaskState,
  (state) => state.list?.filter((task) => task.status === 'progress') ?? []
);

export const selectDoneTasks = createSelector(
  selectTaskState,
  (state) => state.list?.filter((task) => task.status === 'done') ?? []
);
