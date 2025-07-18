import { RegisterFormData } from '@/types';

export const toRegisterPayload = (data: RegisterFormData) => {
  const { username, email, password, terms } = data;
  return { username, email, password, terms };
};
