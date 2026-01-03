import { createSelector } from '@ngrx/store';
import { Store } from './auth.models';

export const selectAuthState = (state: Store) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const loadedUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const loadedToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
