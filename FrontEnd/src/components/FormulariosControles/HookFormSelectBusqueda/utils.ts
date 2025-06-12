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
  
  switch (variant) {
    case 'basic':
      return `${baseClasses} ${hasError ? 'border-red-500' : ''}`;
    case 'modern':
      return `${baseClasses} rounded-lg shadow-sm border ${hasError ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`;
    case 'icon':
      return `${baseClasses} border rounded-md ${hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`;
    case 'compact':
      return `${baseClasses} border rounded ${hasError ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`;
    default:
      return baseClasses;
  }
};

/**
 * Obtiene el padding del icono según la variante y tamaño
 */
export const getIconPadding = (variant: SelectVariant, size: SelectSize): string => {
  if (variant !== 'icon') return '';
  
  switch (size) {
    case 'sm':
      return 'pl-8';
    case 'md':
      return 'pl-10';
    case 'lg':
      return 'pl-12';
    default:
      return 'pl-10';
  }
};

/**
 * Obtiene las clases CSS del icono según el tamaño
 */
export const getIconClasses = (size: SelectSize): string => {
  const baseClasses = 'absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10';
  
  switch (size) {
    case 'sm':
      return `${baseClasses} text-sm left-2`;
    case 'md':
      return `${baseClasses} text-base`;
    case 'lg':
      return `${baseClasses} text-lg left-4`;
    default:
      return baseClasses;
  }
};

/**
 * Obtiene los estilos personalizados para react-select según la variante y tamaño
 */
export const getReactSelectStyles = (
  variant: SelectVariant, 
  size: SelectSize, 
  hasError: boolean,
  hasIcon: boolean
) => ({
  control: (provided: any, state: any) => {
    const baseStyles = {
      ...provided,
      minHeight: getSizeHeight(size),
      borderRadius: getVariantBorderRadius(variant),
      borderColor: hasError 
        ? '#ef4444' 
        : state.isFocused 
          ? '#3b82f6' 
          : getVariantBorderColor(variant),
      boxShadow: state.isFocused 
        ? getVariantFocusBoxShadow(variant) 
        : 'none',
      '&:hover': {
        borderColor: hasError ? '#ef4444' : '#6b7280',
      },
      paddingLeft: hasIcon ? getIconPaddingValue(size) : '12px',
    };

    return {
      ...baseStyles,
      backgroundColor: 'transparent',
    };
  },
  
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: getSizeFontSize(size),
  }),

  singleValue: (provided: any) => ({
    ...provided,
    color: 'inherit',
    fontSize: getSizeFontSize(size),
  }),

  menu: (provided: any) => ({
    ...provided,
    borderRadius: getVariantBorderRadius(variant),
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    zIndex: 50,
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#3b82f6' 
      : state.isFocused 
        ? '#eff6ff' 
        : 'transparent',
    color: state.isSelected ? 'white' : 'inherit',
    fontSize: getSizeFontSize(size),
    padding: getSizeOptionPadding(size),
  }),

  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
  }),

  multiValueLabel: (provided: any) => ({
    ...provided,
    fontSize: getSizeFontSize(size),
  }),
});

const getSizeHeight = (size: SelectSize): string => {
  switch (size) {
    case 'sm': return '32px';
    case 'md': return '40px';
    case 'lg': return '48px';
    default: return '40px';
  }
};

const getSizeFontSize = (size: SelectSize): string => {
  switch (size) {
    case 'sm': return '14px';
    case 'md': return '16px';
    case 'lg': return '18px';
    default: return '16px';
  }
};

const getSizeOptionPadding = (size: SelectSize): string => {
  switch (size) {
    case 'sm': return '6px 12px';
    case 'md': return '8px 16px';
    case 'lg': return '10px 20px';
    default: return '8px 16px';
  }
};

const getIconPaddingValue = (size: SelectSize): string => {
  switch (size) {
    case 'sm': return '32px';
    case 'md': return '40px';
    case 'lg': return '48px';
    default: return '40px';
  }
};

const getVariantBorderRadius = (variant: SelectVariant): string => {
  switch (variant) {
    case 'modern': return '8px';
    case 'compact': return '4px';
    default: return '6px';
  }
};

const getVariantBorderColor = (variant: SelectVariant): string => {
  switch (variant) {
    case 'modern': return '#e5e7eb';
    case 'icon': return '#d1d5db';
    case 'compact': return '#e5e7eb';
    default: return '#d1d5db';
  }
};

const getVariantFocusBoxShadow = (variant: SelectVariant): string => {
  switch (variant) {
    case 'modern': return '0 0 0 3px rgb(59 130 246 / 0.1)';
    case 'icon': return '0 0 0 2px rgb(59 130 246 / 0.2)';
    default: return '0 0 0 1px rgb(59 130 246 / 0.5)';
  }
};

/**
 * Convierte opciones básicas sin problemas de tipos
 */
export const formatBasicOptions = (options: any[]) => {
  return options.map((option) => ({
    value: option.value,
    label: option.label,
    color: option.color,
    description: option.description,
  }));
};

/**
 * Filter personalizado por defecto
 */
export const defaultCustomFilter = (option: any, inputValue: string): boolean => {
  const searchValue = inputValue.toLowerCase();
  return (
    option.label.toLowerCase().includes(searchValue) ||
    option.value.toLowerCase().includes(searchValue) ||
    (option.description && option.description.toLowerCase().includes(searchValue))
  );
}; 