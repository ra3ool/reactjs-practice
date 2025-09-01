import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from './types';

/**
 * Centralized error handler for API responses
 */
export class ApiErrorHandler {
  /**
   * Handle HTTP response errors
   */
  static handleResponseError(error: AxiosError): void {
    if (!error.response) {
      this.handleNetworkError(error);
      return;
    }

    const status = error.response.status;
    const errorData = error.response.data as ApiErrorResponse;

    switch (status) {
      case 400:
        this.handleBadRequest(errorData);
        break;
      case 403:
        this.handleForbidden(errorData);
        break;
      case 404:
        this.handleNotFound(errorData);
        break;
      case 422:
        this.handleValidationError(errorData);
        break;
      case 429:
        this.handleRateLimit(errorData);
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        this.handleServerError(status, errorData);
        break;
      default:
        this.handleUnknownError(status, errorData);
    }
  }

  /**
   * Handle network-related errors
   */
  private static handleNetworkError(error: AxiosError): void {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - please try again');
    } else if (error.code === 'ERR_NETWORK') {
      console.error('Network error - check your connection');
    } else {
      console.error('Network error:', error.message);
    }
  }

  /**
   * Handle 400 Bad Request
   */
  private static handleBadRequest(errorData: ApiErrorResponse): void {
    console.error('Bad Request:', errorData.message || 'Invalid request');
  }

  /**
   * Handle 403 Forbidden
   */
  private static handleForbidden(errorData: ApiErrorResponse): void {
    console.error('Forbidden:', errorData.message || 'Access denied');
  }

  /**
   * Handle 404 Not Found
   */
  private static handleNotFound(errorData: ApiErrorResponse): void {
    console.error('Not Found:', errorData.message || 'Resource not found');
  }

  /**
   * Handle 422 Validation Error
   */
  private static handleValidationError(errorData: ApiErrorResponse): void {
    console.error(
      'Validation Error:',
      errorData.message || 'Invalid data provided',
    );
    if (errorData.details) {
      console.error('Validation Details:', errorData.details);
    }
  }

  /**
   * Handle 429 Rate Limit
   */
  private static handleRateLimit(errorData: ApiErrorResponse): void {
    console.error('Rate Limit:', errorData.message || 'Too many requests');
  }

  /**
   * Handle 5xx Server Errors
   */
  private static handleServerError(
    status: number,
    errorData: ApiErrorResponse,
  ): void {
    console.error(
      `Server Error (${status}):`,
      errorData.message || 'Internal server error',
    );
  }

  /**
   * Handle unknown errors
   */
  private static handleUnknownError(
    status: number,
    errorData: ApiErrorResponse,
  ): void {
    console.error(
      `Unknown Error (${status}):`,
      errorData.message || 'An unexpected error occurred',
    );
  }
}

/**
 * Utility function to extract error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred';
};
