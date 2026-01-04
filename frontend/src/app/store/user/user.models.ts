export interface Store {
  auth: UserState;
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

export interface UserState {
  task: Task[] | null;
}
