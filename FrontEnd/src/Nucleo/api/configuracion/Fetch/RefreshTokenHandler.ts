import { FETCH_CONFIG } from './config';
import { TokenData } from './types';
import { FetchTokenManager } from './TokenManager';
import { FetchErrorHandler } from './ErrorHandler';

// ==================== REFRESH TOKEN HANDLER FETCH ====================

export class FetchRefreshTokenHandler {
  static async refreshToken(): Promise<TokenData> {
    const refreshToken = FetchTokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${FETCH_CONFIG.BASE_URL}${FETCH_CONFIG.ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: {
        ...FETCH_CONFIG.DEFAULT_HEADERS
      },
      body: JSON.stringify({
        refresh_token: refreshToken
      })
    });

    if (!response.ok) {
      const error = await FetchErrorHandler.createFetchError(response, FETCH_CONFIG.ENDPOINTS.REFRESH);
      throw error;
    }

    return await response.json();
  }

  static async handleTokenRefresh(originalRequest: () => Promise<Response>): Promise<Response> {
    try {
      const tokenData = await this.refreshToken();
      
      // Actualizar tokens
      FetchTokenManager.setTokens(tokenData);
      
      // Reintentar request original
      return await originalRequest();
    } catch (refreshError) {
      // Si falla el refresh, limpiar tokens y disparar logout
      FetchTokenManager.clearTokens();
      FetchErrorHandler.dispatchLogoutEvent();
      
      throw refreshError;
    }
  }
} 