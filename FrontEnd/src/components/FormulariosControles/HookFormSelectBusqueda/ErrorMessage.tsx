import { FieldValues } from 'react-hook-form';
import { ErrorMessageProps } from './types';

/**
 * Componente para renderizar mensajes de error de validación
 */
export const ErrorMessage = <T extends FieldValues>({ name, errors }: ErrorMessageProps<T>) => {
  const error = errors[name];
  
  if (!error) {
    return null;
  }

  return (
    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
      <span>⚠️</span>
      {error.message as string}
    </p>
  );
};

export default ErrorMessage; 