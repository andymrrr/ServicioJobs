import { FETCH_CONFIG } from './config';
import { FetchConfig, FetchResponse, FetchError, RequestOptions } from './types';
import { FetchTokenManager } from './TokenManager';
import { FetchLogger } from './FetchLogger';
import { FetchErrorHandler } from './ErrorHandler';
import { FetchRefreshTokenHandler } from './RefreshTokenHandler';

// ==================== FETCH API PRINCIPAL ====================

export class FetchApi {
  private config: FetchConfig;
  private hasRetried = false;

  constructor(config: FetchConfig = {}) {
    this.config = {
      baseURL: FETCH_CONFIG.BASE_URL,
      timeout: FETCH_CONFIG.DEFAULT_TIMEOUT,
      withAuth: true,
      headers: { ...FETCH_CONFIG.DEFAULT_HEADERS },
      ...config
    };
  }

  private buildUrl(endpoint: string): string {
    const base = this.config.baseURL || '';
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${cleanBase}${cleanEndpoint}`;
  }

  private buildHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers = { ...this.config.headers, ...customHeaders };
    
    if (this.config.withAuth) {
      const authHeaders = FetchTokenManager.getAuthHeaders();
      Object.assign(headers, authHeaders);
    }
    
    return headers;
  }

  private async fetchWithTimeout(url: string, options: RequestOptions): Promise<Response> {
    const { timeout = this.config.timeout, ...fetchOptions } = options;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw FetchErrorHandler.createTimeoutError(url);
      }
      
      throw FetchErrorHandler.createNetworkError(error as Error, url);
    }
  }

  private async makeRequest<T = any>(
    endpoint: string, 
    options: RequestOptions = {}
  ): Promise<FetchResponse<T>> {
    const url = this.buildUrl(endpoint);
    const headers = this.buildHeaders(options.headers as Record<string, string>);
    const method = options.method || 'GET';
    
    const requestOptions: RequestOptions = {
      ...options,
      method,
      headers
    };

    FetchLogger.logRequest(url, requestOptions);

    const makeRequestFn = () => this.fetchWithTimeout(url, requestOptions);
    
    let response: Response;
    
    try {
      response = await makeRequestFn();
      
      // Si es 401 y tenemos refresh token, intentar renovar
      if (FetchErrorHandler.shouldRetryWithRefresh(response) && !this.hasRetried) {
        this.hasRetried = true;
        response = await FetchRefreshTokenHandler.handleTokenRefresh(makeRequestFn);
      }
      
      this.hasRetried = false;
      
      // Si la respuesta no es ok, crear error
      if (!response.ok) {
        const error = await FetchErrorHandler.createFetchError(response, url);
        FetchLogger.logError(url, method, error);
        throw error;
      }
      
      // Parsear respuesta
      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }
      
      const fetchResponse: FetchResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      };
      
      FetchLogger.logResponse(url, method, response, data);
      return fetchResponse;
      
    } catch (error) {
      this.hasRetried = false;
      
      if (error instanceof Error && !(error as FetchError).status) {
        const fetchError = FetchErrorHandler.createNetworkError(error, url);
        FetchLogger.logError(url, method, fetchError);
        throw fetchError;
      }
      
      throw error;
    }
  }

  // Métodos HTTP públicos
  async get<T = any>(endpoint: string, config: RequestOptions = {}): Promise<FetchResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any, config: RequestOptions = {}): Promise<FetchResponse<T>> {
    const body = data ? JSON.stringify(data) : undefined;
    return this.makeRequest<T>(endpoint, { ...config, method: 'POST', body });
  }

  async put<T = any>(endpoint: string, data?: any, config: RequestOptions = {}): Promise<FetchResponse<T>> {
    const body = data ? JSON.stringify(data) : undefined;
    return this.makeRequest<T>(endpoint, { ...config, method: 'PUT', body });
  }

  async delete<T = any>(endpoint: string, config: RequestOptions = {}): Promise<FetchResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'DELETE' });
  }

  async patch<T = any>(endpoint: string, data?: any, config: RequestOptions = {}): Promise<FetchResponse<T>> {
    const body = data ? JSON.stringify(data) : undefined;
    return this.makeRequest<T>(endpoint, { ...config, method: 'PATCH', body });
  }
} 