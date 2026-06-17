import { User } from '../user';

export interface LoginFormData {
  identifier: string; // email or username
  password: string;
  remember: boolean;
}

export type LoginRequestPayload = {
  password: string;
  remember: boolean;
} & ({ email: string; username?: never } | { username: string; email?: never });

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
  user: User;
}
