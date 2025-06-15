import React from 'react';
import { FaInfoCircle, FaGlobe, FaClock, FaCogs, FaSlidersH } from 'react-icons/fa';
import { Control, FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { StepConfig } from '../../../components/UI/StepByStep';
import { HookFormInput } from "../../../components/FormulariosControles/HookFormInput";
import { HookFormSelect } from "../../../components/FormulariosControles/HookFormSelect";
import HookFormDinamico from "../../../components/FormulariosControles/HookFormDinamico";
import { HookFormCronExpression } from "../../../components/FormulariosControles";
import { FormularioAgregarJob } from './AgregarJob.Vm';

interface CreateAgregarJobStepsProps {
    register: UseFormRegister<FormularioAgregarJob>;
    errors: FieldErrors<FormularioAgregarJob>;
    control: Control<FormularioAgregarJob>;
    watch: UseFormWatch<FormularioAgregarJob>;
    setValue: UseFormSetValue<FormularioAgregarJob>;
    getValues: UseFormGetValues<FormularioAgregarJob>;
    metodoHttpSeleccionado: string;
    setMetodoHttpSeleccionado: (value: string) => void;
    opcionesMetodoHttp: Array<{ value: string; label: string }>;
    validacionesFormulario: any;
    configuracionCamposAPI: any;
    pestanasDisponibles: string[];
}

export const createAgregarJobSteps = ({
    register,
    errors,
    control,
    watch,
    setValue,
    getValues,
    metodoHttpSeleccionado,
    setMetodoHttpSeleccionado,
    opcionesMetodoHttp,
    validacionesFormulario,
    configuracionCamposAPI,
    pestanasDisponibles,
}: CreateAgregarJobStepsProps): StepConfig<FormularioAgregarJob>[] => {
    
    return [

        {
            id: 1,
            titulo: 'Información Básica',
            descripcion: 'Datos principales del job',
            icono: <FaInfoCircle size={16} />,
            campos: ['nombre', 'descripcion', 'correoNotificar'],
            renderContent: () => (
                <div className="space-y-6">
                    <div className="grid grid-cols-12 gap-4">
                        <HookFormInput
                            label="Nombre del Job"
                            name="nombre"
                            register={register}
                            errors={errors}
                            placeholder="Ej: Sincronizar usuarios diariamente"
                            required={validacionesFormulario.NOMBRE.required}
                            colSpan="12"
                        />

                        <HookFormInput
                            label="Correo de Notificación"
                            name="correoNotificar"
                            register={register}
                            errors={errors}
                            type="email"
                            placeholder="admin@empresa.com"
                            required={validacionesFormulario.EMAIL.required}
                            colSpan="12"
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
            )
        },

        {
            id: 2,
            titulo: 'Configuración HTTP',
            descripcion: 'URL y método de la API',
            icono: <FaGlobe size={16} />,
            campos: ['url', 'metodoHttp'],
            renderContent: () => (
                <div className="space-y-6">
                    <div className="grid grid-cols-12 gap-4">
                        <HookFormInput
                            label="URL del Endpoint"
                            name="url"
                            register={register}
                            errors={errors}
                            type="url"
                            placeholder="https://api.com/v1/endpoint"
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
                    </div>
                </div>
            )
        },

        {
            id: 3,
            titulo: 'Programación',
            descripcion: 'Cuándo se ejecutará',
            icono: <FaClock size={16} />,
            campos: ['crontab'],
            renderContent: () => (
                <div className="space-y-6">
                    <div className="grid grid-cols-12 gap-4">
                        <HookFormCronExpression
                            label="Programación del Job"
                            name="crontab"
                            register={register}
                            errors={errors}
                            control={control}
                            required={validacionesFormulario.CRON.required}
                            tooltipMessage="Define cuándo se ejecutará el job usando expresiones cron"
                            colSpan="12"
                        />
                    </div>
                </div>
            )
        },

        {
            id: 4,
            titulo: 'Configuración API',
            descripcion: 'Parámetros dinámicos',
            icono: <FaCogs size={16} />,
            campos: [],
            renderContent: () => (
                <div className="space-y-6">
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
            )
        },

        {
            id: 5,
            titulo: 'Configuración Avanzada',
            descripcion: 'Timeout y reintentos',
            icono: <FaSlidersH size={16} />,
            campos: ['timeout', 'reintentosPermitidos', 'periodoReintento'],
            renderContent: () => (
                <div className="space-y-6">
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
                </div>
            )
        }
    ];
}; 