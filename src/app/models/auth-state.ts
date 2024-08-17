import { User } from './user';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoading: boolean;
}
