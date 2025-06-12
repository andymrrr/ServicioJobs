import { ColSpanType, InputValidationProps } from './types';

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
 * Construye las opciones de registro para react-hook-form
 */
export const buildRegisterOptions = (validations: InputValidationProps) => {
  const { required, pattern, minLength, maxLength } = validations;
  
  return {
    ...(required && { required }),
    ...(pattern && { pattern }),
    ...(minLength && { minLength }),
    ...(maxLength && { maxLength }),
  };
};

/**
 * Genera las clases CSS para el input basado en el estado
 */
export const getInputClasses = (hasError: boolean, disabled: boolean): string => {
  const baseClasses = `
    w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition
    dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
  `.trim();

  const errorClasses = hasError
    ? 'border-danger focus:border-danger active:border-danger'
    : 'border-stroke focus:border-primary active:border-primary';

  const disabledClasses = disabled ? 'cursor-not-allowed' : '';

  return `${baseClasses} ${errorClasses} ${disabledClasses}`.trim();
}; 