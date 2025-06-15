import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAgregarJob } from "../../../hooks/JobProgramado/useAgregarJob";
import { AgregarJobProgramadoComand } from "../../../Core/Dominio/Model";
import { MetodoHttp } from "../../../Core/Dominio/Model/enum/MethodoHTTP";
import { 
    FormularioTabData,
    PLANTILLA_BASICA
} from "../../../components/FormulariosControles/HookFormDinamico";
import { convertirConfiguracionAParametros } from "../../../utils/jobParametrosUtils";
import { JobParametro } from "../../../Core/Dominio/Model/JobProgramado/JobParametro";
import { 
    OPCIONES_METODO_HTTP,
    REGLAS_VALIDACION_JOB
} from "./AgregarJob.config";
import { DebugForm, Debug } from '../../../utils/debugSystem';

export interface FormularioAgregarJob {
    nombre: string;
    descripcion: string;
    url: string;
    crontab: string;
    correoNotificar: string;
    reintentosPermitidos?: number;
    periodoReintento?: number;
    timeout?: number;
    metodoHttp: string;
    
    // Configuración temporal del formulario
    configuracionAPI: FormularioTabData;
}

export function useAgregarJobVM() {
    const { ejecutarAsync,isPending, isSuccess, isError, error, data } = useAgregarJob();
    
    // Estados del formulario
    const [metodoHttpSeleccionado, setMetodoHttpSeleccionado] = useState<string>("");
    const [mostrarConfigAvanzada, setMostrarConfigAvanzada] = useState(false);

    // 🔧 Configuración del formulario con debug
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
        setValue,
        getValues,
        trigger
    } = useForm<FormularioAgregarJob>({
        defaultValues: {
            configuracionAPI: {
                'Headers': [],
                'Query Params': []
            }
        }
    });

    useEffect(() => {
        setValue('configuracionAPI', PLANTILLA_BASICA);
        Debug.info('FORM_INIT', 'Formulario inicializado con plantilla básica', PLANTILLA_BASICA);
    }, [setValue]);

    // 🧹 Procesamiento optimizado de datos con debug detallado
    const procesarDatosFormulario = async (data: FormularioAgregarJob) => {
        DebugForm.submit('Iniciando procesamiento de datos del formulario', data);
        
        try {
            // 🎯 Convertir configuración API a parámetros
            const { headers, queryParams, parametros: jobParametros } = convertirConfiguracionAParametros<JobParametro>(
                data.configuracionAPI, 
                ['Headers', 'Query Params'],
                (tipo, nombre, valor) => ({
                    nombre: `${tipo}:${nombre}`,
                    valor: valor
                })
            );

            Debug.info('FORM_PROCESS', 'Parámetros procesados', {
                headers,
                queryParams,
                jobParametros,
                jobParametrosJSON: JSON.stringify(jobParametros, null, 2)
            });

            // 🏗️ Construir comando final
            const comandoFinal: AgregarJobProgramadoComand = {
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
            
            // 🔍 Debug detallado del comando final
            Debug.success('FORM_PROCESS', 'Comando final construido', {
                comando: comandoFinal,
                validaciones: {
                    esArrayJobParametro: Array.isArray(comandoFinal.jobParametro),
                    longitudJobParametro: comandoFinal.jobParametro?.length || 0,
                    tipoMetodoHttp: typeof comandoFinal.metodoHttp,
                    valorMetodoHttp: comandoFinal.metodoHttp
                }
            });
            
            // 🚀 Ejecutar comando
            const resultado = await ejecutarAsync(comandoFinal);
            Debug.success('FORM_SUBMIT', 'Comando ejecutado exitosamente', resultado);
            
            return resultado;
            
        } catch (error) {
            DebugForm.error('Error en procesamiento de datos', error);
            throw error;
        }
    };

    // 🎯 Manejador principal de envío
    const handleAgregarJob = async (data: FormularioAgregarJob) => {
        DebugForm.submit('Iniciando envío del formulario', {
            datosFormulario: data,
            validaciones: {
                hasErrors: Object.keys(errors).length > 0,
                errores: errors
            }
        });
        
        try {
            const resultado = await procesarDatosFormulario(data);
            DebugForm.submit('Formulario enviado exitosamente', resultado);
            return resultado;
        } catch (error) {
            DebugForm.error('Error en envío del formulario', error);
            throw error;
        }
    };

    const onSubmit = handleSubmit(handleAgregarJob);

    // 🧹 Resetear formulario con debug
    const resetearFormulario = () => {
        Debug.info('FORM_RESET', 'Reseteando formulario', {
            antesReset: {
                metodoHttpSeleccionado,
                mostrarConfigAvanzada
            }
        });
        
        reset();
        setMetodoHttpSeleccionado("");
        setMostrarConfigAvanzada(false);
        
        Debug.success('FORM_RESET', 'Formulario reseteado exitosamente');
    };

    return {
        isPending,
        isSuccess,
        isError,
        error,
        data,
        
        metodoHttpSeleccionado,
        setMetodoHttpSeleccionado,
        mostrarConfigAvanzada,
        setMostrarConfigAvanzada,
        
        opcionesMetodoHttp: OPCIONES_METODO_HTTP,
        validacionesFormulario: REGLAS_VALIDACION_JOB,
        
        register,
        errors,
        control,
        watch,
        setValue,
        getValues,
        onSubmit,
        resetearFormulario,
        trigger
    };
}
