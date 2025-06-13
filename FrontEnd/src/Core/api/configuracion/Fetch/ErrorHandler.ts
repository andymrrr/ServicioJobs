import { FetchError } from './types';
import { FetchTokenManager } from './TokenManager';

// ==================== MANEJO DE ERRORES FETCH ====================

export class FetchErrorHandler {
  static async createFetchError(response: Response, _url: string): Promise<FetchError> {
    let data: any = null;
    let message = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
        message = data?.message || message;
      } else {
        data = await response.text();
      }
    } catch {
      // Si no se puede parsear el response, usar el mensaje por defecto
    }
    
    return {
      message,
      status: response.status,
      data,
      code: data?.code
    };
  }

  static createNetworkError(error: Error, url: string): FetchError {
    return {
      message: error.message || 'Error de red',
      code: 'NETWORK_ERROR',
      data: { url, originalError: error.name }
    };
  }

  static createTimeoutError(url: string): FetchError {
    return {
      message: 'Tiempo de espera agotado',
      code: 'TIMEOUT_ERROR',
      data: { url }
    };
  }

  static shouldRetryWithRefresh(response: Response): boolean {
    return response.status === 401 && !!FetchTokenManager.getRefreshToken();
  }

  static dispatchLogoutEvent(): void {
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }
} 