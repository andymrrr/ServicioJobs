import { TimeSelectorFieldProps } from './types';
import { getContainerClasses, getButtonClasses } from './utils';

/**
 * Componente para renderizar el campo selector de tiempo con diferentes variantes visuales
 */
export const TimeSelectorField: React.FC<TimeSelectorFieldProps> = ({
  options,
  selected,
  onSelect,
  variant
}) => {
  const containerClasses = getContainerClasses(variant);

  return (
    <div className={containerClasses}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={getButtonClasses(variant, selected === option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeSelectorField; 