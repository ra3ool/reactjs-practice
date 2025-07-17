import { api } from '@/clients';
import { LoginRequestPayload, LoginResponse, User } from '@/types';

class AuthRepository {
  async login(credentials: LoginRequestPayload): Promise<LoginResponse> {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async logout() {
    await api.post('/auth/logout');
  }
}

export const authRepository = new AuthRepository();
