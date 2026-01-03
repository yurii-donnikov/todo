import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

import * as UserActions from '../user/user.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
  user: null,
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

  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    loading: false,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, () => initialState),

  on(UserActions.changeSuccess, (state, { user }) => ({
    ...state,
    user,
  }))
);
