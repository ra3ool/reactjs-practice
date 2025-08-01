import { api } from '@/clients';
import {
  LoginRequestPayload,
  LoginResponse,
  registerRequestPayload,
  User,
} from '@/types';

class AuthRepository {
  async login(credentials: LoginRequestPayload): Promise<LoginResponse> {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  }

  async register(credentials: registerRequestPayload): Promise<LoginResponse> {
    const response = await api.post('/auth/signup', credentials);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async logout() {
    await api.post('/auth/logout');
  }

  async refreshToken(refreshToken: string) {
    //TODO implement this later
    return { accessToken: '', refreshToken };
  }
}

export const authRepository = new AuthRepository();
