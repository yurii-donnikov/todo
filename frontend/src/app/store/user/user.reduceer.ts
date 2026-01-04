import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.models';

export const initialState: UserState = {
  task: null,
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.getTasksSuccess, (state, data) => ({
    ...state,
    task: data.tasks,
  }))
);
