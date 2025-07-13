import { LoginFormData } from '@/types';
import { authSchema } from '@/schemas';
import { authRepository } from '@/repositories';

export const loginUser = async (data: LoginFormData) => {
  authSchema.loginSchema.parse(data);

  // Use repository to handle the API call
  const response = await authRepository.login(data);
  return response;
};
