import { authService, cookieStorage } from '@/services';
import {
  AuthStore,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  User,
} from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
        user: null,
        isAuthenticated: (() => {
          try {
            const token = cookieStorage.get('accessToken');
            if (!token || token.split('.').length !== 3) {
              cookieStorage.remove('accessToken');
              // set({ user: null }); //TODO fix this error (override store)
              return false;
            }
            return true;
          } catch {
            cookieStorage.remove('accessToken');
            // set({ user: null });
            return false;
          }
        })(),

        login: async (credentials: LoginFormData) => {
          try {
            const data = await authService.login(credentials);
            get().setLoginData(data);
            return data;
          } catch (error) {
            console.log('error :', error);
          }
        },

        register: async (credentials: RegisterFormData) => {
          try {
            const data = await authService.register(credentials);
            get().setLoginData(data);
            return data;
          } catch (error) {
            console.log('error :', error);
          }
        },

        setLoginData: (data: LoginResponse) => {
          set({ isAuthenticated: true });
          get().updateUser(data.user);

          cookieStorage.set('accessToken', data.accessToken, {
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

        updateUser: (user: User) => {
          set({ user });
        },

        getCurrentUser: async () => {
          try {
            const response = await authService.getCurrentUser();
            set({ user: response, isAuthenticated: true });
            return response;
          } catch (error) {
            console.log('error :', error);
          }
        },

        logout: async () => {
          // const response = await authService.logout();
          cookieStorage.remove('accessToken');
          cookieStorage.remove('refreshToken');
          set({ user: null, isAuthenticated: false });
          return { status: 'ok', message: 'you logged out successfully' };
        },
    }),
    {
      //TODO add hash with crypto-js later, if needed :)
      name: 'auth',
      storage: createJSONStorage(() => localStorage), //default localStorage
      partialize: (state) => ({
        user: state.user,
        // add other fields to persist or remove to persist all states
        // default: (state) => state
      }),
    },
  ),
);
