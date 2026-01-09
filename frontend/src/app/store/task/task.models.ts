export interface TaskState {
  list: Task[] | null;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  user_id: string;
}
