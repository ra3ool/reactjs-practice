import { authClient } from '@/clients/auth';
import type {
  LoginRequestPayload,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  registerRequestPayload,
  User,
} from '@/types';

const authRepository = {
  login: async (payload: LoginRequestPayload): Promise<LoginResponse> => {
    const response = await authClient.post('/auth/signin', payload);
    return response?.data;
  },

  register: async (payload: registerRequestPayload): Promise<LoginResponse> => {
    const response = await authClient.post('/auth/signup', payload);
    return response?.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await authClient.get('/auth/me');
    return response?.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await authClient.post('/auth/logout');
    return response?.data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await authClient.post('/auth/refresh');
    return response?.data;
  },
};

export { authRepository };
