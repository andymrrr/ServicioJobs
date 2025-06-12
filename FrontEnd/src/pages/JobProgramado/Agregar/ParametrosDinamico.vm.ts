import { useCallback } from "react";
import { 
    FormularioTabData,
    procesarConfiguracionAPI,
    obtenerEstadisticasConfiguracion,
    CONFIGURACIONES_API,
    PLANTILLA_BASICA,
} from "../../../components/FormulariosControles/HookFormDinamico";
import { JobParametro } from "../../../Nucleo/Dominio/Model/JobProgramado/JobParametro";

export interface ConfiguracionAPIProcessada {
    headers: Array<{ nombre: string; valor: string }>;
    queryParams: Array<{ nombre: string; valor: string }>;
    jobParametros: JobParametro[];
    estadisticas: any; // Será el tipo que devuelve obtenerEstadisticasConfiguracion
}

export function useParametrosDinamicosVM() {
    // Lista de pestañas disponibles desde configuración
    const pestanasDisponibles = [...CONFIGURACIONES_API.pestañas] as string[];

    // Función para procesar la configuración completa de API
    const procesarConfiguracionCompleta = useCallback((
        configuracionAPI: FormularioTabData
    ): ConfiguracionAPIProcessada => {
        // Procesar configuración usando el helper genérico
        const configuracionProcesada = procesarConfiguracionAPI(
            configuracionAPI, 
            pestanasDisponibles
        );

        // Obtener estadísticas
        const estadisticas = obtenerEstadisticasConfiguracion(configuracionAPI);

        // Convertir a JobParametros
        const jobParametros: JobParametro[] = [];
        
        // Agregar headers
        configuracionProcesada.headers.forEach(header => {
            if (header.nombre && header.valor) {
                jobParametros.push({
                    nombre: `header:${header.nombre}`,
                    valor: header.valor
                });
            }
        });
        
        // Agregar query params
        configuracionProcesada.queryParams.forEach(param => {
            if (param.nombre && param.valor) {
                jobParametros.push({
                    nombre: `query:${param.nombre}`,
                    valor: param.valor
                });
            }
        });

        return {
            headers: configuracionProcesada.headers,
            queryParams: configuracionProcesada.queryParams,
            jobParametros,
            estadisticas
        };
    }, []);

    // Función para validar la configuración
    const validarConfiguracion = useCallback((
        configuracionAPI: FormularioTabData
    ): { esValida: boolean; errores: string[] } => {
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
    }, []);



    return {
        // Configuraciones
        configuracionCamposAPI: [...CONFIGURACIONES_API.campos],
        valoresDefectoAPI: PLANTILLA_BASICA,
        pestanasDisponibles,
        
        // Funciones de procesamiento
        procesarConfiguracionCompleta,
        validarConfiguracion
    };
}