import { 
    FormularioTabData,
    procesarConfiguracionAPI 
} from "../components/FormulariosControles/HookFormDinamico";

// Tipos para los prefijos de parámetros
export type TipoParametro = 'header' | 'query' | 'body' | 'path';

// Interfaz genérica para parámetros
export interface ParametroGenerico {
    nombre: string;
    valor: string;
}

// Interfaz para mapear tipos de configuración a prefijos
export interface MapeoTipoParametro {
    headers: 'header';
    queryParams: 'query';
    bodyParams?: 'body';
    pathParams?: 'path';
}

// Interfaz genérica para el resultado del procesamiento
export interface ConfiguracionAPIProcessada<T = ParametroGenerico> {
    headers: Array<{ nombre: string; valor: string }>;
    queryParams: Array<{ nombre: string; valor: string }>;
    parametros: T[];
}

export function convertirConfiguracionAParametros<T = ParametroGenerico>(
    configuracionAPI: FormularioTabData,
    pestanasAProcesar: string[] = ['Headers', 'Query Params'],
    crearParametroFn?: (tipo: TipoParametro, nombre: string, valor: string) => T
): ConfiguracionAPIProcessada<T> {
    // Procesar configuración usando el helper genérico existente
    const configuracionProcesada = procesarConfiguracionAPI(
        configuracionAPI, 
        pestanasAProcesar
    );

    // Convertir a parámetros con tipado fuerte
    const parametros: T[] = [];
    
    // Función por defecto para crear parámetros
    const crearParametro = crearParametroFn || ((tipo: TipoParametro, nombre: string, valor: string): T => 
        crearParametroGenerico(tipo, nombre, valor) as T
    );
    
    // Agregar headers con prefijo tipado
    configuracionProcesada.headers.forEach(header => {
        if (header.nombre && header.valor) {
            parametros.push(
                crearParametro('header', header.nombre, header.valor)
            );
        }
    });
    
    // Agregar query params con prefijo tipado
    configuracionProcesada.queryParams.forEach(param => {
        if (param.nombre && param.valor) {
            parametros.push(
                crearParametro('query', param.nombre, param.valor)
            );
        }
    });

    return {
        headers: configuracionProcesada.headers,
        queryParams: configuracionProcesada.queryParams,
        parametros
    };
}

/**
 * Función helper tipada para crear parámetros genéricos con prefijo
 * @param tipo - Tipo de parámetro (header, query, etc.)
 * @param nombre - Nombre del parámetro
 * @param valor - Valor del parámetro
 * @returns Parámetro genérico con nombre prefijado
 */
export function crearParametroGenerico(
    tipo: TipoParametro,
    nombre: string,
    valor: string
): ParametroGenerico {
    return {
        nombre: `${tipo}:${nombre}`,
        valor: valor
    };
}

/**
 * Función para validar configuración de API
 * @param configuracionAPI - Datos del formulario a validar
 * @returns Resultado de validación con errores si los hay
 */
export function validarConfiguracionAPI(
    configuracionAPI: FormularioTabData
): { esValida: boolean; errores: string[] } {
    const errores: string[] = [];
    
    // Validar headers
    if (configuracionAPI.Headers) {
        configuracionAPI.Headers.forEach((header, index) => {
            if (!header.nombre || header.nombre.trim() === '') {
                errores.push(`Header ${index + 1}: El nombre es requerido`);
            }
            if (!header.valor || header.valor.trim() === '') {
                errores.push(`Header ${index + 1}: El valor es requerido`);
            }
        });
    }

    // Validar query params
    if (configuracionAPI['Query Params']) {
        configuracionAPI['Query Params'].forEach((param, index) => {
            if (!param.nombre || param.nombre.trim() === '') {
                errores.push(`Query Param ${index + 1}: El nombre es requerido`);
            }
            if (!param.valor || param.valor.trim() === '') {
                errores.push(`Query Param ${index + 1}: El valor es requerido`);
            }
        });
    }

    return {
        esValida: errores.length === 0,
        errores
    };
}

/**
 * Función para obtener estadísticas de configuración (si se necesita)
 * @param parametros - Array de parámetros procesados
 * @returns Estadísticas básicas de los parámetros
 */
export function obtenerEstadisticasParametros<T extends ParametroGenerico>(parametros: T[]) {
    const headers = parametros.filter(p => p.nombre.startsWith('header:')).length;
    const queryParams = parametros.filter(p => p.nombre.startsWith('query:')).length;
    const otros = parametros.filter(p => !p.nombre.startsWith('header:') && !p.nombre.startsWith('query:')).length;

    return {
        totalParametros: parametros.length,
        headers,
        queryParams,
        otros
    };
}

// ===== FUNCIONES ESPECÍFICAS PARA JOBPARAMETRO =====

import { JobParametro } from "../Nucleo/Dominio/Model/JobProgramado/JobParametro";

/**
 * EJEMPLOS DE USO DEL UTILITARIO GENÉRICO:
 * 
 * // Para JobParametro (caso específico):
 * const resultado = convertirConfiguracionAJobParametros(configuracion);
 * 
 * // Para cualquier interfaz personalizada:
 * interface MiParametro { key: string; value: string; extra?: string; }
 * const resultado = convertirConfiguracionAParametros<MiParametro>(
 *     configuracion,
 *     ['Headers', 'Query Params'],
 *     (tipo, nombre, valor) => ({ key: `${tipo}:${nombre}`, value: valor, extra: 'custom' })
 * );
 * 
 * // Para usar solo la interfaz genérica:
 * const resultado = convertirConfiguracionAParametros(configuracion);
 */

/**
 * Función específica para crear JobParametros (wrapper del utilitario genérico)
 * @param configuracionAPI - Datos del formulario de configuración
 * @param pestanasAProcesar - Array de nombres de pestañas a procesar
 * @returns Configuración procesada con JobParametros generados
 */
export function convertirConfiguracionAJobParametros(
    configuracionAPI: FormularioTabData,
    pestanasAProcesar: string[] = ['Headers', 'Query Params']
): ConfiguracionAPIProcessada<JobParametro> {
    return convertirConfiguracionAParametros<JobParametro>(
        configuracionAPI,
        pestanasAProcesar,
        (tipo, nombre, valor) => ({
            nombre: `${tipo}:${nombre}`,
            valor: valor
        })
    );
} 