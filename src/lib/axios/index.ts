import { createApiInstance, validateEnvironment } from './config';
import { ApiErrorHandler, getErrorMessage } from './error-handler';
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from './interceptors';
import { tokenRefreshManager } from './token-manager';
import { tokenStorage } from './token-storage';

// Validate environment on module load
validateEnvironment();

// Create and configure API instance
const api = createApiInstance();

// Setup interceptors
setupRequestInterceptor(api);
setupResponseInterceptor(api);

// Export configured API instance as default
export default api;

// Export utilities and managers for external use
export { ApiErrorHandler, getErrorMessage, tokenRefreshManager, tokenStorage };

// Re-export types for convenience
export type {
  ApiErrorResponse,
  CustomAxiosRequestConfig,
  TokenRefreshCallback,
  TokenRefreshResponse,
  TokenStorageOptions,
} from './types';
