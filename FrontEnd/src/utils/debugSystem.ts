// 🔍 Sistema de Debug Centralizado
export enum DebugLevel {
  INFO = 'INFO',
  WARNING = 'WARNING', 
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface DebugEntry {
  timestamp: string;
  level: DebugLevel;
  category: string;
  message: string;
  data?: any;
  trace?: string;
}

class DebugSystem {
  private logs: DebugEntry[] = [];
  private isEnabled: boolean = false;
  private maxLogs: number = 1000;
  private initialized: boolean = false;

  constructor() {
    // Detectar modo desarrollo de múltiples formas
    this.isEnabled = this.detectDevMode();
    this.initialize();
  }

  private detectDevMode(): boolean {
    // Múltiples formas de detectar modo desarrollo
    const viteDevMode = import.meta.env?.DEV;
    const nodeEnv = import.meta.env?.NODE_ENV === 'development';
    const hostname = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('dev')
    );
    
    return viteDevMode || nodeEnv || hostname;
  }

  private initialize() {
    if (this.initialized) return;
    
    this.initialized = true;
    
    if (this.isEnabled) {
      console.log('🔍 Sistema de Debug inicializado');
      console.log('📊 Modo desarrollo detectado:', {
        viteDevMode: import.meta.env?.DEV,
        nodeEnv: import.meta.env?.NODE_ENV,
        hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A'
      });
      
      // Log de prueba inicial
      this.info('SYSTEM', 'Sistema de debug inicializado correctamente', {
        enabled: this.isEnabled,
        maxLogs: this.maxLogs,
        timestamp: new Date().toISOString()
      });
    }
  }

  // 🎯 Configuración
  configure(options: { enabled?: boolean; maxLogs?: number }) {
    this.isEnabled = options.enabled ?? this.isEnabled;
    this.maxLogs = options.maxLogs ?? this.maxLogs;
    
    if (this.isEnabled) {
      this.info('SYSTEM', 'Configuración actualizada', options);
    }
  }

  // 📝 Métodos de logging
  info(category: string, message: string, data?: any) {
    this.log(DebugLevel.INFO, category, message, data);
  }

  warning(category: string, message: string, data?: any) {
    this.log(DebugLevel.WARNING, category, message, data);
  }

  error(category: string, message: string, data?: any) {
    this.log(DebugLevel.ERROR, category, message, data);
  }

  success(category: string, message: string, data?: any) {
    this.log(DebugLevel.SUCCESS, category, message, data);
  }

  // 🔍 Log principal
  private log(level: DebugLevel, category: string, message: string, data?: any) {
    if (!this.isEnabled) return;

    const entry: DebugEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data: data ? this.sanitizeData(data) : undefined,
      trace: level === DebugLevel.ERROR ? new Error().stack : undefined
    };

    this.logs.push(entry);
    this.cleanupLogs();
    this.printToConsole(entry);
  }

  // 🧹 Limpiar logs antiguos
  private cleanupLogs() {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  // 🎨 Imprimir en consola con colores
  private printToConsole(entry: DebugEntry) {
    const emoji = this.getEmojiForLevel(entry.level);
    const color = this.getColorForLevel(entry.level);
    const time = new Date(entry.timestamp).toLocaleTimeString();
    
    console.groupCollapsed(
      `%c${emoji} [${time}] ${entry.category} - ${entry.message}`,
      `color: ${color}; font-weight: bold;`
    );
    
    if (entry.data) {
      console.log('📦 Data:', entry.data);
    }
    
    if (entry.trace) {
      console.log('📍 Stack Trace:', entry.trace);
    }
    
    console.groupEnd();
  }

  // 🎭 Helpers para emojis y colores
  private getEmojiForLevel(level: DebugLevel): string {
    const emojis = {
      [DebugLevel.INFO]: '🔍',
      [DebugLevel.WARNING]: '⚠️',
      [DebugLevel.ERROR]: '❌',
      [DebugLevel.SUCCESS]: '✅'
    };
    return emojis[level];
  }

  private getColorForLevel(level: DebugLevel): string {
    const colors = {
      [DebugLevel.INFO]: '#2196F3',
      [DebugLevel.WARNING]: '#FF9800', 
      [DebugLevel.ERROR]: '#F44336',
      [DebugLevel.SUCCESS]: '#4CAF50'
    };
    return colors[level];
  }

  // 🧼 Sanitizar datos sensibles
  private sanitizeData(data: any): any {
    if (typeof data !== 'object' || data === null) return data;

    const sensitiveKeys = ['password', 'token', 'authorization', 'secret', 'key'];
    const sanitized = JSON.parse(JSON.stringify(data));

    const sanitizeObject = (obj: any) => {
      Object.keys(obj).forEach(key => {
        if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
          obj[key] = '***HIDDEN***';
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      });
    };

    sanitizeObject(sanitized);
    return sanitized;
  }

  // 📊 Métodos de consulta
  getLogs(category?: string, level?: DebugLevel): DebugEntry[] {
    return this.logs.filter(log => 
      (!category || log.category === category) &&
      (!level || log.level === level)
    );
  }

  getLastLogs(count: number = 10): DebugEntry[] {
    return this.logs.slice(-count);
  }

  clearLogs() {
    this.logs = [];
    console.clear();
    this.info('SYSTEM', 'Logs limpiados');
  }

  // 📈 Estadísticas
  getStats() {
    const stats = this.logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {} as Record<DebugLevel, number>);

    return {
      total: this.logs.length,
      byLevel: stats,
      categories: [...new Set(this.logs.map(l => l.category))]
    };
  }

  // 💾 Exportar logs
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // 🔧 Métodos de utilidad
  isDebugEnabled(): boolean {
    return this.isEnabled;
  }

  // 🧪 Método de prueba
  test() {
    this.info('TEST', 'Prueba de sistema de debug');
    this.success('TEST', 'Sistema funcionando correctamente');
    this.warning('TEST', 'Advertencia de prueba');
    this.error('TEST', 'Error de prueba (no es real)');
  }
}

// 🌍 Instancia global
export const Debug = new DebugSystem();

// 🎯 Funciones de conveniencia por categoría
export const DebugAPI = {
  request: (message: string, data?: any) => Debug.info('API_REQUEST', message, data),
  response: (message: string, data?: any) => Debug.success('API_RESPONSE', message, data),
  error: (message: string, data?: any) => Debug.error('API_ERROR', message, data)
};

export const DebugForm = {
  validation: (message: string, data?: any) => Debug.info('FORM_VALIDATION', message, data),
  submit: (message: string, data?: any) => Debug.info('FORM_SUBMIT', message, data),
  error: (message: string, data?: any) => Debug.error('FORM_ERROR', message, data)
};

export const DebugSteps = {
  navigation: (message: string, data?: any) => Debug.info('STEPS_NAVIGATION', message, data),
  validation: (message: string, data?: any) => Debug.info('STEPS_VALIDATION', message, data),
  complete: (message: string, data?: any) => Debug.success('STEPS_COMPLETE', message, data)
};

// 🔧 Hook para desarrollo
if (typeof window !== 'undefined') {
  (window as any).Debug = Debug;
  (window as any).DebugAPI = DebugAPI;
  (window as any).DebugForm = DebugForm;
  (window as any).DebugSteps = DebugSteps;
  
  // Agregar método de prueba global
  (window as any).testDebug = () => Debug.test();
} 