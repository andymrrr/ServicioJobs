import { useCallback, useEffect, useRef } from "react";
import { useAgregarJob } from "../../../../hooks/JobProgramado/useAgregarJob";
import { AgregarJobProgramadoComand } from "../../../../Core/Dominio/Model";
import { DebugForm, Debug } from '../../../../utils/debugSystem';
import { isDevelopment } from '../utils/environment';

export function useJobSubmission() {
    const { ejecutarAsync, isPending, isSuccess, isError, error, data } = useAgregarJob();
    const abortControllerRef = useRef<AbortController | null>(null);

    const ejecutarConCleanup = useCallback(async (comando: AgregarJobProgramadoComand) => {
        // Cancelar request anterior si existe
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Crear nuevo AbortController
        abortControllerRef.current = new AbortController();

        try {
            if (isDevelopment) {
                DebugForm.submit('Iniciando ejecución de comando', comando);
            }
            
            const resultado = await ejecutarAsync(comando);
            
            if (isDevelopment) {
                Debug.success('FORM_SUBMIT', 'Comando ejecutado exitosamente', resultado);
            }
            
            return resultado;
        } catch (error) {
            if (isDevelopment) {
                DebugForm.error('Error en ejecución de comando', error);
            }
            throw error;
        }
    }, [ejecutarAsync]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        ejecutarConCleanup,
        isPending,
        isSuccess,
        isError,
        error,
        data
    };
} 