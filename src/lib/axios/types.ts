import type { AxiosRequestConfig } from 'axios';

/**
 * Extended Axios config to track retry state
 */
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Token refresh response structure
 */
export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

/**
 * Token storage options
 */
export interface TokenStorageOptions {
  expires: number;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
}

/**
 * API error response structure
 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Token refresh callback type
 */
export type TokenRefreshCallback = (token: string) => void;
