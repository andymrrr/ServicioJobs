import Tooltip from '../../UI/Tooltip';
import { SwitcherLabelProps } from './types';

/**
 * Componente para renderizar el label del switcher con tooltip opcional
 */
export const SwitcherLabel: React.FC<SwitcherLabelProps> = ({ 
  label, 
  tooltipMessage 
}) => {
  return (
    <div className="flex items-center gap-1 mb-2.5">
      <label className="block text-black dark:text-white">{label}</label>
      {tooltipMessage && (
        <Tooltip message={tooltipMessage}>
          <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
        </Tooltip>
      )}
    </div>
  );
};

export default SwitcherLabel; 