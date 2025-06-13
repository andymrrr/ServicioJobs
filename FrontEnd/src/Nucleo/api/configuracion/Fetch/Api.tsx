// ==================== ARCHIVO PRINCIPAL FETCH API ====================

import { FetchConfig, TokenData } from './types';
import { FetchApi } from './FetchApi';
import { FetchTokenManager } from './TokenManager';

// ==================== INSTANCIAS PREDEFINIDAS ====================

export const FetchClient = new FetchApi({
  withAuth: true
});

export const FetchClientSinAuth = new FetchApi({
  withAuth: false
});

export const FetchClientArchivos = new FetchApi({
  withAuth: true,
  headers: {
    // Para FormData, no establecer Content-Type para que el browser lo haga automáticamente
  }
});

// ==================== FUNCIONES PÚBLICAS ====================

export const configurarTokensFetch = (accessToken: string, refreshToken?: string): void => {
  FetchTokenManager.setTokens({ access_token: accessToken, refresh_token: refreshToken });
};

export const limpiarTokensFetch = (): void => {
  FetchTokenManager.clearTokens();
};

export const estaAutenticadoFetch = (): boolean => {
  return FetchTokenManager.hasValidToken();
};

export const crearFetchPersonalizado = (config: FetchConfig): FetchApi => {
  return new FetchApi(config);
};

// ==================== EXPORTACIONES ====================

export { FetchApi } from './FetchApi';
export { FetchTokenManager } from './TokenManager';
export { FetchErrorHandler } from './ErrorHandler';
export { FetchRefreshTokenHandler } from './RefreshTokenHandler';
export type { FetchConfig, FetchError, FetchResponse, TokenData } from './types'; 