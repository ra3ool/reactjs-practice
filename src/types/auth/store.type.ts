import { User } from '../user';
import { LoginFormData, LoginResponse } from './login.type';
import { RegisterFormData } from './register.type';

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginFormData) => Promise<LoginResponse>;
  register: (credentials: RegisterFormData) => Promise<LoginResponse>;
  setLoginData: (data: LoginResponse) => void;
  logout: () => void;
}
