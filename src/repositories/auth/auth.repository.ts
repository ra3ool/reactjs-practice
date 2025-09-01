import { authClient } from '@/clients/auth';
import {
  LoginRequestPayload,
  LoginResponse,
  registerRequestPayload,
  User,
} from '@/types';

const authRepository = {
  login: async (payload: LoginRequestPayload): Promise<LoginResponse> => {
    const response = await authClient.post('/auth/signin', payload);
    return response.data;
  },

  register: async (payload: registerRequestPayload): Promise<LoginResponse> => {
    const response = await authClient.post('/auth/signup', payload);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await authClient.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    await authClient.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string) => {
    //TODO implement this later
    return { accessToken: '', refreshToken };
  },
};

export { authRepository };
