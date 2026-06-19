import { tokenNames } from '@/constants';
import { cookieStorage } from '@/services';

export const tokenService = {
  setTokens(accessToken: string, refreshToken?: string) {
    cookieStorage.set(tokenNames.accessToken, accessToken, {
      expires: 1,
      secure: true,
      sameSite: 'strict',
    });

    if (refreshToken) {
      cookieStorage.set(tokenNames.refreshToken, refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      });
    }
  },

  getAccessToken() {
    return cookieStorage.get(tokenNames.accessToken);
  },

  getRefreshToken() {
    return cookieStorage.get(tokenNames.refreshToken);
  },

  clearTokens() {
    cookieStorage.remove(tokenNames.accessToken);
    cookieStorage.remove(tokenNames.refreshToken);
  },

  hasValidAccessToken() {
    const token = this.getAccessToken();

    return !!token && token.split('.').length === 3;
  },
};
