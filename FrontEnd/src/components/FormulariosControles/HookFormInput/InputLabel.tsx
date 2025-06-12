import { FaQuestionCircle } from 'react-icons/fa';
import Tooltip from '../../UI/Tooltip';
import { InputLabelProps } from './types';

/**
 * Componente para renderizar el label del input con tooltip opcional
 */
export const InputLabel: React.FC<InputLabelProps> = ({ label, tooltipMessage }) => {
  return (
    <label className="mb-2.5 block text-black dark:text-white">
      {label}
      {tooltipMessage && (
        <Tooltip message={tooltipMessage}>
          <FaQuestionCircle className="inline-block ml-1 text-gray-400" size={14} />
        </Tooltip>
      )}
    </label>
  );
};

export default InputLabel; 