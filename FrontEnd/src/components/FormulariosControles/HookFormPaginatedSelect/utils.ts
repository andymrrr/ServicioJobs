import { ColSpanType, SelectValidationProps, SelectOption } from './types';

/**
 * Mapeo de colSpan a clases CSS de Tailwind (reutilizado del input)
 */
export const getColSpanClass = (colSpan: ColSpanType): string => {
  const colSpanClassMap: Record<ColSpanType, string> = {
    '1': 'col-span-1',
    '2': 'col-span-2',
    '3': 'col-span-3',
    '4': 'col-span-4',
    '5': 'col-span-5',
    '6': 'col-span-6',
    '7': 'col-span-7',
    '8': 'col-span-8',
    '9': 'col-span-9',
    '10': 'col-span-10',
    '11': 'col-span-11',
    '12': 'col-span-12',
  };
  
  return colSpanClassMap[colSpan] || 'col-span-6';
};

/**
 * Construye las opciones de registro para react-hook-form
 */
export const buildSelectRegisterOptions = (validations: SelectValidationProps) => {
  const { required } = validations;
  
  return {
    ...(required && { required }),
  };
};

/**
 * Genera las clases CSS para el select basado en el estado
 */
export const getSelectClasses = (hasError: boolean, disabled: boolean, isOpen: boolean): string => {
  const baseClasses = `
    w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition cursor-pointer
    dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
    flex items-center justify-between
  `.trim();

  const errorClasses = hasError
    ? 'border-danger focus:border-danger'
    : 'border-stroke focus:border-primary hover:border-primary';

  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : '';
  
  const openClasses = isOpen ? 'border-primary' : '';

  return `${baseClasses} ${errorClasses} ${disabledClasses} ${openClasses}`.trim();
};

/**
 * Genera las clases CSS para el dropdown
 */
export const getDropdownClasses = (isOpen: boolean): string => {
  const baseClasses = `
    absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-form-input
    border border-stroke dark:border-form-strokedark rounded shadow-lg max-h-60 overflow-hidden
    transition-all duration-200
  `.trim();
  
  const visibilityClasses = isOpen 
    ? 'opacity-100 translate-y-0 pointer-events-auto' 
    : 'opacity-0 -translate-y-2 pointer-events-none';
  
  return `${baseClasses} ${visibilityClasses}`.trim();
};

/**
 * Genera las clases CSS para cada opción del select
 */
export const getOptionClasses = (isSelected: boolean, isHovered: boolean = false): string => {
  const baseClasses = `
    px-4 py-3 cursor-pointer transition-colors duration-150
    text-sm border-b border-stroke dark:border-form-strokedark last:border-b-0
  `.trim();
  
  let stateClasses = '';
  
  if (isSelected) {
    stateClasses = 'bg-primary text-white';
  } else if (isHovered) {
    stateClasses = 'bg-gray-50 dark:bg-gray-700';
  } else {
    stateClasses = 'hover:bg-gray-50 dark:hover:bg-gray-700';
  }
  
  return `${baseClasses} ${stateClasses}`.trim();
};

/**
 * Genera las clases CSS para el input de búsqueda
 */
export const getSearchInputClasses = (): string => {
  return `
    w-full px-4 py-3 border-b border-stroke dark:border-form-strokedark
    bg-white dark:bg-form-input outline-none text-sm
    placeholder:text-gray-400 dark:placeholder:text-gray-500
  `.trim();
};

/**
 * Función para debounce de búsquedas
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Función para filtrar opciones localmente (útil para búsquedas simples)
 */
export const filterOptions = (options: SelectOption[], searchTerm: string): SelectOption[] => {
  if (!searchTerm.trim()) return options;
  
  const term = searchTerm.toLowerCase();
  return options.filter(option => 
    option.label.toLowerCase().includes(term) ||
    String(option.value).toLowerCase().includes(term)
  );
};

/**
 * Función para encontrar una opción por valor
 */
export const findOptionByValue = (
  options: SelectOption[], 
  value: string | number | null
): SelectOption | null => {
  if (value === null || value === undefined) return null;
  return options.find(option => String(option.value) === String(value)) || null;
};

/**
 * Función de transformación por defecto para datos de API
 */
export const defaultTransformData = (item: any): SelectOption => {
  // Intenta diferentes propiedades comunes para label y value
  const getValue = () => {
    return item.id || item.value || item.key || item.codigo || item.Id;
  };
  
  const getLabel = () => {
    return item.name || item.label || item.title || item.nombre || item.descripcion || String(getValue());
  };
  
  return {
    value: getValue(),
    label: getLabel(),
    ...item // Mantener propiedades originales
  };
};

/**
 * Función para validar la estructura de respuesta de la API
 */
export const validateApiResponse = (response: any): boolean => {
  return !!(
    response &&
    Array.isArray(response.data) &&
    response.pagination &&
    typeof response.pagination.currentPage === 'number' &&
    typeof response.pagination.totalPages === 'number' &&
    typeof response.pagination.hasNextPage === 'boolean'
  );
};

/**
 * Función para generar un ID único para el dropdown
 */
export const generateDropdownId = (name: string): string => {
  return `paginated-select-${name}-${Math.random().toString(36).substr(2, 9)}`;
}; 