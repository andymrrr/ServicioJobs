import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import Tooltip from '../../UI/Tooltip';
import clsx from 'clsx';

interface SwitcherFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  tooltipMessage?: string;
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

const HookFormSwitcher = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  colSpan = '6'
}: SwitcherFieldProps<T>) => {
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

  const { ref, onChange, ...rest } = register(name);
  
  return (
    <div className={clsx(colSpanClass)}>
      <div className="flex items-center gap-1 mb-2.5">
        <label className="block text-black dark:text-white">{label}</label>
        {tooltipMessage && (
          <Tooltip message={tooltipMessage}>
            <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
          </Tooltip>
        )}
      </div>
      
      <label
        htmlFor={name}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={name}
            className="peer sr-only"
            {...rest}
            onChange={(e) => {
              onChange(e);
            }}
            ref={ref}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B] peer-checked:bg-primary"></div>
          <div
            className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all duration-200 peer-checked:left-7 peer-checked:bg-white"
          ></div>
        </div>
      </label>
      
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default HookFormSwitcher; 