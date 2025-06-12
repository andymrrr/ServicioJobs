import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { SelectFieldProps } from './types';
import { 
  getContainerClasses, 
  getSelectClasses,
  getIconClasses,
  getDropdownIconClasses
} from './utils';
import LoadingSpinner from './LoadingSpinner';
import ClearButton from './ClearButton';

/**
 * Componente avanzado para renderizar el campo select con múltiples variantes
 */
export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  options = [],
  groups,
  selectedValue = '',
  onChange,
  placeholder = "Selecciona una opción...",
  icon,
  variant = 'basic',
  size = 'md',
  disabled = false,
  loading = false,
  clearable = false,
  emptyMessage = "No hay opciones disponibles",
  loadingMessage = "Cargando...",
  hasError = false,
  registerProps
}) => {
  const [isSelected, setIsSelected] = useState(!!selectedValue);

  // Manejar cambio de valor
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (registerProps && registerProps.onChange) {
      registerProps.onChange(event); // Mantener RHF funcionando
    }
    if (onChange) {
      onChange(value);
    }
    setIsSelected(!!value);
  };

  // Manejar limpiar selección
  const handleClear = () => {
    if (onChange) onChange('');
    setIsSelected(false);
  };

  // Clases CSS
  const containerClasses = getContainerClasses(variant, hasError);
  const hasClearButton = clearable && selectedValue && !disabled;
  const selectClasses = getSelectClasses(
    variant, 
    size, 
    hasError, 
    !!icon, 
    !!hasClearButton,
    isSelected
  );
  const iconClasses = icon ? getIconClasses(size, variant) : '';
  const dropdownIconClasses = getDropdownIconClasses(size);

  // Mostrar mensaje de carga
  if (loading) {
    return (
      <div className={containerClasses}>
        {icon && (
          <div className={iconClasses}>
            {icon}
          </div>
        )}
        
        <div className={selectClasses.replace('cursor-pointer', 'cursor-wait')}>
          {loadingMessage}
        </div>
        
        <LoadingSpinner size={size} />
      </div>
    );
  }

  // Renderizar opciones normales
  const renderOptions = () => {
    if (groups) {
      return groups.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
              className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
            >
              {option.label}
            </option>
          ))}
        </optgroup>
      ));
    }

    return options.map((option) => (
      <option 
        key={option.value} 
        value={option.value} 
        disabled={option.disabled}
        className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
      >
        {option.label}
        {option.description && ` - ${option.description}`}
      </option>
    ));
  };

  // --- LÓGICA CLAVE: Si el usuario NO pasa onChange, solo usar registerProps (como RHF clásico) ---
  const selectProps = typeof onChange === 'function'
    ? {
        ...registerProps,
        value: selectedValue,
        onChange: handleChange,
        disabled,
        className: selectClasses,
        'aria-label': placeholder
      }
    : {
        ...registerProps,
        disabled,
        className: selectClasses,
        'aria-label': placeholder
      };

  return (
    <div className={containerClasses}>
      {/* Icono izquierdo */}
      {icon && (
        <div className={iconClasses}>
          {icon}
        </div>
      )}
      
      {/* Select element */}
      <select {...selectProps}>
        {/* Opción placeholder */}
        <option value="" disabled className="text-gray-500 dark:text-gray-400">
          {placeholder}
        </option>
        
        {/* Opciones */}
        {options.length === 0 && !groups ? (
          <option value="" disabled className="text-gray-500 dark:text-gray-400">
            {emptyMessage}
          </option>
        ) : (
          renderOptions()
        )}
      </select>

      {/* Botón clear */}
      {hasClearButton && (
        <ClearButton onClear={handleClear} />
      )}
      
      {/* Icono dropdown */}
      {!loading && (
        <div className={dropdownIconClasses}>
          <FiChevronDown />
        </div>
      )}
    </div>
  );
};

export default SelectField; 