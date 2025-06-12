import { SwitcherFieldOnlyProps } from './types';
import { 
  getSwitcherBackgroundClasses, 
  getSwitcherToggleClasses, 
  getSwitcherInputClasses 
} from './utils';

/**
 * Componente para renderizar el toggle/switch personalizado
 */
export const SwitcherField: React.FC<SwitcherFieldOnlyProps> = ({
  name,
  registerProps
}) => {
  const { ref, onChange, ...rest } = registerProps;
  const inputClasses = getSwitcherInputClasses();
  const backgroundClasses = getSwitcherBackgroundClasses();
  const toggleClasses = getSwitcherToggleClasses();

  return (
    <label
      htmlFor={name}
      className="flex cursor-pointer select-none items-center"
    >
      <div className="relative">
        <input
          type="checkbox"
          id={name}
          className={inputClasses}
          {...rest}
          onChange={(e) => {
            onChange(e);
          }}
          ref={ref}
        />
        <div className={backgroundClasses}></div>
        <div className={toggleClasses}></div>
      </div>
    </label>
  );
};

export default SwitcherField; 