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
    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1.5">
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {error.message as string}
    </p>
  );
};

export default ErrorMessage; 