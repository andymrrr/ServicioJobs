import { Contenedor } from "../../../components/UI/Contenedor"
import Tarjeta from "../../../components/UI/Tarjeta";
import BotonPrimario from "../../../components/UI/Botones/BotonPrimario";
import { useAgregarJobVM } from "./AgregarJob.Vm";
import { useParametrosDinamicosVM } from "./ParametrosDinamico.vm";
import HookFormInput from "../../../components/FormulariosControles/HookFormInput/HookFormInput";
import SelectFormHook from "../../../components/FormulariosControles/HookFormSelect/HookFormSelect";
import { Alert } from 'antd';

import HookFormDinamico from "../../../components/FormulariosControles/HookFormDinamico";
import Collapsible from "../../../components/UI/Collapsible";

export const PaginaAgregarJob = () => {
    // ViewModels
    const viewModel = useAgregarJobVM();
    const parametrosVM = useParametrosDinamicosVM();
    
    const {
        isPending,
        isSuccess,
        isError,
        error,
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
        resetearFormulario
    } = viewModel;

    const {
        configuracionCamposAPI,
        pestanasDisponibles
    } = parametrosVM;

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
                                required={validacionesFormulario.NOMBRE.required}
                                colSpan="6"
                            />

                            <HookFormInput
                                label="ID Método"
                                name="idMetodo"
                                register={register}
                                errors={errors}
                                placeholder="Ej: SYNC_USERS"
                                required={validacionesFormulario.ID_METODO.required}
                                colSpan="6"
                            />

                            <HookFormInput
                                label="URL del Endpoint"
                                name="url"
                                register={register}
                                errors={errors}
                                type="url"
                                placeholder="https://api.ejemplo.com/v1/usuarios"
                                required={validacionesFormulario.URL.required}
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
                                required={validacionesFormulario.DESCRIPCION.required}
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
                                required={validacionesFormulario.CRON.required}
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
                                required={validacionesFormulario.EMAIL.required}
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

