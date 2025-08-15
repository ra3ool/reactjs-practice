import { authService, cookieStorage } from '@/services';
import { AuthStore, LoginResponse } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      const clearAuth = () => {
        cookieStorage.remove('accessToken');
        cookieStorage.remove('refreshToken');
        set({ user: null, isAuthenticated: false });
      };

      const checkIsAuthenticated = (): boolean => {
        const token = cookieStorage.get('accessToken');
        //TODO use jwt-decode later
        return !(!token || token.split('.').length !== 3);
      };

      return {
        user: null,
        isAuthenticated: false,

        login: async (credentials) => {
          const data: LoginResponse = await authService.login(credentials);
          get().setLoginData(data);
          return data;
        },

        register: async (credentials) => {
          const data: LoginResponse = await authService.register(credentials);
          get().setLoginData(data);
          return data;
        },

        setLoginData: (data) => {
          set({ isAuthenticated: true, user: data.user });
          cookieStorage.set('accessToken', data.accessToken, { expires: 1 });
          if (data.refreshToken) {
            cookieStorage.set('refreshToken', data.refreshToken, {
              expires: 7,
            });
          }
        },

        updateUser: (user) => set({ user }),

        getCurrentUser: async () => {
          const response = await authService.getCurrentUser();
          set({ user: response, isAuthenticated: true });
          return response;
        },

        logout: async () => {
          clearAuth();
          return { status: 'ok', message: 'you logged out successfully' };
        },

        restoreAuth: () => {
          if (checkIsAuthenticated()) set({ isAuthenticated: true });
          else clearAuth();
        },
      };
    },
    {
      //TODO add hash with crypto-js later, if needed :)
      name: 'auth',
      storage: createJSONStorage(() => localStorage), //default localStorage
      partialize: (state) => ({
        user: state.user,
        // add other fields to persist or remove to persist all states
        // default: (state) => state
      }),
      onRehydrateStorage: (state) => {
        return (_rehydratedState, error) => {
          if (error) {
            console.error('Rehydration failed:', error);
          } else {
            state.restoreAuth();
          }
        };
      },
    },
  ),
);
