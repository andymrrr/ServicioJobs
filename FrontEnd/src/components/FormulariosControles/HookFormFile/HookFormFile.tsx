import { FieldValues } from 'react-hook-form';
import { FileFieldProps } from './types';
import { getColSpanClass, getFileContainerClasses } from './utils';
import FileLabel from './FileLabel';
import FileField from './FileField';
import { ErrorMessage } from '../HookFormInput';

/**
 * Componente principal de input file para formularios con react-hook-form
 * Refactorizado en componentes más pequeños para mejor mantenibilidad
 */
const HookFormFile = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  accept,
  multiple = false,
  colSpan = '6',
  className = ''
}: FileFieldProps<T>) => {
  // Obtener clase CSS para el grid
  const colSpanClass = getColSpanClass(colSpan);
  
  // Obtener clases para el contenedor
  const containerClasses = getFileContainerClasses(className);
  
  // Props para el registro del campo
  const registerProps = register(name);

  return (
    <div className={`${colSpanClass} ${containerClasses}`}>
      <FileLabel 
        label={label} 
        tooltipMessage={tooltipMessage} 
      />
      
      <FileField
        name={name}
        accept={accept}
        multiple={multiple}
        registerProps={registerProps}
      />
      
      <ErrorMessage 
        name={name} 
        errors={errors} 
      />
    </div>
  );
};

export default HookFormFile; 