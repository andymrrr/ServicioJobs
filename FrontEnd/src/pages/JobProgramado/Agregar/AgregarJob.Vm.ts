import { useCallback, useMemo } from "react";
import { 
    OPCIONES_METODO_HTTP,
    REGLAS_VALIDACION_JOB
} from "./AgregarJob.config";
import { DebugForm, Debug } from '../../../utils/debugSystem';
import { FormularioAgregarJob } from './types/FormularioAgregarJob';
import { 
    useJobFormLogic,
    useJobDataTransform,
    useJobFormUI,
    useJobSubmission
} from './hooks';
import { isDevelopment } from './utils/environment';

// 🎯 Hook principal orquestador
export function useAgregarJobVM() {
    const formMethods = useJobFormLogic();
    const { transformarDatos } = useJobDataTransform();
    const uiState = useJobFormUI();
    const { ejecutarConCleanup, isPending, isSuccess, isError, error, data } = useJobSubmission();

    // 🧹 Procesamiento optimizado de datos
    const procesarDatosFormulario = useCallback(async (data: FormularioAgregarJob) => {
        if (isDevelopment) {
            DebugForm.submit('Iniciando procesamiento de datos del formulario', data);
        }
        
        try {
            const comando = transformarDatos(data);
            const resultado = await ejecutarConCleanup(comando);
            
            if (isDevelopment) {
                DebugForm.submit('Formulario procesado exitosamente', resultado);
            }
            
            return resultado;
        } catch (error) {
            if (isDevelopment) {
                DebugForm.error('Error en procesamiento de datos', error);
            }
            throw error;
        }
    }, [transformarDatos, ejecutarConCleanup]);

    // 🎯 Manejador principal de envío optimizado
    const handleAgregarJob = useCallback(async (data: FormularioAgregarJob) => {
        if (isDevelopment) {
            DebugForm.submit('Iniciando envío del formulario', {
                datosFormulario: data,
                validaciones: {
                    hasErrors: Object.keys(formMethods.formState.errors).length > 0,
                    errores: formMethods.formState.errors
                }
            });
        }
        
        try {
            const resultado = await procesarDatosFormulario(data);
            if (isDevelopment) {
                DebugForm.submit('Formulario enviado exitosamente', resultado);
            }
            return resultado;
        } catch (error) {
            if (isDevelopment) {
                DebugForm.error('Error en envío del formulario', error);
            }
            throw error;
        }
    }, [procesarDatosFormulario, formMethods.formState.errors]);

    // 🎯 OnSubmit memoizado
    const onSubmit = useMemo(() => 
        formMethods.handleSubmit(handleAgregarJob), 
        [formMethods.handleSubmit, handleAgregarJob]
    );

    // 🧹 Resetear formulario optimizado
    const resetearFormulario = useCallback(() => {
        if (isDevelopment) {
            Debug.info('FORM_RESET', 'Reseteando formulario', {
                antesReset: {
                    metodoHttpSeleccionado: uiState.metodoHttpSeleccionado,
                    mostrarConfigAvanzada: uiState.mostrarConfigAvanzada
                }
            });
        }
        
        formMethods.reset();
        uiState.resetearUI();
        
        if (isDevelopment) {
            Debug.success('FORM_RESET', 'Formulario reseteado exitosamente');
        }
    }, [formMethods.reset, uiState.resetearUI, uiState.metodoHttpSeleccionado, uiState.mostrarConfigAvanzada]);

    // 📋 Configuraciones memoizadas
    const configuraciones = useMemo(() => ({
        opcionesMetodoHttp: OPCIONES_METODO_HTTP,
        validacionesFormulario: REGLAS_VALIDACION_JOB
    }), []);

    return {
        // 🔄 Estado de carga
        isPending,
        isSuccess,
        isError,
        error,
        data,
        
        // 🎛️ Estado de UI
        metodoHttpSeleccionado: uiState.metodoHttpSeleccionado,
        setMetodoHttpSeleccionado: uiState.setMetodoHttpSeleccionado,
        mostrarConfigAvanzada: uiState.mostrarConfigAvanzada,
        setMostrarConfigAvanzada: uiState.setMostrarConfigAvanzada,
        
        // 📋 Configuraciones
        opcionesMetodoHttp: configuraciones.opcionesMetodoHttp,
        validacionesFormulario: configuraciones.validacionesFormulario,
        
        // 📝 Métodos de formulario
        register: formMethods.register,
        errors: formMethods.formState.errors,
        control: formMethods.control,
        watch: formMethods.watch,
        setValue: formMethods.setValue,
        getValues: formMethods.getValues,
        trigger: formMethods.trigger,
        onSubmit,
        resetearFormulario
    };
}

// Re-exportar el tipo para compatibilidad
export type { FormularioAgregarJob };
