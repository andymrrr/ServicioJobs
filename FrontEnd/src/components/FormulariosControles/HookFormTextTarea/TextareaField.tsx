import { TextareaFieldOnlyProps } from './types';
import { getTextareaClasses } from './utils';

/**
 * Componente para renderizar el campo de textarea con estilos dinámicos
 */
export const TextareaField: React.FC<TextareaFieldOnlyProps> = ({
  placeholder,
  disabled,
  hasError,
  rows,
  registerProps
}) => {
  const textareaClasses = getTextareaClasses(hasError, disabled);

  return (
    <textarea
      rows={rows}
      disabled={disabled}
      placeholder={placeholder}
      className={textareaClasses}
      {...registerProps}
    />
  );
};

export default TextareaField; 