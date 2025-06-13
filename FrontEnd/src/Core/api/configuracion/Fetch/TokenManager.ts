import { FETCH_CONFIG } from './config';
import { TokenData } from './types';

// ==================== GESTIÓN DE TOKENS FETCH ====================

export class FetchTokenManager {
  private static readonly TOKEN_KEY = FETCH_CONFIG.TOKEN_KEYS.ACCESS;
  private static readonly REFRESH_TOKEN_KEY = FETCH_CONFIG.TOKEN_KEYS.REFRESH;

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  static setTokens(tokenData: TokenData): void {
    this.setToken(tokenData.access_token);
    if (tokenData.refresh_token) {
      this.setRefreshToken(tokenData.refresh_token);
    }
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
} 