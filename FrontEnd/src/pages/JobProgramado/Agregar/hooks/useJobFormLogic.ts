import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { 
    FormularioTabData,
    PLANTILLA_BASICA
} from "../../../../components/FormulariosControles/HookFormDinamico";
import { Debug } from '../../../../utils/debugSystem';
import { FormularioAgregarJob } from '../types/FormularioAgregarJob';
import { isDevelopment } from '../utils/environment';

export function useJobFormLogic() {
    const plantillaRef = useRef(PLANTILLA_BASICA);
    
    const formMethods = useForm<FormularioAgregarJob>({
        defaultValues: {
            configuracionAPI: plantillaRef.current
        }
    });

    useEffect(() => {
        formMethods.setValue('configuracionAPI', plantillaRef.current);
        if (isDevelopment) {
            Debug.info('FORM_INIT', 'Formulario inicializado con plantilla básica', plantillaRef.current);
        }
    }, [formMethods.setValue]);

    return formMethods;
} 