import { AxiosError } from 'axios';
import { ApiError } from './types';
import { TokenManager } from './TokenManager';

// ==================== MANEJO DE ERRORES ====================

export class ErrorHandler {
  static createApiError(error: AxiosError): ApiError {
    const responseData = error.response?.data as any;
    
    return {
      message: responseData?.message || error.message || 'Error desconocido',
      status: error.response?.status,
      data: error.response?.data,
      code: responseData?.code || error.code
    };
  }

  static shouldRetryWithRefresh(error: AxiosError, originalRequest: any): boolean {
    return error.response?.status === 401 && 
           !originalRequest._retry && 
           !!TokenManager.getRefreshToken();
  }

  static dispatchLogoutEvent(): void {
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }
} 