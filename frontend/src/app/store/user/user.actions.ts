import { createAction, props } from '@ngrx/store';
import { User, Task } from './user.models';

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

export const getTasks = createAction('[Tasks] Get Tasks');

export const getTasksSuccess = createAction(
  '[Tasks] Get Tasks Success',
  props<{ tasks: Task[] }>()
);

export const getTasksFailure = createAction(
  '[Tasks] Get Tasks Failure',
  props<{ error: string }>()
);
