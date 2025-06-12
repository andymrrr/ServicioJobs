import { ColSpanType, SelectVariant, SelectSize, SelectOption, SelectGroup } from './types';

/**
 * Mapeo de colSpan a clases CSS de Tailwind
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
 * Obtiene las clases CSS del contenedor según la variante
 */
export const getContainerClasses = (variant: SelectVariant, hasError: boolean): string => {
  const baseClasses = 'relative bg-white dark:bg-form-input';
  const errorBorder = hasError ? 'border-red-500 ring-red-500' : '';
  
  switch (variant) {
    case 'basic':
      return `${baseClasses} ${errorBorder}`;
    
    case 'modern':
      return `${baseClasses} rounded-lg shadow-sm border-2 transition-all duration-200 ${
        hasError 
          ? 'border-red-500 ring-2 ring-red-500/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
      }`;
    
    case 'outlined':
      return `${baseClasses} border-2 rounded-md transition-colors ${
        hasError 
          ? 'border-red-500' 
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 focus-within:border-blue-500'
      }`;
    
    case 'filled':
      return `${baseClasses} rounded-lg transition-colors ${
        hasError 
          ? 'bg-red-50 dark:bg-red-900/20 border border-red-500' 
          : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`;
    
    case 'minimal':
      return `${baseClasses} border-b-2 transition-colors ${
        hasError 
          ? 'border-red-500' 
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 focus-within:border-blue-500'
      }`;
    
    default:
      return baseClasses;
  }
};

/**
 * Obtiene las clases CSS del select según la variante, tamaño y estado
 */
export const getSelectClasses = (
  variant: SelectVariant, 
  size: SelectSize, 
  hasError: boolean,
  hasIcon: boolean,
  hasClearButton: boolean,
  isSelected: boolean
): string => {
  const baseClasses = 'w-full appearance-none bg-transparent outline-none transition-colors';
  
  // Clases de tamaño
  const sizeClasses = getSizeClasses(size);
  
  // Clases de padding
  const paddingClasses = getPaddingClasses(size, hasIcon, hasClearButton);
  
  // Clases de variante
  const variantClasses = getSelectVariantClasses(variant);
  
  // Clases de estado
  const stateClasses = getSelectStateClasses(hasError, isSelected);
  
  return `${baseClasses} ${sizeClasses} ${paddingClasses} ${variantClasses} ${stateClasses}`;
};

/**
 * Obtiene las clases de tamaño para el select
 */
const getSizeClasses = (size: SelectSize): string => {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-base';
    case 'lg':
      return 'text-lg';
    default:
      return 'text-base';
  }
};

/**
 * Obtiene las clases de padding según el tamaño y elementos adicionales
 */
const getPaddingClasses = (size: SelectSize, hasIcon: boolean, hasClearButton: boolean): string => {
  const basePadding = {
    'sm': 'py-2',
    'md': 'py-3',
    'lg': 'py-4'
  }[size];

  const leftPadding = hasIcon ? {
    'sm': 'pl-8',
    'md': 'pl-10',
    'lg': 'pl-12'
  }[size] : {
    'sm': 'pl-3',
    'md': 'pl-4',
    'lg': 'pl-5'
  }[size];

  const rightPadding = hasClearButton ? {
    'sm': 'pr-16',
    'md': 'pr-20',
    'lg': 'pr-24'
  }[size] : {
    'sm': 'pr-8',
    'md': 'pr-10',
    'lg': 'pr-12'
  }[size];

  return `${basePadding} ${leftPadding} ${rightPadding}`;
};

/**
 * Obtiene las clases específicas de la variante
 */
const getSelectVariantClasses = (variant: SelectVariant): string => {
  switch (variant) {
    case 'modern':
      return 'rounded-lg';
    case 'outlined':
      return 'rounded-md';
    case 'filled':
      return 'rounded-lg';
    case 'minimal':
      return 'rounded-none';
    default:
      return 'rounded border';
  }
};

