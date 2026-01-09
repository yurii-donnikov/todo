import { AuthState } from './auth';
import { UserState } from './user';
import { TaskState } from './task';

export interface Store {
  auth: AuthState;
  user: UserState;
  task: TaskState;
}
