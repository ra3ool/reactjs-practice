import { LoginFormData, RegisterFormData } from '@/types';
import { authSchema } from '@/schemas';
import { authRepository } from '@/repositories';
import { authMappers } from '@/mappers';

export const login = async (data: LoginFormData) => {
  const credentials = authSchema.loginSchema.parse(data);
  const payload = authMappers.toLoginPayload(credentials);
  const response = await authRepository.login(payload);
  const result = authSchema.responseSchema.parse(response);
  result.user.role = 'guest'; //TODO remove after add role to server response
  return result;
};

export const register = async (data: RegisterFormData) => {
  const credentials = authSchema.registerSchema.parse(data);
  const payload = authMappers.toRegisterPayload(credentials);
  const response = await authRepository.register(payload);
  const result = authSchema.responseSchema.parse(response);
  result.user.role = 'guest'; //TODO remove after add role to server response
  return result;
};

export const getCurrentUser = async () => {
  return await authRepository.getCurrentUser();
};

export const logout = async () => {
  return await authRepository.logout();
};
