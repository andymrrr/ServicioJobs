import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Tooltip from '../../UI/Tooltip';

interface TimeOption {
  value: string;
  label: string;
}

interface HookFormTimeSelectorProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options?: TimeOption[];
  defaultSelected?: string;
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  tooltipMessage?: string;
}

const HookFormTimeSelector = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  options = [
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '45m', label: '45m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: 'D', label: 'D' },
  ],
  defaultSelected = '5m',
  colSpan = '6',
  tooltipMessage,
}: HookFormTimeSelectorProps<T>) => {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  const handleSelect = (value: string) => {
    setSelected(value);
    const event = {
      target: {
        name,
        value,
      },
    };
    register(name).onChange(event);
  };
  const colSpanClass = {
    '1': 'col-span-1',
    '2': 'col-span-2',
    '3': 'col-span-3',
    '4': 'col-span-4',
    '5': 'col-span-5',
    '6': 'col-span-6',
    '7': 'col-span-7',
    '8': 'col-span-8',
    '9': 'col-span-9',
    '10': 'col-span-10',
    '11': 'col-span-11',
    '12': 'col-span-12',
  }[colSpan] || 'col-span-6';
  
  return (
    <div className={colSpanClass}>
      <div className="flex items-center gap-1 mb-1">
        <label className="block text-black dark:text-white">{label}</label>
        {tooltipMessage && (
          <Tooltip message={tooltipMessage}>
            <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
          </Tooltip>
        )}
      </div>

      <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg min-h-[48px] items-center">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selected === option.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <input
        type="hidden"
        {...register(name, { required: `El ${label} es requerido` })}
        value={selected}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default HookFormTimeSelector;
