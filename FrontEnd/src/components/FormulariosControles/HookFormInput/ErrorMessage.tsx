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
    <span className="text-sm text-danger mt-1 block">
      {error.message as string}
    </span>
  );
};

export default ErrorMessage; 