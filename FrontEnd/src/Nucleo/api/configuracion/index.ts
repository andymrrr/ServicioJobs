// ==================== INDEX PRINCIPAL CONFIGURACIÓN API ====================

// Exportaciones principales de Axios
export { 
  Api, 
  ApiConArchivo, 
  ApiSinAuth,
  ApiFactory,
  TokenManager,
  configurarTokens,
  limpiarTokens,
  estaAutenticado,
  crearApiPersonalizada
} from './Axio';

// Exportaciones principales de Fetch
export { 
  FetchClient, 
  FetchClientSinAuth, 
  FetchClientArchivos,
  FetchApi,
  FetchTokenManager,
  configurarTokensFetch,
  limpiarTokensFetch,
  estaAutenticadoFetch,
  crearFetchPersonalizado
} from './Fetch';

// Tipos con alias para evitar conflictos
export type { ApiConfig, ApiError } from './Axio';
export type { 
  FetchConfig, 
  FetchError, 
  FetchResponse
} from './Fetch'; 