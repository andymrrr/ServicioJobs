import React from 'react';
import { Contenedor } from "../../../components/UI/Contenedor"
import Tarjeta from "../../../components/UI/Tarjeta";
import BotonPrimario from "../../../components/UI/Botones/BotonPrimario";
import { useAgregarJobVM } from "./AgregarJob.Vm";
import { useParametrosDinamicosVM } from "./ParametrosDinamico.vm";
import Collapsible from "../../../components/UI/Collapsible";
import { HookFormInput } from "../../../components/FormulariosControles/HookFormInput";
import { HookFormSelect } from "../../../components/FormulariosControles/HookFormSelect";
import HookFormDinamico from "../../../components/FormulariosControles/HookFormDinamico";
import { HookFormCronExpression } from "../../../components/FormulariosControles";
import Titulo from '../../../components/UI/Titulo/Titulo';

export const PaginaAgregarJob = () => {
    const { isPending,
        metodoHttpSeleccionado,
        setMetodoHttpSeleccionado,
        mostrarConfigAvanzada,
        setMostrarConfigAvanzada,
        opcionesMetodoHttp,
        validacionesFormulario,
        register,
        errors,
        control,
        watch,
        setValue,
        getValues,
        onSubmit,
        resetearFormulario} = useAgregarJobVM();
    const {configuracionCamposAPI, pestanasDisponibles} = useParametrosDinamicosVM();
 

    return (
        <Contenedor>
            <Tarjeta
                titulo="Crear Nuevo Job Programado"
                subtitulo="Configura una tarea automatizada para ejecutar llamadas HTTP de forma programada"
                lineaHeader={{ mostrar: true, color: "blue", grosor: "2px" }}
                tamano={12}
            >
                <form onSubmit={onSubmit} className="space-y-6">
                    
                    {/* INFORMACIÓN DEL JOB */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <Titulo
                         colorSeparador='primary'
                         color='primary'
                         tipoSeparador='linea'
                         peso='bold'
                         tamaño='extra-grande'
                         alineacion='left'
                         separador={true}
                        > 
                         📋 Información del Job
                        </Titulo>

                        <div className="grid grid-cols-12 gap-4">
                            <HookFormInput
                                label="Nombre del Job"
                                name="nombre"
                                register={register}
                                errors={errors}
                                placeholder="Ej: Sincronizar usuarios diariamente"
                                required={validacionesFormulario.NOMBRE.required}
                                colSpan="8"
                            />

                            <HookFormInput
                                label="Correo de Notificación"
                                name="correoNotificar"
                                register={register}
                                errors={errors}
                                type="email"
                                placeholder="admin@empresa.com"
                                required={validacionesFormulario.EMAIL.required}
                                colSpan="4"
                            />

                            <HookFormInput
                                label="URL del Endpoint"
                                name="url"
                                register={register}
                                errors={errors}
                                type="url"
                                placeholder="https://api.com/v1/klk"
                                required={validacionesFormulario.URL.required}
                                colSpan="9"
                            />

                            <HookFormSelect
                                label="Método HTTP"
                                name="metodoHttp"
                                options={opcionesMetodoHttp}
                                register={register}
                                errors={errors}
                                selectedValue={metodoHttpSeleccionado}
                                onChange={setMetodoHttpSeleccionado}
                                colSpan="3"
                            />

                            <HookFormInput
                                label="Descripción"
                                name="descripcion"
                                register={register}
                                errors={errors}
                                placeholder="Describe qué hace este job y cuándo se ejecuta"
                                required={validacionesFormulario.DESCRIPCION.required}
                                colSpan="12"
                            />
                        </div>
                    </div>

                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <Titulo
                         colorSeparador='secondary'
                         color='secondary'
                         tipoSeparador='puntos'
                         peso='semibold'
                         tamaño='grande'
                         alineacion='left'
                         separador={true}
                        > 
                         ⏰ Programación
                        </Titulo>

                        <div className="grid grid-cols-12 gap-4">
                            <HookFormCronExpression
                                label="Programación del Job"
                                name="crontab"
                                register={register}
                                errors={errors}
                                required={validacionesFormulario.CRON.required}
                                tooltipMessage="Define cuándo se ejecutará el job usando expresiones cron"
                                colSpan="12"
                            />
                        </div>
                    </div>

                    {/* CONFIGURACIÓN DE API */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                        <Titulo
                         colorSeparador='primary'
                         color='primary'
                         tipoSeparador='gradiente-verde'
                         peso='bold'
                         tamaño='mediano'
                         alineacion='left'
                         separador={true}
                        > 
                         🔧 Configuración de API
                        </Titulo>

                        <HookFormDinamico
                            pestañas={pestanasDisponibles}
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

                    {/* BOTONES DE ACCIÓN */}
                    <div className="flex justify-end gap-3 pt-4">
                        <BotonPrimario
                            texto="Cancelar"
                            color="gray"
                            variante="outline"
                            tamaño="mediano"
                            onClick={resetearFormulario}
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

