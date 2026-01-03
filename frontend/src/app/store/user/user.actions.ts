import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export const changeUser = createAction(
  '[User] Change User',
  props<{ name: string; email: string }>()
);

export const changeSuccess = createAction(
  '[User] Change Success',
  props<{ user: User }>()
);

export const changeFailure = createAction(
  '[User] Change Failure',
  props<{ error: string }>()
);
