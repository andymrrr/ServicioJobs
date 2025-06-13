// ==================== CONFIGURACIÓN ====================

export const CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  DEFAULT_TIMEOUT: 10000,
  TOKEN_KEYS: {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token'
  },
  ENDPOINTS: {
    REFRESH: '/auth/refresh'
  }
} as const; 