import { Debug, DebugLevel } from '../utils/debugSystem';

export const DEBUG_CONFIG = {
    enabled: import.meta.env?.DEV || false,
    
    maxLogs: 1000,
    
    CATEGORIES: {
        FORM: {
            VALIDATION: 'FORM_VALIDATION',
            SUBMIT: 'FORM_SUBMIT',
            RESET: 'FORM_RESET',
            INIT: 'FORM_INIT',
            PROCESS: 'FORM_PROCESS'
        },
        API: {
            REQUEST: 'API_REQUEST',
            RESPONSE: 'API_RESPONSE',
            ERROR: 'API_ERROR'
        },
        STEPS: {
            NAVIGATION: 'STEPS_NAVIGATION',
            VALIDATION: 'STEPS_VALIDATION',
            COMPLETE: 'STEPS_COMPLETE'
        },
        HOOK: 'HOOK',
        CASO_USO: 'CASO_USO',
        PREPARE_JSON: 'PREPARE_JSON',
        SYSTEM: 'SYSTEM'
    },
    
    PANEL_FILTERS: {
        MAIN_CATEGORIES: [
            'FORM_VALIDATION', 
            'FORM_SUBMIT', 
            'API_REQUEST', 
            'API_RESPONSE', 
            'STEPS_NAVIGATION',
            'API_ERROR',
            'FORM_ERROR',
            'SYSTEM'
        ],
        
        LEVELS: [DebugLevel.INFO, DebugLevel.SUCCESS, DebugLevel.WARNING, DebugLevel.ERROR]
    }
};

export const initializeDebug = () => {
    // El sistema ya se inicializa automáticamente en el constructor
    // Solo configuramos opciones adicionales si es necesario
    Debug.configure({
        enabled: DEBUG_CONFIG.enabled,
        maxLogs: DEBUG_CONFIG.maxLogs
    });
    
    if (Debug.isDebugEnabled()) {
        console.log('🔍 Configuración de Debug aplicada');
        console.log('📊 Categorías disponibles:', DEBUG_CONFIG.CATEGORIES);
        console.log('🎛️ Comandos disponibles en consola:');
        console.log('  - Debug.getStats() - Ver estadísticas');
        console.log('  - Debug.clearLogs() - Limpiar logs');
        console.log('  - Debug.exportLogs() - Exportar logs');
        console.log('  - testDebug() - Ejecutar prueba básica del sistema');
        
        // Ejecutar una prueba automática
        setTimeout(() => {
            Debug.info('CONFIG', 'Sistema de debug configurado y listo para usar');
            Debug.success('CONFIG', 'Sistema listo para debugging en tiempo real');
        }, 100);
    }
};

// Inicializar automáticamente
initializeDebug(); 