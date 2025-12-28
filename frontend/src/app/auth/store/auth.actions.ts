import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const registration = createAction(
  '[Auth] Registration',
  props<{ email: string; password: string; name: string }>()
);

export const autoLogin = createAction(
  '[Auth] Init',
  props<{ token: string }>()
);
