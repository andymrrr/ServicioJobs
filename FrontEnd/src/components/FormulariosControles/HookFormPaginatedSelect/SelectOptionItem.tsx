import { SelectOptionItemProps } from './types';
import { getOptionClasses } from './utils';

const SelectOptionItem = ({ option, isSelected, onSelect }: SelectOptionItemProps) => {
  const handleClick = () => {
    onSelect(option);
  };

  return (
    <div
      className={getOptionClasses(isSelected)}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <span className="truncate">{option.label}</span>
        {isSelected && (
          <svg
            className="w-4 h-4 ml-2 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SelectOptionItem; 