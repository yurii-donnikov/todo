import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export const updateUser = createAction(
  '[User] Update User',
  props<{ name: string; email: string }>()
);

export const updateUserSuccess = createAction(
  '[User] Change Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User] Change Failure',
  props<{ error: string }>()
);
