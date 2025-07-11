import { LoginFormData } from '@/types';
import { api } from '@/clients';
import { authSchema } from '@/schemas';
import { authMappers } from '@/mappers';

export const loginUser = async (data: LoginFormData) => {
  authSchema.loginSchema.parse(data);
  const payload = authMappers.toLoginPayload(data);
  const response = await api.post(`/auth/signin`, payload);
  return authSchema.responseSchema.parse(response.data);
};
