import { Contenedor } from "../../../components/UI/Contenedor"
import Tarjeta from "../../../components/UI/Tarjeta";
import BotonPrimario from "../../../components/UI/Botones/BotonPrimario";
import { useAgregarJobVM } from "./AgregarJob.Vm";
import { useForm } from "react-hook-form";
import { AgregarJobProgramadoComand } from "../../../Nucleo/Dominio/Model";
import HookFormInput from "../../../components/FormulariosControles/React-Hook-Form/HookFormInput";
import SelectFormHook from "../../../components/FormulariosControles/React-Hook-Form/SelectFormHook";
import HookFormDinamico, { FormularioDatos } from "../../../components/FormulariosControles/React-Hook-Form/HookFormDinamico";
import { MetodoHttp } from "../../../Nucleo/Dominio/Model/enum/MethodoHTTP";
import { useState } from "react";
import { Alert } from 'antd';
import Titulo from "../../../components/UI/Titulo";

// Extender el comando para incluir parámetros dinámicos
interface AgregarJobExtendido extends AgregarJobProgramadoComand {
    parametrosDinamicos?: FormularioDatos;
}

export const PaginaAgregarJob = () => {
    const { handleAgregarJob, isPending, isSuccess, isError, error } = useAgregarJobVM();
    
    const [metodoHttpSeleccionado, setMetodoHttpSeleccionado] = useState<string>("");
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<AgregarJobExtendido>();

    const opcionesMetodoHttp = [
        { valor: MetodoHttp.GET.toString(), etiqueta: "GET" },
        { valor: MetodoHttp.POST.toString(), etiqueta: "POST" },
        { valor: MetodoHttp.PUT.toString(), etiqueta: "PUT" },
        { valor: MetodoHttp.DELETE.toString(), etiqueta: "DELETE" }
    ];

    const onSubmit = async (data: AgregarJobExtendido) => {
        // Procesar los parámetros dinámicos para incluirlos en jobParametro
        let parametrosFinales: any[] = [];
        
        if (data.parametrosDinamicos) {
            Object.entries(data.parametrosDinamicos).forEach(([tipoParametro, campos]) => {
                if (Array.isArray(campos)) {
                    campos.forEach(campo => {
                        if (campo.nombre && campo.valor) {
                            parametrosFinales.push({
                                nombre: campo.nombre,
                                valor: campo.valor,
                                tipo: tipoParametro, // Headers, Query Params, Body Params
                                tipoValor: campo.tipo // input, textarea, json, etc.
                            });
                        }
                    });
                }
            });
        }

        const jobData: AgregarJobProgramadoComand = {
            ...data,
            metodoHttp: parseInt(metodoHttpSeleccionado) as MetodoHttp,
            jobParametro: parametrosFinales
        };
        
        await handleAgregarJob(jobData);
        
        if (isSuccess) {
            reset();
            setMetodoHttpSeleccionado("");
        }
    };

    return (
        <Contenedor>
            <Tarjeta
                titulo="Agregar Nuevo Job Programado"
                subtitulo="Configura una nueva tarea programada para automatizar procesos"
                lineaHeader={{ mostrar: true, color: "blue", grosor: "2px" }}
                tamano={12}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-12 gap-6 mb-8">
                        
                                                {/* Información Básica */}
                        <div className="col-span-12">
                            <Titulo 
                                level="h3" 
                                tamaño="grande"
                                color="primary"
                                separador={true}
                                tipoSeparador="linea"
                                colorSeparador="primary"
                                espacioInferior="grande"
                                icono="📋"
                            >
                                Información Básica
                            </Titulo>
                        </div>

                        <HookFormInput
                            label="Nombre del Job"
                            name="nombre"
                            register={register}
                            errors={errors}
                            placeholder="Ingresa el nombre del job"
                            required="El nombre es requerido"
                            colSpan="6"
                        />

                        <HookFormInput
                            label="ID Método"
                            name="idMetodo"
                            register={register}
                            errors={errors}
                            placeholder="Ingresa el ID del método"
                            required="El ID del método es requerido"
                            colSpan="6"
                        />

                        <HookFormInput
                            label="Descripción"
                            name="descripcion"
                            register={register}
                            errors={errors}
                            placeholder="Describe el propósito del job"
                            required="La descripción es requerida"
                            colSpan="12"
                        />

                        {/* Configuración del Endpoint */}
                        <div className="col-span-12 mt-8">
                            <Titulo 
                                level="h3" 
                                tamaño="grande"
                                color="success"
                                separador={true}
                                tipoSeparador="linea"
                                colorSeparador="secondary"
                                espacioInferior="grande"
                                icono="🌐"
                            >
                                Configuración del Endpoint
                            </Titulo>
                        </div>

                        <HookFormInput
                            label="URL del Endpoint"
                            name="url"
                            register={register}
                            errors={errors}
                            type="url"
                            placeholder="https://ejemplo.com/api/endpoint"
                            required="La URL es requerida"
                            colSpan="8"
                        />

                        <SelectFormHook
                            etiqueta="Método HTTP"
                            name="metodoHttp"
                            opciones={opcionesMetodoHttp}
                            register={register}
                            errors={errors}
                            valorSeleccionado={metodoHttpSeleccionado}
                            onChange={setMetodoHttpSeleccionado}
                            colSpan="4"
                        />

                        {/* Programación y Notificaciones */}
                        <div className="col-span-12 mt-8">
                            <Titulo 
                                level="h3" 
                                tamaño="grande"
                                color="warning"
                                separador={true}
                                tipoSeparador="degradado"
                                colorSeparador="secondary"
                                espacioInferior="grande"
                                icono="⏰"
                            >
                                Programación y Notificaciones
                            </Titulo>
                        </div>

                        <HookFormInput
                            label="Expresión Cron"
                            name="crontab"
                            register={register}
                            errors={errors}
                            placeholder="0 0 * * * (Ejemplo: todos los días a medianoche)"
                            required="La expresión cron es requerida"
                            tooltipMessage="Formato: minuto hora día mes día-semana"
                            colSpan="6"
                        />

                        <HookFormInput
                            label="Correo de Notificación"
                            name="correoNotificar"
                            register={register}
                            errors={errors}
                            type="email"
                            placeholder="admin@ejemplo.com"
                            required="El correo de notificación es requerido"
                            colSpan="6"
                        />

                        {/* Configuración Avanzada */}
                        <div className="col-span-12 mt-8">
                            <Titulo 
                                level="h3" 
                                tamaño="grande"
                                color="secondary"
                                separador={true}
                                tipoSeparador="degradado"
                                espacioInferior="grande"
                                icono="⚙️"
                                subtitulo="Configuraciones opcionales para optimizar el rendimiento"
                            >
                                Configuración Avanzada
                            </Titulo>
                        </div>

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

                    {/* Parámetros Dinámicos - Headers, Query Params, Body */}
                    <div className="mb-8">
                        <div className="mb-6">
                            <Titulo 
                                level="h3" 
                                tamaño="grande"
                                color="primary"
                                separador={true}
                                tipoSeparador="linea"
                                colorSeparador="primary"
                                espacioInferior="grande"
                                icono="🔧"
                                subtitulo="Configura headers, query parameters y body parameters para personalizar las peticiones HTTP"
                            >
                                Parámetros y Configuración HTTP
                            </Titulo>
                        </div>
                        
                        <HookFormDinamico
                            name="parametrosDinamicos"
                            control={control}
                            pestañas={['Headers', 'Query Params']}
                            tiposCamposPermitidos={[]}
                            cantidadMaximaCampos={20}
                            titulo="Configuración de Parámetros HTTP"
                            subtitulo="Define headers personalizados, query parameters y body parameters para tu endpoint"
                            className="mt-4"
                        />
                    </div>

                    {/* Mensajes de Estado */}
                    {isError && error && (
                        <Alert
                            message="Error al crear el job"
                            description={error.message || 'Ha ocurrido un error inesperado'}
                            type="error"
                            showIcon
                            className="mb-6"
                        />
                    )}

                    {isSuccess && (
                        <Alert
                            message="¡Job creado exitosamente!"
                            description="El job programado ha sido configurado correctamente"
                            type="success"
                            showIcon
                            className="mb-6"
                        />
                    )}

                    {/* Botones de Acción */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-strokedark">
                        <BotonPrimario
                            texto="Cancelar"
                            color="gray"
                            variante="outline"
                            tamaño="mediano"
                            ajustarAlTexto={true}
                            onClick={() => {
                                reset();
                                setMetodoHttpSeleccionado("");
                            }}
                            deshabilitar={isPending}
                        />
                        
                        <BotonPrimario
                            texto={isPending ? "Guardando..." : "💾 Guardar Job"}
                            color="primary"
                            tipo="submit"
                            tamaño="mediano"
                            ajustarAlTexto={true}
                            deshabilitar={isPending}
                            cargando={isPending}
                        />
                    </div>
                </form>
            </Tarjeta>
        </Contenedor>
    )
}

