import { tokenNames } from '@/constants';
import { cryptoStorage } from '@/libs';
import { authService, cookieStorage } from '@/services';
import type { AuthStore } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      const clearAuth = () => {
        cookieStorage.remove(tokenNames.accessToken);
        cookieStorage.remove(tokenNames.refreshToken);
        set({ user: null, isAuthenticated: false });
      };

      const checkIsAuthenticated = (): boolean => {
        const token = cookieStorage.get(tokenNames.accessToken);
        // TODO: use jwt-decode checker later
        return !(!token || token.split('.').length !== 3);
      };

      return {
        user: null,
        isAuthenticated: false,

        login: async (credentials) => {
          const data = await authService.login(credentials);
          get().setLoginData(data);
          return data;
        },

        register: async (credentials) => {
          const data = await authService.register(credentials);
          get().setLoginData(data);
          return data;
        },

        setLoginData: (data) => {
          set({ isAuthenticated: true, user: data.user });
          cookieStorage.set(tokenNames.accessToken, data.accessToken, {
            expires: 1,
            secure: true,
            sameSite: 'strict',
          });
          if (data.refreshToken) {
            cookieStorage.set(tokenNames.refreshToken, data.refreshToken, {
              expires: 7,
              secure: true,
              sameSite: 'strict',
            });
          }
        },

        updateUser: (user) => set({ user }),

        getCurrentUser: async () => {
          const user = await authService.getCurrentUser();
          set({ user, isAuthenticated: true });
          return user;
        },

        logout: async () => {
          const refreshToken = cookieStorage.get(tokenNames.refreshToken);
          const result = await authService.logout(refreshToken || undefined);
          clearAuth();
          return result;
        },

        restoreAuth: () => {
          if (checkIsAuthenticated()) {
            set({ isAuthenticated: true });
          } else {
            clearAuth();
          }
        },
      };
    },
    {
      name: 'auth',
      // storage: createJSONStorage(() => localStorage), //default localStorage
      storage: cryptoStorage(import.meta.env.VITE_ENCRYPT_KEY),
      partialize: (state) => ({
        user: state.user,
        // Only persist user, not auth status (derived from token)
      }),
      onRehydrateStorage: (state) => (_, error) => {
        if (error) console.error('Rehydration failed:', error);
        state.restoreAuth();
      },
    },
  ),
);
