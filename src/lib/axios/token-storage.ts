import { cookieStorage } from '@/services/shared';
import type { Storage } from '@/types';
import type { TokenStorageOptions } from './types';
/**
 * Token storage service with abstraction layer
 */
export class TokenStorage {
  private storage: Storage;

  constructor() {
    this.storage = cookieStorage;
  }

  /**
   * Get access token from storage
   */
  getAccessToken() {
    return this.storage.get('accessToken');
  }

  /**
   * Get refresh token from storage
   */
  getRefreshToken() {
    return this.storage.get('refreshToken');
  }

  /**
   * Store access token
   */
  setAccessToken(token: string) {
    const options: TokenStorageOptions = {
      expires: 1, // 1 day
      secure: true,
      sameSite: 'strict',
    };
    this.storage.set('accessToken', token, options);
  }

  /**
   * Store refresh token
   */
  setRefreshToken(token: string) {
    const options: TokenStorageOptions = {
      expires: 7, // 7 days
      secure: true,
      sameSite: 'strict',
    };
    this.storage.set('refreshToken', token, options);
  }

  /**
   * Remove access token
   */
  removeAccessToken() {
    this.storage.remove('accessToken');
  }

  /**
   * Remove refresh token
   */
  removeRefreshToken() {
    this.storage.remove('refreshToken');
  }

  /**
   * Clear all tokens
   */
  clearTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  /**
   * Check if user has valid tokens
   */
  hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }
}

export const tokenStorage = new TokenStorage();
