import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './index';
import { TaskState } from './index';

export const initialState: TaskState = {
  list: null,
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.loadTasksSuccess, (state, data) => ({
    ...state,
    list: data.tasks,
  }))
);
