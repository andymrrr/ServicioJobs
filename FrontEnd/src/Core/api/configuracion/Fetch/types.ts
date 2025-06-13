// ==================== TIPOS FETCH ====================

export interface FetchConfig {
  headers?: Record<string, string>;
  withAuth?: boolean;
  timeout?: number;
  baseURL?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export interface FetchError {
  message: string;
  status?: number;
  data?: any;
  code?: string;
}

export interface TokenData {
  access_token: string;
  refresh_token?: string;
}

export interface FetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
  baseURL?: string;
} 