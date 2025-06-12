import Tooltip from '../../UI/Tooltip';
import { TimeSelectorLabelProps } from './types';

/**
 * Componente para renderizar el label del time selector con tooltip opcional
 */
export const TimeSelectorLabel: React.FC<TimeSelectorLabelProps> = ({ label, tooltipMessage }) => {
  return (
    <div className="flex items-center gap-1 mb-1">
      <label className="block text-black dark:text-white">{label}</label>
      {tooltipMessage && (
        <Tooltip message={tooltipMessage}>
          <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
        </Tooltip>
      )}
    </div>
  );
};

export default TimeSelectorLabel; 