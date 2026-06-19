import { User } from '../user';
import { LoginFormData, LoginResponse, LogoutResponse } from './login.type';
import { RegisterFormData } from './register.type';

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginFormData) => Promise<LoginResponse | undefined>;
  register: (
    credentials: RegisterFormData,
  ) => Promise<LoginResponse | undefined>;
  setLoginData: (data: LoginResponse) => void;
  updateUser: (user: User) => void;
  getCurrentUser: () => Promise<User | undefined>;
  logout: () => Promise<LogoutResponse>;
  restoreAuth: () => void;
  clearAuth: () => void;
}
