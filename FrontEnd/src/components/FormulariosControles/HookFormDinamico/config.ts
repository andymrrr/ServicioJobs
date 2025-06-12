import { ConfiguracionCampoHook, FormularioTabData } from './types';

/**
 * Configuraciones predefinidas para diferentes casos de uso de HookFormDinamico
 */

// =============================================================================
// CONFIGURACIONES DE CAMPOS COMUNES
// =============================================================================

/**
 * Configuración básica para campos de texto clave-valor
 */
export const CAMPO_CLAVE_VALOR: ConfiguracionCampoHook = {
    tipo: 'input',
    label: 'Par Clave-Valor',
    tamaño: '12',
    placeholder: 'Nombre, Clave, Identificador...',
    required: true,
    requiredMessage: 'La clave es requerida',
    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
};

/**
 * Configuración para campos de API (headers, parámetros, etc.)
 */
export const CAMPO_API_BASICO: ConfiguracionCampoHook = {
    tipo: 'input',
    label: 'Configuración API',
    tamaño: '12',
    placeholder: 'Authorization, Content-Type, api-key...',
    required: true,
    requiredMessage: 'La clave es requerida',
    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
};

/**
 * Configuración para campos de configuración general
 */
export const CAMPO_CONFIGURACION_GENERAL: ConfiguracionCampoHook = {
    tipo: 'input',
    label: 'Configuración',
    tamaño: '6',
    placeholder: 'Clave de configuración...',
    required: false,
    minLength: { value: 1, message: 'Mínimo 1 caracter' }
};

// =============================================================================
// PLANTILLAS PREDEFINIDAS PARA APIS
// =============================================================================

/**
 * Plantilla para APIs REST estándar
 */
export const PLANTILLA_API_REST: FormularioTabData = {
    'Headers': [
        { nombre: 'Content-Type', valor: 'application/json', tipo: 'input' as const },
        { nombre: 'Authorization', valor: 'Bearer your-token-here', tipo: 'input' as const },
        { nombre: 'Accept', valor: 'application/json', tipo: 'input' as const }
    ],
    'Query Params': [
        { nombre: 'limit', valor: '100', tipo: 'input' as const },
        { nombre: 'offset', valor: '0', tipo: 'input' as const }
    ]
};

/**
 * Plantilla para Webhooks
 */
export const PLANTILLA_WEBHOOK: FormularioTabData = {
    'Headers': [
        { nombre: 'Content-Type', valor: 'application/json', tipo: 'input' as const },
        { nombre: 'X-Webhook-Secret', valor: 'your-secret-key', tipo: 'input' as const },
        { nombre: 'User-Agent', valor: 'WebhookClient/1.0', tipo: 'input' as const }
    ],
    'Query Params': []
};

/**
 * Plantilla para Microservicios
 */
export const PLANTILLA_MICROSERVICIO: FormularioTabData = {
    'Headers': [
        { nombre: 'Content-Type', valor: 'application/json', tipo: 'input' as const },
        { nombre: 'X-Service-Name', valor: 'job-scheduler', tipo: 'input' as const },
        { nombre: 'X-Request-ID', valor: 'unique-request-id', tipo: 'input' as const },
        { nombre: 'X-Correlation-ID', valor: 'correlation-id', tipo: 'input' as const }
    ],
    'Query Params': [
        { nombre: 'version', valor: 'v1', tipo: 'input' as const },
        { nombre: 'timeout', valor: '30', tipo: 'input' as const }
    ]
};

/**
 * Plantilla básica simple
 */
export const PLANTILLA_BASICA: FormularioTabData = {
    'Headers': [
        { nombre: 'Content-Type', valor: 'application/json', tipo: 'input' as const },
        { nombre: 'Authorization', valor: 'Bearer token', tipo: 'input' as const }
    ],
    'Query Params': []
};

/**
 * Plantilla para configuración de base de datos
 */
export const PLANTILLA_DATABASE_CONFIG: FormularioTabData = {
    'Conexión': [
        { nombre: 'host', valor: 'localhost', tipo: 'input' as const },
        { nombre: 'port', valor: '5432', tipo: 'input' as const },
        { nombre: 'database', valor: 'mydb', tipo: 'input' as const }
    ],
    'Credenciales': [
        { nombre: 'username', valor: 'admin', tipo: 'input' as const },
        { nombre: 'password', valor: '****', tipo: 'input' as const }
    ]
};

// =============================================================================
// CONJUNTOS DE CONFIGURACIONES POR CONTEXTO
// =============================================================================

/**
 * Configuraciones para formularios de API
 */
export const CONFIGURACIONES_API = {
    campos: [CAMPO_API_BASICO],
    pestañas: ['Headers', 'Query Params'],
    plantillas: {
        'api-rest': PLANTILLA_API_REST,
        'webhook': PLANTILLA_WEBHOOK,
        'microservicio': PLANTILLA_MICROSERVICIO,
        'basica': PLANTILLA_BASICA
    },
    limites: {
        maxCampos: 20,
        minCampos: 0
    }
} as const;

/**
 * Configuraciones para formularios de configuración general
 */
