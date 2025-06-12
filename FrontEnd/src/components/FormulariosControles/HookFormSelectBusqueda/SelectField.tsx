import React from 'react';
import Select from 'react-select';
import { SelectFieldProps } from './types';
import { 
  getContainerClasses, 
  getIconClasses, 
  getReactSelectStyles,
  formatOptionsForReactSelect,
  formatGroupsForReactSelect,
  findOptionByValue,
  findOptionInGroups,
  defaultCustomFilter
} from './utils';

/**
 * Componente avanzado para renderizar el campo select con múltiples variantes
 */
export const SelectField: React.FC<SelectFieldProps> = ({
  options = [],
  groups,
  selectedValue,
  onChange,
  placeholder = "Selecciona una opción...",
  icon,
  variant = 'basic',
  size = 'md',
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  isLoading = false,
  disabled = false,
  hasError = false,
  noOptionsMessage = "No hay opciones disponibles",
  loadingMessage = "Cargando...",
  customFilter = defaultCustomFilter,
  formatOptionLabel,
  reactSelectProps = {}
}) => {
  // Preparar opciones para react-select
  const formattedOptions = groups 
    ? formatGroupsForReactSelect(groups)
    : formatOptionsForReactSelect(options);

  // Encontrar valor actual
  const currentValue = React.useMemo(() => {
    if (!selectedValue) return isMulti ? [] : null;
    
    const allOptions = groups ? groups.flatMap(g => g.options) : options;
    return findOptionByValue(allOptions, selectedValue);
  }, [selectedValue, options, groups, isMulti]);

  // Manejar cambio de valor
  const handleChange = (newValue: any) => {
    if (isMulti) {
      const values = newValue ? newValue.map((option: any) => option.value) : [];
      onChange(values);
    } else {
      onChange(newValue?.value || '');
    }
  };

  // Filtrado personalizado
  const filterOption = (option: any, inputValue: string) => {
    if (!customFilter) return true;
    return customFilter(option.data, inputValue);
  };

  // Formato personalizado de opciones
  const formatOption = (option: any) => {
    if (formatOptionLabel) {
      return formatOptionLabel(option.data || option);
    }

    const optionData = option.data || option;
    return (
      <div className="flex items-center">
        {optionData.color && (
          <div 
            className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
            style={{ backgroundColor: optionData.color }}
          />
        )}
        <div>
          <div className="font-medium">{optionData.label}</div>
          {optionData.description && (
            <div className="text-sm text-gray-500">{optionData.description}</div>
          )}
        </div>
      </div>
    );
  };

  // Clases CSS
  const containerClasses = getContainerClasses(variant, hasError);
  const iconClasses = icon ? getIconClasses(size) : '';

  // Estilos de react-select
  const selectStyles = getReactSelectStyles(variant, size, hasError, !!icon);

  return (
    <div className={containerClasses}>
      {icon && (
        <div className={iconClasses}>
          {icon}
        </div>
      )}
      
      <Select
        options={formattedOptions}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isLoading={isLoading}
        isDisabled={disabled}
        filterOption={isSearchable ? filterOption : undefined}
        formatOptionLabel={formatOption}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => loadingMessage}
        styles={selectStyles}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        {...reactSelectProps}
      />
    </div>
  );
};

export default SelectField; 