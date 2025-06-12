// Reutilizamos la función de colSpan del HookFormInput
export { getColSpanClass } from '../HookFormInput/utils';

import { ColSpanType } from './types';

/**
 * Genera las clases CSS para el checkbox personalizado
 */
export const getCheckboxClasses = (): string => {
  return `
    mr-4 flex h-5 w-5 items-center justify-center rounded border transition-colors duration-200 
    peer-checked:border-primary peer-checked:bg-primary dark:peer-checked:bg-primary
  `.trim();
};

/**
 * Genera las clases CSS para el ícono de check
 */
export const getCheckIconClasses = (): string => {
  return `
    h-2 w-3 rotate-45 border-b-2 border-r-2 border-white opacity-0 
    peer-checked:opacity-100 transition-opacity duration-200 mt-[-4px]
  `.trim();
}; 