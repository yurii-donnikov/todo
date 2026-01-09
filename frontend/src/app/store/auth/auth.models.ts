export interface Task {
  id: string;
  title: string;
  status: string;
  user_id: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
