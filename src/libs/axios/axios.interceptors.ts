import { authRepository } from '@/repositories/auth';
import { cookieStorage } from '@/repositories/shared';
import { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import {
  onTokenRefreshed,
  subscribeTokenRefresh,
  tokenQueue,
} from './axios.token-queue';
import type { CustomAxiosRequestConfig } from './axios.types';

export function setupInterceptors(api: AxiosInstance) {
  // ============================
  // Request Interceptor
  // ============================
  api.interceptors.request.use(
    (config) => {
      const token = cookieStorage.get('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // ============================
  // Response Interceptor
  // ============================
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest?._retry) {
        const refreshToken = cookieStorage.get('refreshToken');
        if (!refreshToken) {
          // TODO: handle logout
          return Promise.reject(error);
        }

        if (tokenQueue.isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        tokenQueue.isRefreshing = true;

        try {
          const { accessToken, refreshToken: newRefreshToken } =
            await authRepository.refreshToken(refreshToken);

          cookieStorage.set('accessToken', accessToken, {
            expires: 1,
            secure: true,
            sameSite: 'strict',
          });

          if (newRefreshToken) {
            cookieStorage.set('refreshToken', newRefreshToken, {
              expires: 7,
              secure: true,
              sameSite: 'strict',
            });
          }

          onTokenRefreshed(accessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          // TODO: handle logout
          return Promise.reject(refreshError);
        } finally {
          tokenQueue.isRefreshing = false;
        }
      }

      // Handle other errors
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          console.error('Forbidden:', error.response.data);
        } else if (status >= 500) {
          console.error('Server error:', error.response.data);
        }
      } else if (error.code === 'ECONNABORTED') {
        console.error('Request timeout');
      } else {
        console.error('Network error:', error.message);
      }

      return Promise.reject(error);
    },
  );
}
