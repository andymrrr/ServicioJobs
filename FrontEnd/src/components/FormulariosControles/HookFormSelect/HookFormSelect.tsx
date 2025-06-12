import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { HookFormSelectProps } from './types';
import { getColSpanClass } from './utils';
import SelectLabel from './SelectLabel';
import SelectField from './SelectField';
import ErrorMessage from './ErrorMessage';

export  const HookFormSelect = <T extends FieldValues>({
  label,
  name,
  options = [],
  groups,
  register,
  errors,
  selectedValue = '',
  onChange,
  placeholder = 'Selecciona una opción...',
  icon,
  colSpan = '6',
  tooltipMessage,
  variant = 'basic',
  size = 'md',
  disabled = false,
  loading = false,
  clearable = false,
  emptyMessage = 'No hay opciones disponibles',
  loadingMessage = 'Cargando...',
  required = false,
  validate
}: HookFormSelectProps<T>) => {
  
  // Estado local para el valor seleccionado si no se proporciona
  const [internalValue, setInternalValue] = useState(selectedValue);
  
  // Usar valor controlado o interno
  const currentValue = selectedValue !== undefined ? selectedValue : internalValue;
  
  // Obtener clase CSS para el grid
  const colSpanClass = getColSpanClass(colSpan);
  
  // Verificar si hay errores
  const hasError = !!errors[name];
  
  // Configurar validaciones
  const validationRules: any = {};
  if (required) {
    validationRules.required = typeof required === 'string' ? required : `El ${label} es requerido`;
  }
  if (validate) {
    validationRules.validate = validate;
  }
  
  // Props para el registro del campo
  const registerProps = register(name, validationRules);

  // Manejar cambio de valor
  const handleChange = (value: string) => {
    // Actualizar valor interno si no está controlado
    if (selectedValue === undefined) {
      setInternalValue(value);
    }
    
    // Llamar callback si se proporciona
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={colSpanClass}>
      <SelectLabel 
        label={label}
        tooltipMessage={tooltipMessage}
        required={!!required}
      />
      
      <SelectField
        name={name}
        options={options}
        groups={groups}
        selectedValue={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        icon={icon}
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        clearable={clearable}
        emptyMessage={emptyMessage}
        loadingMessage={loadingMessage}
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
