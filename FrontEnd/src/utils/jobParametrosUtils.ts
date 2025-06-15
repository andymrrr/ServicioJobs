import { 
    FormularioTabData,
    procesarConfiguracionAPI 
} from "../components/FormulariosControles/HookFormDinamico";
import { TipoParametro } from "../Core/Dominio/Model/enum/TipoParametro";
import { JobParametro } from "../Core/Dominio/Model/JobProgramado/JobParametro";

export interface ParametroGenerico {
    propiedad: string;
    valor: string;
    tipo: TipoParametro;
}

export interface ConfiguracionAPIProcessada<T = ParametroGenerico> {
    headers: Array<{ nombre: string; valor: string }>;
    queryParams: Array<{ nombre: string; valor: string }>;
    parametros: T[];
}

export function convertirConfiguracionAParametros<T = JobParametro>(
    configuracionAPI: FormularioTabData,
    pestanasAProcesar: string[] = ['Headers', 'Query Params'],
    crearParametroFn?: (tipo: TipoParametro, propiedad: string, valor: string) => T
): ConfiguracionAPIProcessada<T> {
    
    const configuracionProcesada = procesarConfiguracionAPI(
        configuracionAPI, 
        pestanasAProcesar
    );

    const parametros: T[] = [];
    
    const crearParametro = crearParametroFn || ((tipo: TipoParametro, propiedad: string, valor: string): T => 
        crearJobParametro(tipo, propiedad, valor) as T
    );
    
    configuracionProcesada.headers.forEach(header => {
        if (header.nombre && header.valor) {
            parametros.push(
                crearParametro(TipoParametro.Header, header.nombre, header.valor)
            );
        }
    });
    
    configuracionProcesada.queryParams.forEach(param => {
        if (param.nombre && param.valor) {
            parametros.push(
                crearParametro(TipoParametro.Query, param.nombre, param.valor)
            );
        }
    });

    return {
        headers: configuracionProcesada.headers,
        queryParams: configuracionProcesada.queryParams,
        parametros
    };
}

export function crearJobParametro(
    tipo: TipoParametro,
    propiedad: string,
    valor: string
): JobParametro {
    return {
        propiedad: propiedad,
        valor: valor,
        tipo: tipo
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

export function obtenerEstadisticasParametros<T extends JobParametro>(parametros: T[]) {
    const headers = parametros.filter(p => p.tipo === TipoParametro.Header).length;
    const queryParams = parametros.filter(p => p.tipo === TipoParametro.Query).length;

    return {
        totalParametros: parametros.length,
        headers,
        queryParams
    };
}
