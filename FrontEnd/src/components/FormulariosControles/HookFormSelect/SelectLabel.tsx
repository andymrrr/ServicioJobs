import Tooltip from '../../UI/Tooltip';
import { SelectLabelProps } from './types';

/**
 * Componente para renderizar el label del select con tooltip opcional
 */
export const SelectLabel: React.FC<SelectLabelProps> = ({ 
  label, 
  tooltipMessage, 
  required = false 
}) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {tooltipMessage && (
        <Tooltip message={tooltipMessage}>
          <span className="text-blue-500 cursor-pointer text-sm hover:text-blue-600 transition-colors">
            ⓘ
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default SelectLabel; 