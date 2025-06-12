import { FieldValues } from 'react-hook-form';
import { CheckboxFieldProps } from './types';
import { getColSpanClass } from './utils';
import CheckboxLabel from './CheckboxLabel';
import CheckboxField from './CheckboxField';
import { ErrorMessage } from '../HookFormInput';

/**
 * Componente principal de checkbox para formularios con react-hook-form
 * Refactorizado en componentes más pequeños para mejor mantenibilidad
 */
const HookFormCheckbox = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  colSpan = '6'
}: CheckboxFieldProps<T>) => {
  // Obtener clase CSS para el grid
  const colSpanClass = getColSpanClass(colSpan);
  
  // Props para el registro del campo
  const registerProps = register(name);

  return (
    <div className={colSpanClass}>
      <div className="flex cursor-pointer select-none items-center">
        <CheckboxField
          name={name}
          registerProps={registerProps}
        />
        
        <CheckboxLabel
          label={label}
          name={name}
          tooltipMessage={tooltipMessage}
        />
      </div>
      
      <ErrorMessage 
        name={name} 
        errors={errors} 
      />
    </div>
  );
};

export default HookFormCheckbox; 