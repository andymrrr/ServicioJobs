// ==================== CONFIGURACIÓN FETCH ====================

export const FETCH_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  DEFAULT_TIMEOUT: 10000,
  TOKEN_KEYS: {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token'
  },
  ENDPOINTS: {
    REFRESH: '/auth/refresh'
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const; 