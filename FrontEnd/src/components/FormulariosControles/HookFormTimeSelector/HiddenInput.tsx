import { FieldValues } from 'react-hook-form';
import { HiddenInputProps } from './types';

/**
 * Componente para el input oculto que registra el valor en react-hook-form
 */
export const HiddenInput = <T extends FieldValues>({
  name,
  register,
  selected,
  label
}: HiddenInputProps<T>) => {
  return (
    <input
      type="hidden"
      {...register(name, { required: `El ${label} es requerido` })}
      value={selected}
    />
  );
};

export default HiddenInput;
