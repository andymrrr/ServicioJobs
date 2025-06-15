import React from 'react';
import { Contenedor } from "../../../components/UI/Contenedor"
import Tarjeta from "../../../components/UI/Tarjeta";
import BotonPrimario from "../../../components/UI/Botones/BotonPrimario";
import StepByStep from "../../../components/UI/StepByStep";
import { useAgregarJobVM } from "./AgregarJob.Vm";
import { useParametrosDinamicosVM } from "./ParametrosDinamico.vm";
import { useAgregarJobSteps } from "./useAgregarJobSteps";

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

    const {
        pasoActual,
        pasos,
        renderPaso,
        siguientePaso,
        pasoAnterior,
        irAPaso,
        esUltimoPaso,
        esPrimerPaso,
    } = useAgregarJobSteps({
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
                        pasoActual={pasoActual}
                        onPasoClick={irAPaso}
                        mostrarDescripcion={true}
                        tema="horizontal"
                        tamano="medium"
                        variante="primary"
                        permitirRetroceso={true}
                        mostrarNumeros={false}
                        animaciones={true}
                    />

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600 min-h-[400px]">
                        {renderPaso()}
                    </div>

                    
                    <div className="flex justify-between items-center pt-4">
                        <BotonPrimario
                            texto="Anterior"
                            color="gray"
                            variante="outline"
                            tamaño="mediano"
                            onClick={pasoAnterior}
                            deshabilitar={esPrimerPaso || isPending}
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
                            
                            {esUltimoPaso ? (
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
                                    onClick={siguientePaso}
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

