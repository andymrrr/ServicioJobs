// Reutilizamos la función de colSpan del HookFormInput
export { getColSpanClass } from '../HookFormInput/utils';

/**
 * Genera las clases CSS para el input file oculto
 */
export const getFileInputClasses = (): string => {
  return 'hidden';
};

/**
 * Genera las clases CSS para el contenedor del archivo
 */
export const getFileContainerClasses = (className?: string): string => {
  const baseClasses = 'w-full';
  return className ? `${baseClasses} ${className}` : baseClasses;
}; 