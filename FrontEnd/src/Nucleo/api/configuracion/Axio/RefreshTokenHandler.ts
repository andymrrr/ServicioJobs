import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CONFIG } from './config';
import { TokenData } from './types';
import { TokenManager } from './TokenManager';
import { ErrorHandler } from './ErrorHandler';

// ==================== REFRESH TOKEN HANDLER ====================

export class RefreshTokenHandler {
  static async refreshToken(): Promise<TokenData> {
    const refreshToken = TokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.REFRESH}`, {
      refresh_token: refreshToken
    });

    return response.data;
  }

  static async handleTokenRefresh(
    instance: AxiosInstance, 
    originalRequest: AxiosRequestConfig & { _retry?: boolean }
  ): Promise<AxiosResponse> {
    try {
      const tokenData = await this.refreshToken();
      
      // Actualizar tokens
      TokenManager.setTokens(tokenData);
      
      // Reintentar request original
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${tokenData.access_token}`;
      }
      
      return instance(originalRequest);
    } catch (refreshError) {
      // Si falla el refresh, limpiar tokens y disparar logout
      TokenManager.clearTokens();
      ErrorHandler.dispatchLogoutEvent();
      
      throw refreshError;
    }
  }
} 