/**
 * Obtiene las clases de estado
 */
const getSelectStateClasses = (hasError: boolean, isSelected: boolean): string => {
  if (hasError) {
    return 'text-red-700 dark:text-red-300';
  }
  
  if (isSelected) {
    return 'text-gray-900 dark:text-white';
  }
  
  return 'text-gray-500 dark:text-gray-400';
};

/**
 * Obtiene las clases CSS del icono según el tamaño
 */
export const getIconClasses = (size: SelectSize, variant: SelectVariant): string => {
  const baseClasses = 'absolute top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10';
  
  const sizeClasses = {
    'sm': 'left-2 text-sm',
    'md': 'left-3 text-base',
    'lg': 'left-4 text-lg'
  }[size];

  return `${baseClasses} ${sizeClasses}`;
};

/**
 * Obtiene las clases CSS del icono dropdown según el tamaño
 */
export const getDropdownIconClasses = (size: SelectSize): string => {
  const baseClasses = 'absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10 transition-transform';
  
  const sizeClasses = {
    'sm': 'right-2 text-sm',
    'md': 'right-3 text-base',
    'lg': 'right-4 text-lg'
  }[size];

  return `${baseClasses} ${sizeClasses}`;
};

/**
 * Obtiene las clases CSS del botón clear según el tamaño
 */
export const getClearButtonClasses = (size: SelectSize): string => {
  const baseClasses = 'absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer z-20 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700';
  
  const sizeClasses = {
    'sm': 'right-6 p-1 text-xs',
    'md': 'right-8 p-1.5 text-sm',
    'lg': 'right-10 p-2 text-base'
  }[size];

  return `${baseClasses} ${sizeClasses}`;
};

/**
 * Obtiene las clases CSS del spinner de carga
 */
export const getLoadingSpinnerClasses = (size: SelectSize): string => {
  const baseClasses = 'absolute top-1/2 right-3 -translate-y-1/2 animate-spin text-blue-500 z-10';
  
  const sizeClasses = {
    'sm': 'right-2 w-4 h-4',
    'md': 'right-3 w-5 h-5',
    'lg': 'right-4 w-6 h-6'
  }[size];

  return `${baseClasses} ${sizeClasses}`;
};

/**
 * Formatea opciones básicas para el select nativo
 */
export const formatOptionsForSelect = (options: SelectOption[]): SelectOption[] => {
  return options.map(option => ({
    ...option,
    disabled: option.disabled || false
  }));
};

/**
 * Formatea grupos de opciones
 */
export const formatGroupsForSelect = (groups: SelectGroup[]) => {
  return groups.map(group => ({
    ...group,
    options: formatOptionsForSelect(group.options)
  }));
};

/**
 * Encuentra una opción por valor
 */
export const findOptionByValue = (options: SelectOption[], value: string): SelectOption | null => {
  return options.find(option => option.value === value) || null;
};

/**
 * Encuentra una opción en grupos por valor
 */
export const findOptionInGroups = (groups: SelectGroup[], value: string): SelectOption | null => {
  for (const group of groups) {
    const option = findOptionByValue(group.options, value);
    if (option) return option;
  }
  return null;
};

/**
 * Filtra opciones por texto de búsqueda
 */
export const filterOptions = (options: SelectOption[], searchText: string): SelectOption[] => {
  if (!searchText) return options;
  
  const searchLower = searchText.toLowerCase();
  return options.filter(option => 
    option.label.toLowerCase().includes(searchLower) ||
    option.value.toLowerCase().includes(searchLower) ||
    (option.description && option.description.toLowerCase().includes(searchLower))
  );
};

/**
 * Obtiene el height según el tamaño
 */
export const getSelectHeight = (size: SelectSize): string => {
  switch (size) {
    case 'sm':
      return 'h-8';
    case 'md':
      return 'h-10';
    case 'lg':
      return 'h-12';
    default:
      return 'h-10';
  }
}; 