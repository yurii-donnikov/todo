import { UserState } from '../user/user.models';

export interface Store {
  auth: AuthState;
  user: UserState;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  user_id: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
