import { AuthStore, LoginFormData, RegisterFormData } from '@/types';
import { create } from 'zustand';
import { authService, cookieStorage } from '@/services';
import { LoginResponse } from '@/types';

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials: LoginFormData) => {
    set({ isLoading: true });
    const data = await authService.login(credentials);
    set({ isLoading: false });
    get().setLoginData(data);
    return data;
  },

  register: async (credentials: RegisterFormData) => {
    set({ isLoading: true });
    const data = await authService.register(credentials);
    set({ isLoading: false });
    get().setLoginData(data);
    return data;
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
    set({ isLoading: true });
    const response = await authService.getCurrentUser();
    set({ isLoading: false });
    return response;
  },

  logout: async () => {
    set({ isLoading: true });
    const response = await authService.logout();
    set({ isLoading: false });
    cookieStorage.remove('accessToken');
    cookieStorage.remove('refreshToken');
    set({ user: null, isAuthenticated: false });
    return response;
  },
}));
