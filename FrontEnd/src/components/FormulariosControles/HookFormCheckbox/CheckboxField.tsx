import { CheckboxFieldOnlyProps } from './types';
import { getCheckboxClasses, getCheckIconClasses } from './utils';

/**
 * Componente para renderizar el campo de checkbox personalizado
 */
export const CheckboxField: React.FC<CheckboxFieldOnlyProps> = ({
  name,
  registerProps
}) => {
  const { ref, onChange, ...rest } = registerProps;
  const checkboxClasses = getCheckboxClasses();
  const checkIconClasses = getCheckIconClasses();

  return (
    <div className="relative">
      <input
        type="checkbox"
        id={name}
        className="peer sr-only"
        {...rest}
        onChange={(e) => {
          onChange(e);
        }}
        ref={ref}
      />
      <div className={checkboxClasses}>
        <div className={checkIconClasses}></div>
      </div>
    </div>
  );
};

export default CheckboxField; 