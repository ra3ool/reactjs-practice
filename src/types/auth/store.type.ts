import { User } from '../user';
import { LoginFormData } from './login.type';

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginFormData) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<void>;
}
