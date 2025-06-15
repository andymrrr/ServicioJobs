import { useState } from 'react';
import { FaInfoCircle, FaGlobe, FaClock, FaCogs, FaSlidersH } from 'react-icons/fa';
import { Control, FieldErrors, UseFormRegister, UseFormTrigger, UseFormWatch, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { HookFormInput } from "../../../components/FormulariosControles/HookFormInput";
import { HookFormSelect } from "../../../components/FormulariosControles/HookFormSelect";
import HookFormDinamico from "../../../components/FormulariosControles/HookFormDinamico";
import { HookFormCronExpression } from "../../../components/FormulariosControles";
import { FormularioAgregarJob } from './AgregarJob.Vm';

interface UseAgregarJobStepsProps {
    register: UseFormRegister<FormularioAgregarJob>;
    errors: FieldErrors<FormularioAgregarJob>;
    control: Control<FormularioAgregarJob>;
    watch: UseFormWatch<FormularioAgregarJob>;
    setValue: UseFormSetValue<FormularioAgregarJob>;
    getValues: UseFormGetValues<FormularioAgregarJob>;
    trigger: UseFormTrigger<FormularioAgregarJob>;
    metodoHttpSeleccionado: string;
    setMetodoHttpSeleccionado: (value: string) => void;
    opcionesMetodoHttp: Array<{ value: string; label: string }>;
    validacionesFormulario: any;
    configuracionCamposAPI: any;
    pestanasDisponibles: string[];
}

export const useAgregarJobSteps = ({
    register,
    errors,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    metodoHttpSeleccionado,
    setMetodoHttpSeleccionado,
    opcionesMetodoHttp,
    validacionesFormulario,
    configuracionCamposAPI,
    pestanasDisponibles,
}: UseAgregarJobStepsProps) => {
    const [pasoActual, setPasoActual] = useState(0);

    
    const pasos = [
        {
            id: 1,
            titulo: 'Información Básica',
            descripcion: 'Datos principales del job',
            icono: <FaInfoCircle size={16} />
        },
        {
            id: 2,
            titulo: 'Configuración HTTP',
            descripcion: 'URL y método de la API',
            icono: <FaGlobe size={16} />
        },
        {
            id: 3,
            titulo: 'Programación',
            descripcion: 'Cuándo se ejecutará',
            icono: <FaClock size={16} />
        },
        {
            id: 4,
            titulo: 'Configuración API',
            descripcion: 'Parámetros dinámicos',
            icono: <FaCogs size={16} />
        },
        {
            id: 5,
            titulo: 'Configuración Avanzada',
            descripcion: 'Timeout y reintentos',
            icono: <FaSlidersH size={16} />
        }
    ];

    
    const camposPorPaso = [
        ['nombre', 'descripcion', 'correoNotificar'], 
        ['url', 'metodoHttp'], 
        ['crontab'],
        ['timeout', 'reintentosPermitidos', 'periodoReintento'] 
    ];

    const validarPasoActual = async () => {
        const campos = camposPorPaso[pasoActual];
        if (campos.length === 0) return true; // Para pasos sin validación específica
        const resultado = await trigger(campos as any);
        return resultado;
    };

    const siguientePaso = async () => {
        const esValido = await validarPasoActual();
        if (esValido && pasoActual < pasos.length - 1) {
            setPasoActual(pasoActual + 1);
        }
    };

    const pasoAnterior = () => {
        if (pasoActual > 0) {
            setPasoActual(pasoActual - 1);
        }
    };

    const irAPaso = async (numeroPaso: number) => {
        // Solo permitir ir a pasos anteriores o al siguiente si es válido
        if (numeroPaso < pasoActual) {
            setPasoActual(numeroPaso);
        } else if (numeroPaso === pasoActual + 1) {
            await siguientePaso();
        }
    };

    // Renderizado de cada paso
    const renderPaso = () => {
        switch (pasoActual) {
            case 0: // Información Básica
                return (
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
                );

            case 1: // Configuración HTTP
                return (
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
                );

            case 2: // Programación
                return (
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
                );

            case 3: // Configuración API
                return (
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
                );

            case 4: // Configuración Avanzada
                return (
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
                );

            default:
                return null;
        }
    };

    return {
        pasoActual,
        pasos,
        renderPaso,
        siguientePaso,
        pasoAnterior,
        irAPaso,
        esUltimoPaso: pasoActual === pasos.length - 1,
        esPrimerPaso: pasoActual === 0,
    };
}; 