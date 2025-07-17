import { LoginFormData } from '@/types';

export const toLoginPayload = (data: LoginFormData) => {
  const isEmail = data.identifier.includes('@');
  return {
    ...(isEmail ? { email: data.identifier } : { username: data.identifier }),
    password: data.password,
    remember: data.remember,
  };
};
