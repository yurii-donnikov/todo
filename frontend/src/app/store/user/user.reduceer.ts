import {
  createReducer,
  //on
} from '@ngrx/store';
//import * as UserActions from './user.actions';
import { AuthState } from './user.models';

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState

  //   on(AuthActions.login, (state) => ({
  //     ...state,
  //     loading: true,
  //     error: null,
  //   })),

  // on(UserActions.changeSuccess, (state, { user }) => ({
  //   ...state,
  //   user,
  // }))

  //   on(AuthActions.loginFailure, (state, { error }) => ({
  //     ...state,
  //     loading: false,
  //     error,
  //   })),

  //   on(AuthActions.logout, () => initialState)
);
