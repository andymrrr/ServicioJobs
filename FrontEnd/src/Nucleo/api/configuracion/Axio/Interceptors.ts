import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { TokenManager } from './TokenManager';
import { ApiLogger } from './ApiLogger';
import { ErrorHandler } from './ErrorHandler';
import { RefreshTokenHandler } from './RefreshTokenHandler';

// ==================== INTERCEPTORES ====================

export class RequestInterceptor {
  static setup(instance: AxiosInstance, withAuth: boolean): void {
    instance.interceptors.request.use(
      (config) => {
        if (withAuth) {
          const token = TokenManager.getToken();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        
        ApiLogger.logRequest(config);
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}

export class ResponseInterceptor {
  static setup(instance: AxiosInstance, withAuth: boolean): void {
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        ApiLogger.logResponse(response);
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        
        // Intentar refresh si es necesario
        if (ErrorHandler.shouldRetryWithRefresh(error, originalRequest) && withAuth) {
          originalRequest._retry = true;
          
          try {
            return await RefreshTokenHandler.handleTokenRefresh(instance, originalRequest);
          } catch (refreshError) {
            // El refresh falló, continuar con el error original
          }
        }

        // Crear y loggear error formateado
        const apiError = ErrorHandler.createApiError(error);
        ApiLogger.logError(error, apiError);
        
        return Promise.reject(apiError);
      }
    );
  }
} 