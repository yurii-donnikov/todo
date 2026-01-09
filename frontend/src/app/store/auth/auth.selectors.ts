import { createSelector } from '@ngrx/store';
import { Store } from '../app.state';

export const selectAuthState = (state: Store) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
