import { FetchError, RequestOptions } from './types';

// ==================== UTILIDADES DE LOGGING FETCH ====================

export class FetchLogger {
  private static readonly isDev = import.meta.env.DEV;

  static logRequest(url: string, options: RequestOptions): void {
    if (!this.isDev) return;
    
    console.log(`🚀 ${options.method?.toUpperCase() || 'GET'} ${url}`, {
      headers: options.headers,
      body: options.body
    });
  }

  static logResponse(url: string, method: string, response: Response, data?: any): void {
    if (!this.isDev) return;
    
    console.log(`✅ ${method.toUpperCase()} ${url}`, {
      status: response.status,
      statusText: response.statusText,
      data
    });
  }

  static logError(url: string, method: string, error: FetchError): void {
    if (!this.isDev) return;
    
    console.error(`❌ ${method.toUpperCase()} ${url}`, error);
  }
} 