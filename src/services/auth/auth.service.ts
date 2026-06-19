import { authMappers } from '@/mappers';
import { authRepository } from '@/repositories';
import { authSchema } from '@/schemas';
import type {
  LoginFormData,
  LoginResponse,
  RefreshTokenResponse,
  RegisterFormData,
  User,
} from '@/types';
import { ZodError } from 'zod';

export const authService = {
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    try {
      const credentials = authSchema.loginSchema.parse(data);
      const payload = authMappers.toLoginPayload(credentials);
      const response = await authRepository.login(payload);
      return authSchema.responseSchema.parse(response) as LoginResponse;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.message}`);
      }
      throw error;
    }
  },

  register: async (data: RegisterFormData): Promise<LoginResponse> => {
    try {
      const credentials = authSchema.registerSchema.parse(data);
      const payload = authMappers.toRegisterPayload(credentials);
      const response = await authRepository.register(payload);
      return authSchema.responseSchema.parse(response) as LoginResponse;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Validation error: ${error.message}`);
      }
      throw error;
    }
  },

  getCurrentUser: async (): Promise<User> => {
    return authRepository.getCurrentUser();
  },

  logout: async (refreshToken?: string) => {
    try {
      if (refreshToken) {
        return await authRepository.logout(refreshToken);
      }

      return {
        message: 'Logged out successfully',
      };
    } catch (error) {
      console.error('Logout API error:', error);
      return {
        message: error instanceof Error ? error.message : 'Logout failed',
      };
    }
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return authRepository.refreshToken(refreshToken);
  },
};
