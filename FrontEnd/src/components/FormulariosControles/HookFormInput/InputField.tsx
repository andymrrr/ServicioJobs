import { InputFieldOnlyProps } from './types';
import { getInputClasses } from './utils';

/**
 * Componente para renderizar el campo de input con estilos dinámicos
 */
export const InputField: React.FC<InputFieldOnlyProps> = ({
  type,
  placeholder,
  disabled,
  hasError,
  registerProps
}) => {
  const inputClasses = getInputClasses(hasError, disabled);

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        {...registerProps}
      />
    </div>
  );
};

export default InputField; 