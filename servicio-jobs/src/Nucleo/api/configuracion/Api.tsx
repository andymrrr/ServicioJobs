import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Tipos para mejor manejo de TypeScript
interface ApiConfig {
  contentType?: string;
  withAuth?: boolean;
  timeout?: number;
}

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// Clase para manejar el almacenamiento de tokens
class TokenManager {
  private static readonly TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Verificar si el token no está expirado (simple check del payload JWT)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  }
}

// Función mejorada para crear instancias de API
const crearApiInstance = (config: ApiConfig = {}): AxiosInstance => {
  const {
    contentType = "application/json",
    withAuth = true,
    timeout = 10000
  } = config;

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout,
    headers: {
      "Content-Type": contentType,
      Accept: "application/json",
    },
  });

  // Request Interceptor - Agregar Bearer Token si está disponible
  instance.interceptors.request.use(
    (config) => {
      if (withAuth) {
        const token = TokenManager.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      // Log para desarrollo (opcional)
      if (import.meta.env.DEV) {
        console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          data: config.data
        });
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor - Manejar errores y refresh tokens
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log para desarrollo (opcional)
      if (import.meta.env.DEV) {
        console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
      }
      
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Si es error 401 y tenemos refresh token, intentar renovar
      if (error.response?.status === 401 && !originalRequest._retry && withAuth) {
        originalRequest._retry = true;
        
        const refreshToken = TokenManager.getRefreshToken();
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
              refresh_token: refreshToken
            });
            
            const { access_token, refresh_token: newRefreshToken } = refreshResponse.data;
            
            // Actualizar tokens
            TokenManager.setToken(access_token);
            if (newRefreshToken) {
              TokenManager.setRefreshToken(newRefreshToken);
            }
            
            // Reintentar la request original
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
            }
            
            return instance(originalRequest);
          } catch (refreshError) {
            // Si falla el refresh, limpiar tokens y redirigir al login
            TokenManager.clearTokens();
            
            // Opcional: disparar evento para redirigir al login
            window.dispatchEvent(new CustomEvent('auth:logout'));
            
            return Promise.reject(refreshError);
          }
        } else {
          // No hay refresh token, limpiar y redirigir
          TokenManager.clearTokens();
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
      }

      // Formatear error para mejor manejo
      const apiError: ApiError = {
        message: (error.response?.data as any)?.message || error.message || 'Error desconocido',
        status: error.response?.status,
        data: error.response?.data
      };

      // Log para desarrollo
      if (import.meta.env.DEV) {
        console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, apiError);
      }

      return Promise.reject(apiError);
    }
  );

  return instance;
};

// Función para configurar tokens manualmente
export const configurarTokens = (accessToken: string, refreshToken?: string): void => {
  TokenManager.setToken(accessToken);
  if (refreshToken) {
    TokenManager.setRefreshToken(refreshToken);
  }
};

// Función para limpiar tokens
export const limpiarTokens = (): void => {
  TokenManager.clearTokens();
};

// Función para verificar si el usuario está autenticado
export const estaAutenticado = (): boolean => {
  return TokenManager.hasValidToken();
};

// Instancias predefinidas
export const Api = crearApiInstance({ 
  contentType: "application/json", 
  withAuth: true 
});

export const ApiConArchivo = crearApiInstance({ 
  contentType: "multipart/form-data", 
  withAuth: true 
});

export const ApiSinAuth = crearApiInstance({ 
  contentType: "application/json", 
  withAuth: false 
});

// Función para crear instancias personalizadas
export const crearApiPersonalizada = (config: ApiConfig): AxiosInstance => {
  return crearApiInstance(config);
};

// Exportar TokenManager para uso externo si es necesario
export { TokenManager };
