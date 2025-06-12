import { Contenedor } from "../../../components/UI/Contenedor"
import Tarjeta from "../../../components/UI/Tarjeta";
import BotonPrimario from "../../../components/UI/Botones/BotonPrimario";
import { useAgregarJobVM } from "./AgregarJob.Vm";
import { useForm } from "react-hook-form";
import { AgregarJobProgramadoComand } from "../../../Nucleo/Dominio/Model";
import { JobParametro } from "../../../Nucleo/Dominio/Model/JobProgramado/JobParametro";
import HookFormInput from "../../../components/FormulariosControles/React-Hook-Form/HookFormInput";
import SelectFormHook from "../../../components/FormulariosControles/React-Hook-Form/SelectFormHook";
import { MetodoHttp } from "../../../Nucleo/Dominio/Model/enum/MethodoHTTP";
import { useState, useEffect } from "react";
import { Alert } from 'antd';

import HookFormDinamico, { 
    ConfiguracionCampoHook, 
    FormularioTabData,
    procesarConfiguracionAPI,
    obtenerEstadisticasConfiguracion
} from "../../../components/FormulariosControles/React-Hook-Form/HookFormDinamico";
import Collapsible from "../../../components/UI/Collapsible";

// Interfaz limpia para el formulario (sin extender el comando del dominio)
interface FormularioAgregarJob {
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

export const PaginaAgregarJob = () => {
    const { handleAgregarJob, isPending, isSuccess, isError, error } = useAgregarJobVM();
    
    const [metodoHttpSeleccionado, setMetodoHttpSeleccionado] = useState<string>("");
    const [mostrarConfigAvanzada, setMostrarConfigAvanzada] = useState(false);

    // Configuración del formulario principal
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

    // Configuración para el componente dinámico de API - Nombre y Valor
    const configuracionCamposAPI: ConfiguracionCampoHook[] = [
        {
            tipo: 'input',
            label: 'Par Clave-Valor',
            tamaño: '12',
            placeholder: 'Authorization, Content-Type, api-key...',
            required: true,
            requiredMessage: 'La clave es requerida',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
        }
    ];

 

    // 🚀 Establecer valores por defecto al montar el componente
    useEffect(() => {
        const valoresDefecto: FormularioTabData = {
            'Headers': [
                { nombre: 'Content-Type', valor: 'application/json', tipo: 'input' as const },
                { nombre: 'Authorization', valor: 'Bearer token', tipo: 'input' as const }
            ],
            'Query Params': []
        };
        
        setValue('configuracionAPI', valoresDefecto);
    }, [setValue]);

    // Función para manejar el envío del formulario
    const onSubmit = (data: FormularioAgregarJob) => {
        // 🚀 Procesar configuración de API usando el helper genérico
        const configuracionProcesada = procesarConfiguracionAPI(
            data.configuracionAPI, 
            ['Headers', 'Query Params']
        );

        // 📊 Obtener estadísticas de la configuración
        const estadisticas = obtenerEstadisticasConfiguracion(data.configuracionAPI);

        // 🔄 Convertir headers y query params a JobParametro[]
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

        // 🔍 Logs informativos:
        console.log('🌐 Headers configurados:', configuracionProcesada.headers);
        console.log('🔍 Query Params:', configuracionProcesada.queryParams);
        console.log('📊 Estadísticas:', estadisticas);
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
        handleAgregarJob(comandoFinal);
    };
   
    const opcionesMetodoHttp = [
        { valor: MetodoHttp.GET.toString(), etiqueta: "GET" },
        { valor: MetodoHttp.POST.toString(), etiqueta: "POST" },
        { valor: MetodoHttp.PUT.toString(), etiqueta: "PUT" },
        { valor: MetodoHttp.DELETE.toString(), etiqueta: "DELETE" }
    ];

    return (
        <Contenedor>
            <Tarjeta
                titulo="Crear Nuevo Job Programado"
                subtitulo="Configura una tarea automatizada para ejecutar llamadas HTTP de forma programada"
                lineaHeader={{ mostrar: true, color: "blue", grosor: "2px" }}
                tamano={12}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                   
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Información del Job
                        </h3>

                        <div className="grid grid-cols-12 gap-4">
                            <HookFormInput
                                label="Nombre del Job"
                                name="nombre"
                                register={register}
                                errors={errors}
                                placeholder="Ej: Sincronizar usuarios diariamente"
                                required="El nombre es requerido"
                                colSpan="6"
                            />

                            <HookFormInput
                                label="ID Método"
                                name="idMetodo"
                                register={register}
                                errors={errors}
                                placeholder="Ej: SYNC_USERS"
                                required="El ID del método es requerido"
                                colSpan="6"
                            />

                            <HookFormInput
                                label="URL del Endpoint"
                                name="url"
                                register={register}
                                errors={errors}
                                type="url"
                                placeholder="https://api.ejemplo.com/v1/usuarios"
                                required="La URL es requerida"
                                colSpan="9"
                            />

                            <SelectFormHook
                                etiqueta="Método HTTP"
                                name="metodoHttp"
                                opciones={opcionesMetodoHttp}
                                register={register}
                                errors={errors}
                                valorSeleccionado={metodoHttpSeleccionado}
                                onChange={setMetodoHttpSeleccionado}
                                colSpan="3"
                            />

                            <HookFormInput
                                label="Descripción"
                                name="descripcion"
                                register={register}
                                errors={errors}
                                placeholder="Describe qué hace este job y cuándo se ejecuta"
                                required="La descripción es requerida"
                                colSpan="12"
                            />
                        </div>
                    </div>

                    {/* PROGRAMACIÓN */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Programación
                        </h3>

                        <div className="grid grid-cols-12 gap-4">
                            <HookFormInput
                                label="Expresión Cron"
                                name="crontab"
                                register={register}
                                errors={errors}
                                placeholder="0 0 * * * (Diario a medianoche)"
                                required="La expresión cron es requerida"
                                tooltipMessage="Formato: minuto hora día mes día-semana"
                                colSpan="8"
                            />

                            <HookFormInput
                                label="Correo de Notificación"
                                name="correoNotificar"
                                register={register}
                                errors={errors}
                                type="email"
                                placeholder="admin@empresa.com"
                                required="El correo de notificación es requerido"
                                colSpan="4"
                            />
                        </div>
                    </div>

                    {/* CONFIGURACIÓN DE API */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Configuración de API
                        </h3>

                        <HookFormDinamico
                            pestañas={['Headers', 'Query Params']}
                            tiposCamposPermitidos={configuracionCamposAPI}
                            cantidadMaximaCampos={20}
                            basePath="configuracionAPI"
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
                            control={control}
                            register={register}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            getValues={getValues}
                        />
                    </div>

                    {/* CONFIGURACIÓN AVANZADA */}
                    <Collapsible
                        title="Configuración Avanzada"
                        subtitle="Timeout, reintentos y otras opciones"
                        variant="card"
                        defaultOpen={mostrarConfigAvanzada}
                        onToggle={(isOpen) => setMostrarConfigAvanzada(isOpen)}
                    >
                        <div className="grid grid-cols-12 gap-4">
                            <HookFormInput
                                label="Timeout (segundos)"
                                name="timeout"
                                register={register}
                                errors={errors}
                                type="number"
                                placeholder="300"
                                colSpan="4"
                            />

                            <HookFormInput
                                label="Reintentos Permitidos"
                                name="reintentosPermitidos"
                                register={register}
                                errors={errors}
                                type="number"
                                placeholder="3"
                                colSpan="4"
                            />

                            <HookFormInput
                                label="Período Reintento (min)"
                                name="periodoReintento"
                                register={register}
                                errors={errors}
                                type="number"
                                placeholder="5"
                                colSpan="4"
                            />
                        </div>
                    </Collapsible>

                    {/* MENSAJES DE ESTADO */}
                    {isError && error && (
                        <Alert
                            message="Error al crear el job"
                            description={error.message || 'Ha ocurrido un error inesperado'}
                            type="error"
                            showIcon
                        />
                    )}

                    {isSuccess && (
                        <Alert
                            message="¡Job creado exitosamente!"
                            description="El job programado ha sido configurado correctamente"
                            type="success"
                            showIcon
                        />
                    )}

                  
                    <div className="flex justify-end gap-3 pt-4">
                        <BotonPrimario
                            texto="Cancelar"
                            color="gray"
                            variante="outline"
                            tamaño="mediano"
                            onClick={() => {
                                reset();
                                setMetodoHttpSeleccionado("");
                                setMostrarConfigAvanzada(false);
                            }}
                            deshabilitar={isPending}
                        />
                        
                        <BotonPrimario
                            texto={isPending ? "Guardando..." : "Guardar Job"}
                            color="primary"
                            tipo="submit"
                            tamaño="mediano"
                            deshabilitar={isPending}
                            cargando={isPending}
                        />
                    </div>
                </form>
            </Tarjeta>
        </Contenedor>
    )
}

