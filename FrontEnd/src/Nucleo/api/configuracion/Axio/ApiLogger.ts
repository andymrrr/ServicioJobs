import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiError } from './types';

// ==================== UTILIDADES DE LOGGING ====================

export class ApiLogger {
  private static readonly isDev = import.meta.env.DEV;

  static logRequest(config: AxiosRequestConfig): void {
    if (!this.isDev) return;
    
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data
    });
  }

  static logResponse(response: AxiosResponse): void {
    if (!this.isDev) return;
    
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
  }

  static logError(error: AxiosError, apiError: ApiError): void {
    if (!this.isDev) return;
    
    console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, apiError);
  }
} 