import { AuthStore, LoginFormData, RegisterFormData } from '@/types';
import { create } from 'zustand';
import { authService, cookieStorage } from '@/services';
import { LoginResponse } from '@/types';

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: async (credentials: LoginFormData) => {
    const data = await authService.login(credentials);
    get().setLoginData(data);
    return data;
  },

  register: async (credentials: RegisterFormData) => {
    console.log('credentials :', credentials);
  },

  setLoginData: (data: LoginResponse) => {
    set({ user: data.user, isAuthenticated: true });

    cookieStorage.set('accessToken', data.accessToken, {
      expires: 1, // 1 day
      secure: true,
      sameSite: 'strict',
    });

    if (data.refreshToken) {
      cookieStorage.set('refreshToken', data.refreshToken, {
        expires: 7, // 7 days
        secure: true,
        sameSite: 'strict',
      });
    }
  },

  getCurrentUser: async () => {
    const response = await authService.getCurrentUser();
    return response;
  },

  logout: async () => {
    const response = await authService.logout();
    cookieStorage.remove('accessToken');
    cookieStorage.remove('refreshToken');
    set({ user: null, isAuthenticated: false });
    return response;
  },
}));