export const CONFIGURACIONES_CONFIG = {
    campos: [CAMPO_CONFIGURACION_GENERAL],
    pestañas: ['Configuración', 'Variables'],
    plantillas: {
        'database': PLANTILLA_DATABASE_CONFIG,
        'basica': PLANTILLA_BASICA
    },
    limites: {
        maxCampos: 50,
        minCampos: 1
    }
} as const;

/**
 * Configuraciones para formularios de clave-valor simples
 */
export const CONFIGURACIONES_CLAVE_VALOR = {
    campos: [CAMPO_CLAVE_VALOR],
    pestañas: ['Datos', 'Metadatos'],
    plantillas: {
        'basica': {
            'Datos': [
                { nombre: 'clave1', valor: 'valor1', tipo: 'input' as const },
                { nombre: 'clave2', valor: 'valor2', tipo: 'input' as const }
            ],
            'Metadatos': []
        }
    },
    limites: {
        maxCampos: 30,
        minCampos: 1
    }
} as const;

// =============================================================================
// FACTORY FUNCTIONS - FUNCIONES DE CREACIÓN
// =============================================================================

/**
 * Crea una configuración personalizada para HookFormDinamico
 */
export function crearConfiguracionPersonalizada(
    tipo: 'api' | 'config' | 'clave-valor',
    opciones?: {
        pestañasPersonalizadas?: string[];
        camposPersonalizados?: ConfiguracionCampoHook[];
        limitesPersonalizados?: { maxCampos: number; minCampos: number };
    }
) {
    const baseConfig = tipo === 'api' ? CONFIGURACIONES_API :
                      tipo === 'config' ? CONFIGURACIONES_CONFIG :
                      CONFIGURACIONES_CLAVE_VALOR;
    
    return {
        ...baseConfig,
        ...(opciones?.pestañasPersonalizadas && { pestañas: opciones.pestañasPersonalizadas }),
        ...(opciones?.camposPersonalizados && { campos: opciones.camposPersonalizados }),
        ...(opciones?.limitesPersonalizados && { limites: opciones.limitesPersonalizados })
    };
}

/**
 * Obtiene una plantilla específica por nombre y tipo
 */
export function obtenerPlantilla(
    tipo: 'api' | 'config' | 'clave-valor',
    nombrePlantilla: string
): FormularioTabData | null {
    const config = tipo === 'api' ? CONFIGURACIONES_API :
                   tipo === 'config' ? CONFIGURACIONES_CONFIG :
                   CONFIGURACIONES_CLAVE_VALOR;
    
    return (config.plantillas as any)[nombrePlantilla] || null;
}

/**
 * Lista todas las plantillas disponibles por tipo
 */
export function listarPlantillasDisponibles(tipo: 'api' | 'config' | 'clave-valor'): string[] {
    const config = tipo === 'api' ? CONFIGURACIONES_API :
                   tipo === 'config' ? CONFIGURACIONES_CONFIG :
                   CONFIGURACIONES_CLAVE_VALOR;
    
    return Object.keys(config.plantillas);
}

// =============================================================================
// VALIDACIONES Y UTILIDADES
// =============================================================================

/**
 * Valida si una configuración es válida para HookFormDinamico
 */
export function validarConfiguracion(
    datos: FormularioTabData,
    tipo: 'api' | 'config' | 'clave-valor'
): { esValida: boolean; errores: string[] } {
    const errores: string[] = [];
    const config = tipo === 'api' ? CONFIGURACIONES_API :
                   tipo === 'config' ? CONFIGURACIONES_CONFIG :
                   CONFIGURACIONES_CLAVE_VALOR;
    
    let totalCampos = 0;
    
    // Validar cada pestaña
    Object.entries(datos).forEach(([pestana, campos]) => {
        if (!(config.pestañas as readonly string[]).includes(pestana)) {
            errores.push(`Pestaña '${pestana}' no es válida para el tipo '${tipo}'`);
        }
        
        totalCampos += campos.length;
        
        // Validar campos individuales
        campos.forEach((campo, index) => {
            if (!campo.nombre || campo.nombre.trim() === '') {
                errores.push(`${pestana}[${index}]: El nombre del campo es requerido`);
            }
            if (!campo.valor || campo.valor.trim() === '') {
                errores.push(`${pestana}[${index}]: El valor del campo es requerido`);
            }
        });
    });
    
    // Validar límites
    if (totalCampos > config.limites.maxCampos) {
        errores.push(`Excede el límite máximo de ${config.limites.maxCampos} campos`);
    }
    if (totalCampos < config.limites.minCampos) {
        errores.push(`Debe tener al menos ${config.limites.minCampos} campo(s)`);
    }
    
    return {
        esValida: errores.length === 0,
        errores
    };
}

/**
 * Convierte datos de formulario a formato específico
 */
export function convertirDatosFormulario<T>(
    datos: FormularioTabData,
    conversor: (pestaña: string, campo: { nombre: string; valor: string }) => T
): T[] {
    const resultado: T[] = [];
    
    Object.entries(datos).forEach(([pestaña, campos]) => {
        campos.forEach(campo => {
            if (campo.nombre && campo.valor) {
                resultado.push(conversor(pestaña, { nombre: campo.nombre, valor: campo.valor }));
            }
        });
    });
    
    return resultado;
} 