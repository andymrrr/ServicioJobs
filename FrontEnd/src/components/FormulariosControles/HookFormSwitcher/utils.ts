// Reutilizamos la función de colSpan del HookFormInput
export { getColSpanClass } from '../HookFormInput/utils';

/**
 * Genera las clases CSS para el fondo del switcher
 */
export const getSwitcherBackgroundClasses = (): string => {
  return 'block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B] peer-checked:bg-primary';
};

/**
 * Genera las clases CSS para el círculo del switcher (toggle)
 */
export const getSwitcherToggleClasses = (): string => {
  return `
    absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all duration-200 
    peer-checked:left-7 peer-checked:bg-white
  `.trim();
};

/**
 * Genera las clases CSS para el input checkbox oculto
 */
export const getSwitcherInputClasses = (): string => {
  return 'peer sr-only';
}; 