import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import Tooltip from '../../UI/Tooltip';
import clsx from 'clsx';

interface CheckboxFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  tooltipMessage?: string;
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

const HookFormCheckbox = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  colSpan = '6'
}: CheckboxFieldProps<T>) => {
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
      <div className="flex items-center gap-1">
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
            <div
              className="mr-4 flex h-5 w-5 items-center justify-center rounded border transition-colors duration-200 
                peer-checked:border-primary peer-checked:bg-primary dark:peer-checked:bg-primary"
            >
              <div className="h-2 w-3 rotate-45 border-b-2 border-r-2 border-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 mt-[-4px]"></div>
            </div>
          </div>
          <span className="text-black dark:text-white">{label}</span>
        </label>
        {tooltipMessage && (
          <Tooltip message={tooltipMessage}>
            <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
          </Tooltip>
        )}
      </div>
      
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default HookFormCheckbox; 