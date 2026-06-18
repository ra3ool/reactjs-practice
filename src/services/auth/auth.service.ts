import { authMappers } from '@/mappers';
import { authRepository } from '@/repositories';
import { authSchema } from '@/schemas';
import type {
  LoginFormData,
  LoginResponse,
  LogoutResponse,
  RegisterFormData,
  User,
} from '@/types';

export const authService = {
  login: async (data: LoginFormData) => {
    const credentials = authSchema.loginSchema.parse(data);
    const payload = authMappers.toLoginPayload(credentials);
    const response = await authRepository.login(payload);
    const result = authSchema.responseSchema.parse(response);
    return result as LoginResponse;
  },

  register: async (data: RegisterFormData) => {
    const credentials = authSchema.registerSchema.parse(data);
    const payload = authMappers.toRegisterPayload(credentials);
    const response = await authRepository.register(payload);
    const result = authSchema.responseSchema.parse(response);
    return result as LoginResponse;
  },

  getCurrentUser: async (): Promise<User> => {
    return await authRepository.getCurrentUser();
  },

  logout: async () => {
    try {
      const result = await authRepository.logout();
      return result as LogoutResponse;
    } catch (error) {
      console.error('Logout API error:', error);
    }
    return { message: '', user: {} } as LogoutResponse;
  },

  refreshToken: async () => {
    const response = await authRepository.refreshToken();
    return response;
  },
};
