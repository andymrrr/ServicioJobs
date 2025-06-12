import { FieldValues } from 'react-hook-form';
import { SwitcherFieldProps } from './types';
import { getColSpanClass } from './utils';
import SwitcherLabel from './SwitcherLabel';
import SwitcherField from './SwitcherField';
import { ErrorMessage } from '../HookFormInput';

/**
 * Componente principal de switcher/toggle para formularios con react-hook-form
 * Refactorizado en componentes más pequeños para mejor mantenibilidad
 */
const HookFormSwitcher = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  colSpan = '6'
}: SwitcherFieldProps<T>) => {
  // Obtener clase CSS para el grid
  const colSpanClass = getColSpanClass(colSpan);
  
  // Props para el registro del campo
  const registerProps = register(name);

  return (
    <div className={colSpanClass}>
      <SwitcherLabel 
        label={label} 
        tooltipMessage={tooltipMessage} 
      />
      
      <SwitcherField
        name={name}
        registerProps={registerProps}
      />
      
      <ErrorMessage 
        name={name} 
        errors={errors} 
      />
    </div>
  );
};

export default HookFormSwitcher; 