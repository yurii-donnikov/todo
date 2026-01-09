import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './index';
import { AuthState } from './index';

export const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    loading: false,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, () => initialState)
);
