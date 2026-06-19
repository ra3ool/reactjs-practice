import { cryptoStorage } from '@/libs';
import { authService } from '@/services';
import { tokenService } from '@/services/auth/token.service';
import type { AuthStore } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      const clearAuth = () => {
        tokenService.clearTokens();

        set({
          user: null,
          isAuthenticated: false,
        });
      };

      const checkIsAuthenticated = () => tokenService.hasValidAccessToken();

      return {
        user: null,
        isAuthenticated: false,
        clearAuth,

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
          set({
            user: data.user,
            isAuthenticated: true,
          });

          tokenService.setTokens(data.accessToken, data.refreshToken);
        },

        updateUser: (user) => set({ user }),

        getCurrentUser: async () => {
          const user = await authService.getCurrentUser();
          set({ user, isAuthenticated: true });
          return user;
        },

        logout: async () => {
          const refreshToken = tokenService.getRefreshToken();
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
