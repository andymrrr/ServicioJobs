import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAgregarJob } from "../../../hooks/JobProgramado/useAgregarJob";
import { AgregarJobProgramadoComand } from "../../../Nucleo/Dominio/Model";
import { MetodoHttp } from "../../../Nucleo/Dominio/Model/enum/MethodoHTTP";
import { 
    FormularioTabData,
    PLANTILLA_BASICA
} from "../../../components/FormulariosControles/HookFormDinamico";
import { convertirConfiguracionAJobParametros } from "../../../utils/jobParametrosUtils";
import { 
    OPCIONES_METODO_HTTP,
    REGLAS_VALIDACION_JOB
} from "./AgregarJob.config";

// Interfaz limpia para el formulario (sin extender el comando del dominio)
export interface FormularioAgregarJob {
    // Campos básicos del job
    idMetodo: string;
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
    const { ejecutarAsync, isPending, isSuccess, isError, error, data } = useAgregarJob();
    
    // Estados del formulario
    const [metodoHttpSeleccionado, setMetodoHttpSeleccionado] = useState<string>("");
    const [mostrarConfigAvanzada, setMostrarConfigAvanzada] = useState(false);

    // Configuración del formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
        setValue,
        getValues
    } = useForm<FormularioAgregarJob>({
        defaultValues: {
            configuracionAPI: {
                'Headers': [],
                'Query Params': []
            }
        }
    });

    // Establecer valores por defecto al montar el componente
    useEffect(() => {
        setValue('configuracionAPI', PLANTILLA_BASICA);
    }, [setValue]);

    // Función para procesar y transformar los datos del formulario
    const procesarDatosFormulario = (data: FormularioAgregarJob): AgregarJobProgramadoComand => {
        // Usar el utilitario genérico tipado para procesar la configuración
        const { headers, queryParams, parametros: jobParametros } = convertirConfiguracionAJobParametros(
            data.configuracionAPI, 
            ['Headers', 'Query Params']
        );

        // Logs informativos para debugging
        console.log('🌐 Headers configurados:', headers);
        console.log('🔍 Query Params:', queryParams);
        console.log('📦 JobParametros generados:', jobParametros);

        // Crear el comando final
        const comandoFinal: AgregarJobProgramadoComand = {
            idMetodo: data.idMetodo,
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
        
        console.log('📋 Comando final:', comandoFinal);
        return comandoFinal;
    };

    // Función para manejar el envío del formulario
    const handleAgregarJob = async (data: FormularioAgregarJob) => {
        const comandoFinal = procesarDatosFormulario(data);
        await ejecutarAsync(comandoFinal);
    };

    // Función para manejar el envío del formulario con react-hook-form
    const onSubmit = handleSubmit(handleAgregarJob);

    // Función para resetear el formulario
    const resetearFormulario = () => {
        reset();
        setMetodoHttpSeleccionado("");
        setMostrarConfigAvanzada(false);
    };

    return {
        // Estados del API
        isPending,
        isSuccess,
        isError,
        error,
        data,
        
        // Estados del formulario
        metodoHttpSeleccionado,
        setMetodoHttpSeleccionado,
        mostrarConfigAvanzada,
        setMostrarConfigAvanzada,
        
        // Configuraciones
        opcionesMetodoHttp: OPCIONES_METODO_HTTP,
        validacionesFormulario: REGLAS_VALIDACION_JOB,
        
        // Formulario
        register,
        errors,
        control,
        watch,
        setValue,
        getValues,
        onSubmit,
        resetearFormulario
    };
}
