import { useCallback } from 'react';
import { Debug, DebugLevel } from '../../utils/debugSystem';

export const useDebugTestData = () => {
    
    // 🧪 Generar logs de prueba
    const generateTestLogs = useCallback(() => {
        const categories = ['API_REQUEST', 'FORM_VALIDATION', 'USER_ACTION', 'SYSTEM_EVENT'];
        const messages = [
            'Usuario inició sesión correctamente',
            'Error al validar formulario',
            'Petición HTTP completada',
            'Datos guardados en localStorage',
            'Error de conexión con el servidor',
            'Formulario enviado exitosamente',
            'Cache actualizado',
            'Token de autenticación renovado'
        ];

        const levels = Object.values(DebugLevel);
        
        // Generar 10 logs aleatorios
        for (let i = 0; i < 10; i++) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const randomLevel = levels[Math.floor(Math.random() * levels.length)];
            
            const testData = {
                userId: Math.floor(Math.random() * 1000),
                timestamp: new Date().toISOString(),
                sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
                userAgent: navigator.userAgent.substring(0, 50) + '...'
            };

            switch (randomLevel) {
                case DebugLevel.INFO:
                    Debug.info(randomCategory, randomMessage, testData);
                    break;
                case DebugLevel.SUCCESS:
                    Debug.success(randomCategory, randomMessage, testData);
                    break;
                case DebugLevel.WARNING:
                    Debug.warning(randomCategory, randomMessage, testData);
                    break;
                case DebugLevel.ERROR:
                    Debug.error(randomCategory, randomMessage, testData);
                    break;
            }
            
            // Pequeña pausa entre logs
            if (i < 9) {
                setTimeout(() => {}, Math.random() * 100);
            }
        }
    }, []);

    // 🔥 Generar errores de prueba
    const generateTestErrors = useCallback(() => {
        const errorMessages = [
            'Error de conexión con la base de datos',
            'Token de autenticación expirado',
            'Validación de formulario fallida',
            'Error 500: Internal Server Error',
            'Error de permisos: Acceso denegado',
            'Error de red: Timeout en la petición'
        ];

        errorMessages.forEach((message, index) => {
            setTimeout(() => {
                Debug.error('TEST_ERROR', message, {
                    errorCode: `ERR_${1000 + index}`,
                    stack: `Error at line ${Math.floor(Math.random() * 100)}`,
                    component: 'TestComponent',
                    action: 'generateTestErrors'
                });
            }, index * 200);
        });
    }, []);

    // ✅ Generar logs de éxito
    const generateSuccessLogs = useCallback(() => {
        const successMessages = [
            'Job programado creado exitosamente',
            'Usuario autenticado correctamente',
            'Datos sincronizados con el servidor',
            'Formulario validado sin errores',
            'Cache actualizado correctamente',
            'Configuración guardada exitosamente'
        ];

        successMessages.forEach((message, index) => {
            setTimeout(() => {
                Debug.success('TEST_SUCCESS', message, {
                    duration: `${Math.floor(Math.random() * 1000)}ms`,
                    recordsProcessed: Math.floor(Math.random() * 100),
                    timestamp: new Date().toISOString()
                });
            }, index * 150);
        });
    }, []);

    // 🔄 Simular flujo completo de formulario
    const simulateFormFlow = useCallback(() => {
        Debug.info('FORM_INIT', 'Formulario inicializado', { formId: 'test-form' });
        
        setTimeout(() => {
            Debug.info('FORM_VALIDATION', 'Validando campos del formulario', {
                fields: ['nombre', 'email', 'url'],
                validationRules: 3
            });
        }, 500);

        setTimeout(() => {
            Debug.success('FORM_VALIDATION', 'Validación completada exitosamente', {
                validFields: 3,
                invalidFields: 0
            });
        }, 1000);

        setTimeout(() => {
            Debug.info('API_REQUEST', 'Enviando datos al servidor', {
                endpoint: '/api/v1/jobs',
                method: 'POST',
                dataSize: '2.3KB'
            });
        }, 1500);

        setTimeout(() => {
            Debug.success('API_RESPONSE', 'Datos guardados exitosamente', {
                jobId: Math.floor(Math.random() * 10000),
                responseTime: '234ms',
                status: 201
            });
        }, 2000);
    }, []);

    return {
        generateTestLogs,
        generateTestErrors,
        generateSuccessLogs,
        simulateFormFlow
    };
}; 