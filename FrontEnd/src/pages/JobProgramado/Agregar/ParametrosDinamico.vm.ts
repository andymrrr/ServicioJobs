import { 
    CONFIGURACIONES_API,
    PLANTILLA_BASICA,
} from "../../../components/FormulariosControles/HookFormDinamico";
import { 
    validarConfiguracionAPI 
} from "../../../utils/jobParametrosUtils";

export function useParametrosDinamicosVM() {
    // Lista de pestañas disponibles desde configuración
    const pestanasDisponibles = [...CONFIGURACIONES_API.pestañas] as string[];

    return {
        // Configuraciones
        configuracionCamposAPI: [...CONFIGURACIONES_API.campos],
        valoresDefectoAPI: PLANTILLA_BASICA,
        pestanasDisponibles,
        
        // Función de validación (disponible si se necesita)
        validarConfiguracion: validarConfiguracionAPI
    };
}