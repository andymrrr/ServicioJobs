import Tooltip from '../../UI/Tooltip';
import { CheckboxLabelProps } from './types';

/**
 * Componente para renderizar el label del checkbox con tooltip opcional
 */
export const CheckboxLabel: React.FC<CheckboxLabelProps> = ({ 
  label, 
  name, 
  tooltipMessage 
}) => {
  return (
    <div className="flex items-center gap-1">
      <label
        htmlFor={name}
        className="text-black dark:text-white cursor-pointer"
      >
        {label}
      </label>
      {tooltipMessage && (
        <Tooltip message={tooltipMessage}>
          <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
        </Tooltip>
      )}
    </div>
  );
};

export default CheckboxLabel; 