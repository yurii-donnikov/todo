import { createAction, props } from '@ngrx/store';
import { Task } from './index';

export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>()
);

export const createTasks = createAction(
  '[Tasks] Create Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task; id: string }>()
);
