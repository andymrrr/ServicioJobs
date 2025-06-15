import React from 'react';
import { Contenedor } from "../../../components/UI/Contenedor"
import Tarjeta from "../../../components/UI/Tarjeta";
import StepByStep, { useFormSteps } from "../../../components/UI/StepByStep";
import { useAgregarJobVM } from "./AgregarJob.Vm";
import { useParametrosDinamicosVM } from "./ParametrosDinamico.vm";
import { createAgregarJobSteps } from "./AgregarJobSteps.config";
import { DebugPanel } from "../../../components/Dev/DebugPanel";
import { DEBUG_CONFIG } from "../../../config/debug.config";
import { ErrorNotification } from "../../../components/UI/ErrorNotification";

export const PaginaAgregarJob = () => {
    const { 
        isPending,
        metodoHttpSeleccionado,
        setMetodoHttpSeleccionado,
        opcionesMetodoHttp,
        validacionesFormulario,
        register,
        errors,
        control,
        watch,
        setValue,
        getValues,
        onSubmit,
        resetearFormulario,
        trigger
    } = useAgregarJobVM();
    
    const { configuracionCamposAPI, pestanasDisponibles } = useParametrosDinamicosVM();

    // Crear la configuración de pasos
    const steps = createAgregarJobSteps({
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
    });

    const {
        currentStep,
        pasos,
        renderCurrentStep,
        nextStep,
        previousStep,
        goToStep,
        resetToFirstStep,
        createStepAwareSubmitHandler,
    } = useFormSteps({
        steps,
        trigger,
        errors,
    });

    // Crear el manejador de submit controlado por pasos
    const handleSubmit = createStepAwareSubmitHandler(onSubmit);

    // Función combinada para cancelar: resetea formulario y vuelve al primer paso
    const handleCancelar = () => {
        resetearFormulario(); // Resetear formulario
        resetToFirstStep();   // Volver al primer paso
    };

    return (
        <Contenedor>
            <Tarjeta
                titulo="Crear Nuevo Job Programado"
                subtitulo="Configura una tarea automatizada paso a paso"
                lineaHeader={{ mostrar: true, color: "blue", grosor: "2px" }}
                tamano={12}
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* StepByStep con botones integrados y contenido del formulario */}
                    <StepByStep
                        pasos={pasos}
                        pasoActual={currentStep}
                        onPasoClick={goToStep}
                        mostrarDescripcion={true}
                        tema="horizontal"
                        tamano="medium"
                        variante="primary"
                        permitirRetroceso={true}
                        mostrarNumeros={false}
                        animaciones={true}
                        mostrarBotones={true}
                        posicionBotones="abajo"
                        onAnterior={previousStep}
                        onSiguiente={nextStep}
                        onCancelar={handleCancelar}
                        onSubmit={() => handleSubmit()}
                        cargando={isPending}
                        textosBotones={{
                            anterior: 'Anterior',
                            siguiente: 'Siguiente',
                            cancelar: 'Cancelar',
                            finalizar: 'Guardar Job'
                        }}
                        deshabilitarBotones={isPending}
                        
                        // 🆕 Contenido del formulario que se renderizará dentro del layout
                        contenidoFormulario={
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600 min-h-[400px]">
                                {renderCurrentStep()}
                            </div>
                        }
                    />
                </form>
            </Tarjeta>

            {/* 🔍 Panel de Debug (solo en desarrollo) */}
            <DebugPanel 
                mostrar={DEBUG_CONFIG.enabled}
                categories={DEBUG_CONFIG.PANEL_FILTERS.MAIN_CATEGORIES}
                levels={DEBUG_CONFIG.PANEL_FILTERS.LEVELS}
                maxLogs={100}
            />

            {/* ❌ Notificación de Errores (solo en desarrollo) */}
            <ErrorNotification show={DEBUG_CONFIG.enabled} />
        </Contenedor>
    )
}

