import { authRepository } from '@/repositories';
import { tokenStorage } from './token-storage';
import type { TokenRefreshCallback } from './types';

/**
 * Manages token refresh queue to prevent multiple simultaneous refresh requests
 */
export class TokenRefreshManager {
  private isRefreshing = false;
  private refreshSubscribers: TokenRefreshCallback[] = [];

  /**
   * Subscribe to token refresh completion
   */
  private subscribeTokenRefresh(callback: TokenRefreshCallback): void {
    this.refreshSubscribers.push(callback);
  }

  /**
   * Notify all subscribers when token is refreshed
   */
  private notifyTokenRefreshed(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  /**
   * Check if currently refreshing
   */
  isCurrentlyRefreshing(): boolean {
    return this.isRefreshing;
  }

  /**
   * Add request to refresh queue
   */
  addToRefreshQueue(callback: TokenRefreshCallback): void {
    this.subscribeTokenRefresh(callback);
  }

  /**
   * Attempt to refresh token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    if (this.isRefreshing) {
      // Return a promise that resolves when refresh completes
      return new Promise((resolve) => {
        this.subscribeTokenRefresh(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await authRepository.refreshToken(refreshToken);

      // Store new tokens
      tokenStorage.setAccessToken(accessToken);

      if (newRefreshToken) {
        tokenStorage.setRefreshToken(newRefreshToken);
      }

      // Notify all waiting requests
      this.notifyTokenRefreshed(accessToken);

      return accessToken;
    } catch (error) {
      // Clear tokens on refresh failure
      tokenStorage.clearTokens();
      // TODO: Implement logout logic when authStore is available
      // authStore.logout();
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }
}

export const tokenRefreshManager = new TokenRefreshManager();
