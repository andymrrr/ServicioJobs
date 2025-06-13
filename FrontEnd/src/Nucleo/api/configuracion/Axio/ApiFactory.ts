import axios, { AxiosInstance } from 'axios';
import { CONFIG } from './config';
import { ApiConfig } from './types';
import { RequestInterceptor, ResponseInterceptor } from './Interceptors';

// ==================== FACTORY DE INSTANCIAS API ====================

export class ApiFactory {
  static createInstance(config: ApiConfig = {}): AxiosInstance {
    const {
      contentType = "application/json",
      withAuth = true,
      timeout = CONFIG.DEFAULT_TIMEOUT,
      baseURL = CONFIG.BASE_URL
    } = config;

    const instance = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": contentType,
        Accept: "application/json",
      },
    });

    // Configurar interceptores
    RequestInterceptor.setup(instance, withAuth);
    ResponseInterceptor.setup(instance, withAuth);

    return instance;
  }

  static createCustomInstance(config: ApiConfig): AxiosInstance {
    return this.createInstance(config);
  }
} 