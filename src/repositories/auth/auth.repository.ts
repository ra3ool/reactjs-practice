import { api } from '@/clients';
import {
  LoginRequestPayload,
  LoginResponse,
  registerRequestPayload,
  User,
} from '@/types';

const authRepository = {
  login: async (payload: LoginRequestPayload): Promise<LoginResponse> => {
    const response = await api.post('/auth/signin', payload);
    return response.data;
  },

  register: async (payload: registerRequestPayload): Promise<LoginResponse> => {
    const response = await api.post('/auth/signup', payload);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string) => {
    //TODO implement this later
    return { accessToken: '', refreshToken };
  },
};

export { authRepository };
