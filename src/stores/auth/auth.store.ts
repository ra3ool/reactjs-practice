import { AuthStore, LoginFormData, RegisterFormData } from '@/types';
import { create } from 'zustand';
import { authService, cookieStorage } from '@/services';
import { LoginResponse } from '@/types';

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: (() => {
    try {
      const user = cookieStorage.get('user');
      return user ? JSON.parse(user) : null;
    } catch {
      cookieStorage.remove('user');
      return null;
    }
  })(),
  isAuthenticated: (() => {
    try {
      const token = cookieStorage.get('accessToken');
      if (!token || token.split('.').length !== 3) {
        cookieStorage.remove('accessToken');
        return false;
      }
      return true;
    } catch {
      cookieStorage.remove('accessToken');
      return false;
    }
  })(),
  isLoading: false,

  login: async (credentials: LoginFormData) => {
    set({ isLoading: true });
    try {
      const data = await authService.login(credentials);
      get().setLoginData(data);
      return data;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (credentials: RegisterFormData) => {
    set({ isLoading: true });
    try {
      const data = await authService.register(credentials);
      get().setLoginData(data);
      return data;
    } finally {
      set({ isLoading: false });
    }
  },

  setLoginData: (data: LoginResponse) => {
    set({ user: data.user, isAuthenticated: true });
    //TODO use zustand persist later
    cookieStorage.set('accessToken', data.accessToken, {
      expires: 1,
      secure: true,
      sameSite: 'strict',
    });
    cookieStorage.set('user', JSON.stringify(data.user), {
      expires: 1,
      secure: true,
      sameSite: 'strict',
    });
    if (data.refreshToken) {
      cookieStorage.set('refreshToken', data.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }
  },

  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const response = await authService.getCurrentUser();
      set({ user: response, isAuthenticated: true });
      cookieStorage.set('user', JSON.stringify(response), {
        expires: 1,
        secure: true,
        sameSite: 'strict',
      });
      return response;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const response = await authService.logout();
      cookieStorage.remove('accessToken');
      cookieStorage.remove('refreshToken');
      cookieStorage.remove('user');
      set({ user: null, isAuthenticated: false });
      return response;
    } finally {
      set({ isLoading: false });
    }
  },
}));
