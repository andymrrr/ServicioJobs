import React from 'react';
import { Contenedor } from "../../../components/UI/Contenedor"
import Tarjeta from "../../../components/UI/Tarjeta";
import BotonPrimario from "../../../components/UI/Botones/BotonPrimario";
import StepByStep, { useFormSteps } from "../../../components/UI/StepByStep";
import { useAgregarJobVM } from "./AgregarJob.Vm";
import { useParametrosDinamicosVM } from "./ParametrosDinamico.vm";
import { createAgregarJobSteps } from "./AgregarJobSteps.config";

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
        isFirstStep,
        isLastStep,
    } = useFormSteps({
        steps,
        trigger,
        errors,
    });

    return (
        <Contenedor>
            <Tarjeta
                titulo="Crear Nuevo Job Programado"
                subtitulo="Configura una tarea automatizada paso a paso"
                lineaHeader={{ mostrar: true, color: "blue", grosor: "2px" }}
                tamano={12}
            >
                <form onSubmit={onSubmit} className="space-y-8">
                    {/* Navegador de Pasos */}
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
                    />

                    {/* Contenido del Paso Actual */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600 min-h-[400px]">
                        {renderCurrentStep()}
                    </div>

                    
                    <div className="flex justify-between items-center pt-4">
                        <BotonPrimario
                            texto="Anterior"
                            color="gray"
                            variante="outline"
                            tamaño="mediano"
                            onClick={previousStep}
                            deshabilitar={isFirstStep || isPending}
                        />
                        
                        <div className="flex gap-3">
                            <BotonPrimario
                                texto="Cancelar"
                                color="gray"
                                variante="outline"
                                tamaño="mediano"
                                onClick={resetearFormulario}
                                deshabilitar={isPending}
                            />
                            
                            {isLastStep ? (
                                <BotonPrimario
                                    texto={isPending ? "Guardando..." : "Guardar Job"}
                                    color="primary"
                                    tipo="submit"
                                    tamaño="mediano"
                                    deshabilitar={isPending}
                                    cargando={isPending}
                                />
                            ) : (
                                <BotonPrimario
                                    texto="Siguiente"
                                    color="primary"
                                    tamaño="mediano"
                                    onClick={nextStep}
                                    deshabilitar={isPending}
                                />
                            )}
                        </div>
                    </div>
                </form>
            </Tarjeta>
        </Contenedor>
    )
}

