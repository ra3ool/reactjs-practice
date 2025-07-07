import { LoginFormData } from '@/types/auth/login.type';
import axios from 'axios';
import { authSchema } from '@/schemas';
import { authMappers } from '@/mappers';

const baseUrl = import.meta.env.VITE_AUTH_BASE_URL;

export const loginUser = async (data: LoginFormData) => {
  authSchema.loginSchema.parse(data);
  const payload = authMappers.toLoginPayload(data);
  const response = await axios.post(`${baseUrl}/auth/signin`, payload);
  return authSchema.responseSchema.parse(response.data);
};
