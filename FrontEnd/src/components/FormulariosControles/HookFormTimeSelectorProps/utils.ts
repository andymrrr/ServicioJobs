import { ColSpanType, TimeSelectorVariant } from './types';

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
export const getContainerClasses = (variant: TimeSelectorVariant): string => {
  const baseClasses = 'flex min-h-[48px] items-center';
  
  switch (variant) {
    case 'pill':
      return `${baseClasses} flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg`;
    case 'button':
      return `${baseClasses} flex-wrap gap-1 border border-gray-200 dark:border-gray-700 p-1 rounded-md`;
    case 'tabs':
      return `${baseClasses} border-b border-gray-200 dark:border-gray-700`;
    case 'cards':
      return `${baseClasses} flex-wrap gap-3`;
    default:
      return `${baseClasses} flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg`;
  }
};

/**
 * Obtiene las clases CSS del botón según la variante y estado
 */
export const getButtonClasses = (
  variant: TimeSelectorVariant, 
  isSelected: boolean
): string => {
  const baseClasses = 'text-sm font-medium transition-colors';
  
  switch (variant) {
    case 'pill':
      return `${baseClasses} px-4 py-2 rounded-md ${
        isSelected
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`;
    
    case 'button':
      return `${baseClasses} px-4 py-2 rounded ${
        isSelected
          ? 'bg-blue-500 text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`;
    
    case 'tabs':
      return `${baseClasses} px-4 py-2 border-b-2 ${
        isSelected
          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
      }`;
    
    case 'cards':
      return `${baseClasses} px-4 py-3 border rounded-lg ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`;
    
    default:
      return getButtonClasses('pill', isSelected);
  }
}; 