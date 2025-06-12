import { FieldValues } from 'react-hook-form';
import { TextareaFieldProps } from './types';
import { getColSpanClass } from './utils';
import TextareaLabel from './TextareaLabel';
import TextareaField from './TextareaField';
import ErrorMessage from './ErrorMessage';

const HookFormTextarea = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  placeholder,
  rows = 6,
  disabled = false,
  colSpan = '6'
}: TextareaFieldProps<T>) => {
  // Obtener clase CSS para el grid
  const colSpanClass = getColSpanClass(colSpan);
  
  // Verificar si hay errores
  const hasError = !!errors[name];
  
  // Props para el registro del campo
  const registerProps = register(name);

  return (
    <div className={colSpanClass}>
      <TextareaLabel 
        label={label} 
        tooltipMessage={tooltipMessage} 
      />
      
      <TextareaField
        placeholder={placeholder}
        disabled={disabled}
        hasError={hasError}
        rows={rows}
        registerProps={registerProps}
      />
      
      <ErrorMessage 
        name={name} 
        errors={errors} 
      />
    </div>
  );
};

export default HookFormTextarea; 