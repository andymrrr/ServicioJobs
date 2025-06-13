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


export interface FormularioAgregarJob {
   
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
    const { /*ejecutarAsync,*/ isPending, isSuccess, isError, error, data } = useAgregarJob();
    
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

    useEffect(() => {
        setValue('configuracionAPI', PLANTILLA_BASICA);
    }, [setValue]);

    const procesarDatosFormulario = (data: FormularioAgregarJob): AgregarJobProgramadoComand => {
        
        const { headers, queryParams, parametros: jobParametros } = convertirConfiguracionAParametros<JobParametro>(
            data.configuracionAPI, 
            ['Headers', 'Query Params'],
            (tipo, nombre, valor) => ({
                nombre: `${tipo}:${nombre}`,
                valor: valor
            })
        );

        console.log('🌐 Headers configurados:', headers);
        console.log('🔍 Query Params:', queryParams);
        console.log('📦 JobParametros generados:', jobParametros);

        
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

    const handleAgregarJob = async (data: FormularioAgregarJob) => {
        const comandoFinal = procesarDatosFormulario(data);
        console.log('Comando final:', comandoFinal);
        //await ejecutarAsync(comandoFinal);
    };

    const onSubmit = handleSubmit(handleAgregarJob);

    const resetearFormulario = () => {
        reset();
        setMetodoHttpSeleccionado("");
        setMostrarConfigAvanzada(false);
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
        resetearFormulario
    };
}
