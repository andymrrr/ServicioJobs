import { useState, useCallback } from "react";
import { Debug } from '../../../../utils/debugSystem';
import { isDevelopment } from '../utils/environment';

export function useJobFormUI() {
    const [metodoHttpSeleccionado, setMetodoHttpSeleccionado] = useState<string>("");
    const [mostrarConfigAvanzada, setMostrarConfigAvanzada] = useState(false);

    const resetearUI = useCallback(() => {
        setMetodoHttpSeleccionado("");
        setMostrarConfigAvanzada(false);
        if (isDevelopment) {
            Debug.info('UI_RESET', 'Estados de UI reseteados');
        }
    }, []);

    const configurarMetodoHttp = useCallback((metodo: string) => {
        setMetodoHttpSeleccionado(metodo);
        if (isDevelopment) {
            Debug.info('UI_UPDATE', 'Método HTTP seleccionado', { metodo });
        }
    }, []);

    const toggleConfigAvanzada = useCallback(() => {
        setMostrarConfigAvanzada(prev => {
            const nuevo = !prev;
            if (isDevelopment) {
                Debug.info('UI_TOGGLE', 'Configuración avanzada toggleada', { mostrar: nuevo });
            }
            return nuevo;
        });
    }, []);

    return {
        metodoHttpSeleccionado,
        setMetodoHttpSeleccionado: configurarMetodoHttp,
        mostrarConfigAvanzada,
        setMostrarConfigAvanzada: toggleConfigAvanzada,
        resetearUI
    };
} 