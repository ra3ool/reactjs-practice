import { AuthStore } from '@/types';
import { create } from 'zustand';
import { cookieStorage } from '@/services';
import { authRepository } from '@/repositories';
import { LoginResponse } from '@/types/auth/login.type';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (credentials) => {
    const data = await authRepository.login(credentials);

    // Store both access and refresh tokens
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

    set({ user: data.user, isAuthenticated: true });
  },

  setLoginData: (data: LoginResponse) => {
    // Store both access and refresh tokens
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

    set({ user: data.user, isAuthenticated: true });
  },

  logout: () => {
    // Remove both tokens
    cookieStorage.remove('accessToken');
    cookieStorage.remove('refreshToken');
    set({ user: null, isAuthenticated: false });
  },

  initialize: async () => {
    const token = cookieStorage.get('accessToken');
    if (token) {
      try {
        const user = await authRepository.getCurrentUser();
        set({ user, isAuthenticated: true });
      } catch {
        // If token is invalid, clear all auth data
        cookieStorage.remove('accessToken');
        cookieStorage.remove('refreshToken');
        set({ user: null, isAuthenticated: false });
      }
    }
  },
}));
