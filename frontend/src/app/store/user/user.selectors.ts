import { createSelector } from '@ngrx/store';
import { Store } from '../app.state';

export const selectUserState = (state: Store) => state.user;

export const loadedUser = createSelector(
  selectUserState,
  (state) => state.profile
);
