import Tooltip from '../../UI/Tooltip';
import { FileLabelProps } from './types';

/**
 * Componente para renderizar el label del input file con tooltip opcional
 */
export const FileLabel: React.FC<FileLabelProps> = ({ 
  label, 
  tooltipMessage 
}) => {
  return (
    <div className="flex items-center gap-1 mb-2.5">
      <label className="block text-black dark:text-white cursor-pointer">
        {label}
        {tooltipMessage && (
          <Tooltip message={tooltipMessage}>
            <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
          </Tooltip>
        )}
      </label>
    </div>
  );
};

export default FileLabel; 