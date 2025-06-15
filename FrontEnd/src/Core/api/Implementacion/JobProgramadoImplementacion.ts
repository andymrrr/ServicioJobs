import { JobProgramado, Respuesta, RespuestaPaginada, PaginacionProgramadosQuery } from "../../Dominio/Model";
import { ApiSinAuth } from "../configuracion/Axio/Api";
import { IJobProgramadoImplementacion } from "../Interfaz/IJobProgramadoImplementacion";
import { Utilitarios } from "../Utilitario";
import { DebugAPI, Debug } from '../../../utils/debugSystem';

export class JobProgramadoImplementacion implements IJobProgramadoImplementacion {
    private baseUrl = '/api/v1/Programados';
    
    async ObtenerPaginacion(request: PaginacionProgramadosQuery): Promise<RespuestaPaginada<JobProgramado>> {
        try {
            const url = "/api/v1/Programados/paginacion";
            const queryParams = Utilitarios.ConstruirQueryParams(request);
            const urlConParametros = `${url}?${queryParams.toString()}`;
            
            const respuesta = await ApiSinAuth.get<RespuestaPaginada<JobProgramado>>(urlConParametros);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<RespuestaPaginada<JobProgramado>>(error);
        }
    }
   async CrearJobProgramado(comando: any): Promise<any> {
        DebugAPI.request('Iniciando creación de job programado (FormData)', comando);
        
        try {
            const formulario = Utilitarios.construirFormularioAutomatico(comando);
            
            DebugAPI.request('FormData construido', {
                comando: comando,
                formDataContent: this.debugFormData(formulario)
            });

            const response = await fetch(`${this.baseUrl}/crearjob`, {
                method: 'POST',
                body: formulario
            });

            if (response.ok) {
                const resultado = await response.json();
                DebugAPI.response('Job programado creado exitosamente (FormData)', resultado);
                return resultado;
            } else {
                const error = await response.text();
                DebugAPI.error('Error al crear job programado (FormData)', { 
                    status: response.status, 
                    statusText: response.statusText, 
                    error 
                });
                throw new Error(`Error ${response.status}: ${error}`);
            }
        } catch (error) {
            DebugAPI.error('Error en CrearJobProgramado (FormData)', error);
            throw error;
        }
    }

    // 🆕 Nuevo método con JSON usando ApiSinAuth
    async CrearJobProgramadoConJSON(comando: any): Promise<any> {
        DebugAPI.request('Iniciando creación de job programado (JSON)', comando);
        
        try {
            // 🧹 Limpiar el comando y preparar para JSON
            const comandoJSON = this.prepararComandoParaJSON(comando);
            
            DebugAPI.request('Comando preparado para JSON', {
                original: comando,
                preparado: comandoJSON,
                url: `${this.baseUrl}/crearjob`
            });

            // 🚀 Usar ApiSinAuth en lugar de fetch directo
            const respuesta = await ApiSinAuth.post<Respuesta>(`${this.baseUrl}/crearjob`, comandoJSON);
            
            DebugAPI.response('Job programado creado exitosamente (JSON)', respuesta.data);
            return respuesta.data;
            
        } catch (error) {
            // 🔍 Debug detallado del error
            DebugAPI.error('Error en CrearJobProgramadoConJSON', {
                error: error,
                errorMessage: error instanceof Error ? error.message : 'Error desconocido',
                errorStack: error instanceof Error ? error.stack : undefined,
                comando: {
                    nombre: comando?.nombre,
                    url: comando?.url,
                    metodoHttp: comando?.metodoHttp
                }
            });
            
            // 🔄 Usar el manejo de errores estándar
            throw error;
        }
    }

    // 🔧 Preparar comando para envío JSON
    private prepararComandoParaJSON(comando: any): any {
        const comandoLimpio = { ...comando };
        
        // 🎯 Procesar jobParametro si existe
        if (comandoLimpio.jobParametro) {
            // Si ya es un array, lo dejamos así
            if (Array.isArray(comandoLimpio.jobParametro)) {
                Debug.info('PREPARE_JSON', 'JobParametro ya es array', {
                    length: comandoLimpio.jobParametro.length,
                    sample: comandoLimpio.jobParametro.slice(0, 2)
                });
            }
            // Si es un string JSON, lo parseamos
            else if (typeof comandoLimpio.jobParametro === 'string') {
                try {
                    comandoLimpio.jobParametro = JSON.parse(comandoLimpio.jobParametro);
                    Debug.info('PREPARE_JSON', 'JobParametro parseado desde string', {
                        length: comandoLimpio.jobParametro.length,
                        sample: comandoLimpio.jobParametro.slice(0, 2)
                    });
                } catch (e) {
                    DebugAPI.error('Error parseando jobParametro', {
                        error: e,
                        originalValue: comandoLimpio.jobParametro
                    });
                }
            }
        }

        // 🧹 Remover campos undefined o null
        Object.keys(comandoLimpio).forEach(key => {
            if (comandoLimpio[key] === undefined || comandoLimpio[key] === null) {
                delete comandoLimpio[key];
            }
        });

        // 🔍 Debug del comando final
        Debug.info('PREPARE_JSON', 'Comando final preparado', {
            keys: Object.keys(comandoLimpio),
            hasJobParametro: !!comandoLimpio.jobParametro,
            jobParametroType: typeof comandoLimpio.jobParametro,
            jobParametroLength: Array.isArray(comandoLimpio.jobParametro) ? comandoLimpio.jobParametro.length : 'N/A'
        });

        return comandoLimpio;
    }

    // 🔍 Helper para debuggear FormData
    private debugFormData(formData: FormData): Record<string, any> {
        const entries: Record<string, any> = {};
        formData.forEach((value, key) => {
            entries[key] = value;
        });
        return entries;
    }

    async ObtenerJobPorId(id: number): Promise<Respuesta> {
        try {
            const url ="/binance/binary-momentum-catboost/entrenar";
            const respuesta = await ApiSinAuth.post<Respuesta<JobProgramado>>(url,id);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<Respuesta<JobProgramado>>(error);
        }
    }
    async ActualizarJobProgramado(request: FormData): Promise<Respuesta> {
        try {
            const url ="/binance/binary-momentum-catboost/entrenar";
            const respuesta = await ApiSinAuth.post<Respuesta<JobProgramado>>(url, request);
            return respuesta.data;
        } catch (error) {
            return Utilitarios.ManejarError<Respuesta<JobProgramado>>(error);
        }
    }
}