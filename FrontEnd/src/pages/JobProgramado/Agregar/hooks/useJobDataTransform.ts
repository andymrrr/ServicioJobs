import { useCallback } from "react";
import { AgregarJobProgramadoComand } from "../../../../Core/Dominio/Model";
import { MetodoHttp } from "../../../../Core/Dominio/Model/enum/MethodoHTTP";
import { convertirConfiguracionAParametros } from "../../../../utils/jobParametrosUtils";
import { JobParametro } from "../../../../Core/Dominio/Model/JobProgramado/JobParametro";
import { Debug } from '../../../../utils/debugSystem';
import { TipoParametro } from "../../../../Core/Dominio/Model/enum/TipoParametro";
import { FormularioAgregarJob } from '../types/FormularioAgregarJob';
import { isDevelopment } from '../utils/environment';

export function useJobDataTransform() {
    const transformarDatos = useCallback((data: FormularioAgregarJob): AgregarJobProgramadoComand => {
        const { headers, queryParams, parametros: jobParametros } = convertirConfiguracionAParametros<JobParametro>(
            data.configuracionAPI, 
            ['Headers', 'Query Params']
        );

        if (isDevelopment) {
            Debug.info('FORM_PROCESS', 'Parámetros procesados', {
                headers,
                queryParams,
                jobParametros,
                jobParametrosJSON: JSON.stringify(jobParametros, null, 2),
                estructuraParametros: jobParametros.map(p => ({
                    propiedad: p.propiedad,
                    valor: p.valor,
                    tipo: p.tipo,
                    tipoNombre: TipoParametro[p.tipo]
                }))
            });
        }

        const comando: AgregarJobProgramadoComand = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            url: data.url,
            crontab: data.crontab,
            correoNotificar: data.correoNotificar,
            reintentosPermitidos: data.reintentosPermitidos,
            periodoReintento: data.periodoReintento,
            timeout: data.timeout,
            metodoHttp: parseInt(data.metodoHttp) as MetodoHttp,
            jobParametro: jobParametros
        };

        if (isDevelopment) {
            Debug.success('FORM_PROCESS', 'Comando final construido', {
                comando,
                validaciones: {
                    esArrayJobParametro: Array.isArray(comando.jobParametro),
                    longitudJobParametro: comando.jobParametro?.length || 0,
                    tipoMetodoHttp: typeof comando.metodoHttp,
                    valorMetodoHttp: comando.metodoHttp,
                    estructuraJobParametro: comando.jobParametro?.map(p => ({
                        propiedad: p.propiedad,
                        valor: p.valor,
                        tipo: p.tipo
                    }))
                }
            });
        }

        return comando;
    }, []);

    return { transformarDatos };
} 