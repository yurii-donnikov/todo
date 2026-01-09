export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserState {
  profile: User | null;
}
