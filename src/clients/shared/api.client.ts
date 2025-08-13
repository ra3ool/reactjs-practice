import { authRepository } from '@/repositories';
import { authService, cookieStorage } from '@/services';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

/**
 * Extended Axios config to track retry state
 */
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Create API instance
 */
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// =========================================================
// Refresh Token Queue (prevents multiple refresh requests)
// =========================================================
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// =========================================================
// Request Interceptor: Attach access token
// =========================================================
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

// =========================================================
// Response Interceptor: Handle errors & token refresh
// =========================================================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // ============================
    // Handle 401 Unauthorized
    // ============================
    if (error.response?.status === 401 && !originalRequest?._retry) {
      const refreshToken = cookieStorage.get('refreshToken');

      if (!refreshToken) {
        authService.logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Wait for ongoing refresh
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
      isRefreshing = true;

      try {
        const { accessToken, refreshToken: newRefreshToken } =
          await authRepository.refreshToken(refreshToken);

        // Store tokens
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

        // Notify queued requests
        onTokenRefreshed(accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ============================
    // Other Errors
    // ============================
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

export default api;
