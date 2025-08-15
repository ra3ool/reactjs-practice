import { authMappers } from '@/mappers';
import { authRepository } from '@/repositories';
import { authSchema } from '@/schemas';
import { LoginFormData, LoginResponse, RegisterFormData, User } from '@/types';

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
    return await authRepository.logout();
  },
};
