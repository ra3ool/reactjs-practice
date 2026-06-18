import { authClient } from '@/clients/auth';
import type {
  LoginRequestPayload,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterRequestPayload,
  User,
} from '@/types';

const authRepository = {
  login: async (payload: LoginRequestPayload): Promise<LoginResponse> => {
    const response = await authClient.post<LoginResponse>(
      '/auth/signin',
      payload,
    );
    return response.data;
  },

  register: async (payload: RegisterRequestPayload): Promise<LoginResponse> => {
    const response = await authClient.post<LoginResponse>(
      '/auth/signup',
      payload,
    );
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await authClient.get<User>('/auth/me');
    return response.data;
  },

  logout: async (refreshToken?: string): Promise<LogoutResponse> => {
    const response = await authClient.post<LogoutResponse>('/auth/logout', {
      refreshToken,
    });
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await authClient.post<RefreshTokenResponse>(
      '/auth/refresh',
      { refreshToken },
    );
    return response.data;
  },
};

export { authRepository };
