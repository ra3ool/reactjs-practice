import { LoginFormData } from '@/types';
import { authSchema } from '@/schemas';
import { authRepository } from '@/repositories';
import { authMappers } from '@/mappers';

export const login = async (data: LoginFormData) => {
  const credentials = authSchema.loginSchema.parse(data);
  const payload = authMappers.toLoginPayload(credentials);
  const response = await authRepository.login(payload);
  const result = authSchema.responseSchema.parse(response);
  return result;
};

export const getCurrentUser = async () => {
  return await authRepository.getCurrentUser();
};

export const logout = async () => {
  return await authRepository.logout();
};
