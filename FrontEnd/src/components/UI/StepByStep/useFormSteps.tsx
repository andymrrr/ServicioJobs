import { ReactNode, useState } from 'react';
import { FieldValues, FieldErrors, UseFormTrigger, Path } from 'react-hook-form';

export interface StepConfig<T extends FieldValues> {
    id: number;
    titulo: string;
    descripcion: string;
    icono?: ReactNode;
    campos: Path<T>[];
    renderContent: () => ReactNode;
}

interface UseFormStepsProps<T extends FieldValues> {
    steps: StepConfig<T>[];
    trigger: UseFormTrigger<T>;
    errors?: FieldErrors<T>;
}

export const useFormSteps = <T extends FieldValues>({
    steps,
    trigger,
    errors
}: UseFormStepsProps<T>) => {
    const [currentStep, setCurrentStep] = useState(0);

    
    const stepByStepPasos = steps.map(step => ({
        id: step.id,
        titulo: step.titulo,
        descripcion: step.descripcion,
        icono: step.icono
    }));

    const validateCurrentStep = async (): Promise<boolean> => {
        const currentStepConfig = steps[currentStep];
        if (!currentStepConfig?.campos || currentStepConfig.campos.length === 0) {
            return true; // Paso sin validación específica
        }
        
        const result = await trigger(currentStepConfig.campos);
        return result;
    };

    const nextStep = async (): Promise<boolean> => {
        const isValid = await validateCurrentStep();
        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            return true;
        }
        return false;
    };

    const previousStep = (): boolean => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            return true;
        }
        return false;
    };

    const goToStep = async (stepIndex: number): Promise<boolean> => {
        
        if (stepIndex < 0 || stepIndex >= steps.length) {
            return false;
        }

        if (stepIndex < currentStep) {
            setCurrentStep(stepIndex);
            return true;
        } else if (stepIndex === currentStep + 1) {
            return await nextStep();
        }
        
        return false;
    };

    const renderCurrentStep = (): ReactNode => {
        const currentStepConfig = steps[currentStep];
        return currentStepConfig?.renderContent() || null;
    };

    
    const getCurrentStepErrors = () => {
        if (!errors) return {};
        
        const currentStepConfig = steps[currentStep];
        if (!currentStepConfig?.campos) return {};

        const stepErrors: Partial<FieldErrors<T>> = {};
        currentStepConfig.campos.forEach(campo => {
            if (errors[campo]) {
                stepErrors[campo] = errors[campo];
            }
        });
        
        return stepErrors;
    };

    // Verificar si el paso actual tiene errores
    const hasCurrentStepErrors = (): boolean => {
        const stepErrors = getCurrentStepErrors();
        return Object.keys(stepErrors).length > 0;
    };

    // Nueva función para manejar submit controlado
    const createStepAwareSubmitHandler = (originalSubmitHandler: (e?: React.FormEvent) => void) => {
        return (e?: React.FormEvent) => {
            if (e) {
                e.preventDefault();
            }
            
            const isLastStep = currentStep === steps.length - 1;
            
            if (isLastStep) {
                // Estamos en el último paso, ejecutar el submit original
                originalSubmitHandler(e);
            } else {
                // No estamos en el último paso, ir al siguiente paso
                nextStep();
            }
        };
    };

    // Nueva función para resetear al primer paso
    const resetToFirstStep = () => {
        setCurrentStep(0);
    };

    return {
        // Estado actual
        currentStep,
        pasos: stepByStepPasos, // Para el componente StepByStep
        
        // Navegación
        nextStep,
        previousStep,
        goToStep,
        setCurrentStep,
        resetToFirstStep,
        
        // Rendering
        renderCurrentStep,
        
        // Validación
        validateCurrentStep,
        getCurrentStepErrors,
        hasCurrentStepErrors,
        
        // Estados derivados
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === steps.length - 1,
        totalSteps: steps.length,
        
        // Información del paso actual
        currentStepInfo: steps[currentStep],
        
        // Nueva función para manejar submit controlado
        createStepAwareSubmitHandler,
    };
}; 