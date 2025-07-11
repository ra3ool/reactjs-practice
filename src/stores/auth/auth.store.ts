import { AuthStore } from '@/types';
import { create } from 'zustand';
import { cookieStorage } from '@/services';
import { api } from '@/clients';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    cookieStorage.set('accessToken', data.accessToken, { secure: true });
    set({ user: data.user, isAuthenticated: true });
  },

  logout: () => {
    cookieStorage.remove('accessToken');
    set({ user: null, isAuthenticated: false });
  },

  initialize: async () => {
    const token = cookieStorage.get('accessToken');
    if (token) {
      try {
        const { data } = await api.get('/auth/me');
        set({ user: data, isAuthenticated: true });
      } catch {
        cookieStorage.remove('accessToken');
      }
    }
  },
}));
