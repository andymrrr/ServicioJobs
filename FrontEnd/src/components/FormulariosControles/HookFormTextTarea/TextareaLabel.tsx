import Tooltip from '../../UI/Tooltip';
import { TextareaLabelProps } from './types';

/**
 * Componente para renderizar el label del textarea con tooltip opcional
 */
export const TextareaLabel: React.FC<TextareaLabelProps> = ({ label, tooltipMessage }) => {
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

export default TextareaLabel; 