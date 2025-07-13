import { cookieStorage } from '@/services';
import { useAuthStore } from '@/stores/auth/auth.store';
import { authRepository } from '@/repositories';
import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosError['config'] & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (originalRequest) {
        originalRequest._retry = true;
      }

      try {
        const refreshToken = cookieStorage.get('refreshToken');

        if (!refreshToken) {
          // No refresh token available, logout user
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        // Attempt to refresh the token
        const response = await authRepository.refreshToken(refreshToken);

        const { accessToken, refreshToken: newRefreshToken } = response;

        // Store new tokens
        cookieStorage.set('accessToken', accessToken, {
          expires: 1, // 1 day
          secure: true,
          sameSite: 'strict',
        });

        if (newRefreshToken) {
          cookieStorage.set('refreshToken', newRefreshToken, {
            expires: 7, // 7 days
            secure: true,
            sameSite: 'strict',
          });
        }

        // Update authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        if (originalRequest?.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error('Access forbidden:', error.response.data);
    } else if (error.response?.status && error.response.status >= 500) {
      // Server errors
      console.error('Server error:', error.response.data);
    } else if (!error.response) {
      // Network errors
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
