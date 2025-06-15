import React, { useEffect, useState } from 'react';
import { Debug, DebugLevel } from '../../utils/debugSystem';

interface ErrorNotificationProps {
    show?: boolean;
    onClose?: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({ 
    show = true, 
    onClose 
}) => {
    const [errors, setErrors] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!show) return;

        const checkForErrors = () => {
            const recentErrors = Debug.getLogs()
                .filter(log => log.level === DebugLevel.ERROR)
                .slice(-3); // Últimos 3 errores

            if (recentErrors.length > 0) {
                setErrors(recentErrors);
                setIsVisible(true);
            }
        };

        const interval = setInterval(checkForErrors, 1000);
        return () => clearInterval(interval);
    }, [show]);

    const handleClose = () => {
        setIsVisible(false);
        setErrors([]);
        onClose?.();
    };

    if (!isVisible || errors.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 max-w-md">
            <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <span className="text-red-400 text-xl">❌</span>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Error en la Aplicación
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                {errors.map((error, index) => (
                                    <div key={index} className="mb-2 last:mb-0">
                                        <div className="font-medium">
                                            [{error.category}] {error.message}
                                        </div>
                                        <div className="text-xs text-red-600 mt-1">
                                            {new Date(error.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3">
                                <button
                                    onClick={() => window.open('/dev/debug-dashboard', '_blank')}
                                    className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded transition-colors"
                                >
                                    🔍 Ver Debug Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <button
                            onClick={handleClose}
                            className="bg-red-50 rounded-md inline-flex text-red-400 hover:text-red-500 focus:outline-none"
                        >
                            <span className="sr-only">Cerrar</span>
                            <span className="text-lg">×</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 