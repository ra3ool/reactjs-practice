import axios, { type AxiosInstance } from 'axios';

/**
 * API configuration constants
 */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Create configured Axios instance
 */
export const createApiInstance = (): AxiosInstance => {
  return axios.create(API_CONFIG);
};

/**
 * Environment validation
 */
export const validateEnvironment = (): void => {
  if (!import.meta.env.VITE_APP_BASE_URL) {
    throw new Error('VITE_APP_BASE_URL environment variable is required');
  }
};
