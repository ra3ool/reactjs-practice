import { cookieStorage } from '@/services';
import { useAuthStore } from '@/stores/auth/auth.store';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = cookieStorage.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = cookieStorage.get('refreshToken');
        const response = await api.post('/auth/refresh', { refreshToken });
        cookieStorage.set('accessToken', response.data.accessToken, {
          expires: 1, // 1 day
          secure: true,
          sameSite: 'strict',
        });
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
