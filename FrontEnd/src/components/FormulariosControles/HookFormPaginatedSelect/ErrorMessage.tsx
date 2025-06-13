import { FieldValues } from 'react-hook-form';
import { ErrorMessageProps } from './types';

const ErrorMessage = <T extends FieldValues>({ name, errors }: ErrorMessageProps<T>) => {
  const error = errors[name];
  
  if (!error) return null;
  
  return (
    <span className="mt-1 text-sm text-danger block">
      {error.message as string}
    </span>
  );
};

export default ErrorMessage; 