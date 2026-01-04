import { createSelector } from '@ngrx/store';
import { Store } from '../auth/auth.models';

export const selectUserState = (state: Store) => state.user;

export const selectTasks = createSelector(
  selectUserState,
  (state) => state.task
);
