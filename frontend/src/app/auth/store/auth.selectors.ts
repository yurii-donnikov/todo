import { createSelector } from '@ngrx/store';

export const selectAuthState = (state: any) => state.auth;

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
