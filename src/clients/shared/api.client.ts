import { setupInterceptors } from '@/lib/axios';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

/**
 * Create a new Axios client with shared interceptors
 */
const createApiClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...config, // override defaults (e.g., baseURL)
  });

  setupInterceptors(api);

  return api;
};

export const apiClient = createApiClient();
export default createApiClient;
