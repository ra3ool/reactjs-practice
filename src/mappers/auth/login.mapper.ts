import { LoginFormData } from '@/types';

export const toLoginPayload = (data: LoginFormData) => {
  return data.identifier.includes('@')
    ? {
        email: data.identifier,
        password: data.password,
        remember: data.remember,
      }
    : {
        username: data.identifier,
        password: data.password,
        remember: data.remember,
      };
};
