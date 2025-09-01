import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApiErrorHandler } from './error-handler';
import { tokenRefreshManager } from './token-manager';
import { tokenStorage } from './token-storage';
import type { CustomAxiosRequestConfig } from './types';

/**
 * Request interceptor to attach access token
 */
export const setupRequestInterceptor = (apiInstance: AxiosInstance): void => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = tokenStorage.getAccessToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
};

/**
 * Response interceptor to handle errors and token refresh
 */
export const setupResponseInterceptor = (apiInstance: AxiosInstance): void => {
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // Handle 401 Unauthorized with token refresh
      if (error.response?.status === 401 && !originalRequest?._retry) {
        return handleUnauthorizedError(apiInstance, originalRequest);
      }

      // Handle other errors
      ApiErrorHandler.handleResponseError(error);
      return Promise.reject(error);
    },
  );
};

/**
 * Handle 401 Unauthorized errors with token refresh logic
 */
const handleUnauthorizedError = async (
  apiInstance: AxiosInstance,
  originalRequest: CustomAxiosRequestConfig,
): Promise<AxiosResponse> => {
  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    // No refresh token available, user needs to login
    tokenStorage.clearTokens();
    // TODO: Trigger logout when authStore is available
    throw new Error('Authentication required');
  }

  // Mark request as retry to prevent infinite loops
  originalRequest._retry = true;

  try {
    // Handle refresh queue
    if (tokenRefreshManager.isCurrentlyRefreshing()) {
      return new Promise((resolve) => {
        tokenRefreshManager.addToRefreshQueue((newToken: string) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(apiInstance(originalRequest));
        });
      });
    }

    // Attempt token refresh
    const newAccessToken = await tokenRefreshManager.refreshToken();

    // Update original request with new token
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    // Retry original request
    return apiInstance(originalRequest);
  } catch (refreshError) {
    tokenStorage.clearTokens();
    // TODO: Trigger logout when authStore is available
    return Promise.reject(refreshError);
  }
};
