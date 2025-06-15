// 🔧 Configuración de entorno centralizada
export const isDevelopment = typeof window !== 'undefined' && 
    (window as any).__ENVIRONMENT__ === 'development' || 
    import.meta.env?.DEV || 
    false; 