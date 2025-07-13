import { api } from '@/clients';
import { LoginFormData } from '@/types';
import { authMappers } from '@/mappers';
import { authSchema } from '@/schemas';

export class AuthRepository {
  async login(credentials: LoginFormData) {
    const payload = authMappers.toLoginPayload(credentials);
    const response = await api.post('/auth/signin', payload);
    const data = authSchema.responseSchema.parse(response.data);

    // Convert id to string to match User type
    return {
      ...data,
      user: {
        ...data.user,
        id: String(data.user.id),
      },
    };
  }

  async refreshToken(refreshToken: string) {
    const response = await api.post('/auth/refresh', { refreshToken });
    const data = authSchema.responseSchema.parse(response.data);

    // Convert id to string to match User type
    return {
      ...data,
      user: {
        ...data.user,
        id: String(data.user.id),
      },
    };
  }

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    const user = response.data;

    // Convert id to string to match User type
    return {
      ...user,
      id: String(user.id),
    };
  }

  async logout() {
    await api.post('/auth/logout');
  }
}

export const authRepository = new AuthRepository();
