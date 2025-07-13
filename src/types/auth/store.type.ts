import { User } from '../user';
import { LoginFormData, LoginResponse } from './login.type';

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginFormData) => Promise<void>;
  setLoginData: (data: LoginResponse) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}
