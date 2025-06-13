import { 
    FormularioTabData,
    procesarConfiguracionAPI 
} from "../components/FormulariosControles/HookFormDinamico";


export type TipoParametro = 'header' | 'query' | 'body' | 'path';

export interface ParametroGenerico {
    nombre: string;
    valor: string;
}

export interface MapeoTipoParametro {
    headers: 'header';
    queryParams: 'query';
    bodyParams?: 'body';
    pathParams?: 'path';
}

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
    
    const configuracionProcesada = procesarConfiguracionAPI(
        configuracionAPI, 
        pestanasAProcesar
    );

    const parametros: T[] = [];
    
    const crearParametro = crearParametroFn || ((tipo: TipoParametro, nombre: string, valor: string): T => 
        crearParametroGenerico(tipo, nombre, valor) as T
    );
    
    configuracionProcesada.headers.forEach(header => {
        if (header.nombre && header.valor) {
            parametros.push(
                crearParametro('header', header.nombre, header.valor)
            );
        }
    });
    
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


export function validarConfiguracionAPI(
    configuracionAPI: FormularioTabData
): { esValida: boolean; errores: string[] } {
    const errores: string[] = [];
    
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
