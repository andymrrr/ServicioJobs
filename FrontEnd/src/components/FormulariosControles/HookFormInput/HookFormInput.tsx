import { FieldValues } from 'react-hook-form';
import { InputFieldProps } from './types';
import { getColSpanClass, buildRegisterOptions } from './utils';
import InputLabel from './InputLabel';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';

const HookFormInput = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder,
  disabled = false,
  tooltipMessage,
  required,
  pattern,
  minLength,
  maxLength,
  colSpan = '6'
}: InputFieldProps<T>) => {
  // Construir opciones de validación para react-hook-form
  const registerOptions = buildRegisterOptions({ required, pattern, minLength, maxLength });
  
  // Obtener clase CSS para el grid
  const colSpanClass = getColSpanClass(colSpan);
  
  // Verificar si hay errores
  const hasError = !!errors[name];
  
  // Props para el registro del campo
  const registerProps = register(name, registerOptions);

  return (
    <div className={colSpanClass}>
      <InputLabel 
        label={label} 
        tooltipMessage={tooltipMessage} 
      />
      
      <InputField
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        hasError={hasError}
        registerProps={registerProps}
      />
      
      <ErrorMessage 
        name={name} 
        errors={errors} 
      />
    </div>
  );
};

export default HookFormInput;
