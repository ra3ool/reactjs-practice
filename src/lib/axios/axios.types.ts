import type { AxiosRequestConfig } from 'axios';

/**
 * Extended Axios config to track retry state
 */
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
