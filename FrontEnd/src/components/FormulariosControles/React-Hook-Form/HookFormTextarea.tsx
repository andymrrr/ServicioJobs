import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import Tooltip from '../../UI/Tooltip';
import clsx from 'clsx';

interface TextareaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  tooltipMessage?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

const HookFormTextarea = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  placeholder,
  rows = 6,
  disabled = false,
  colSpan = '6'
}: TextareaFieldProps<T>) => {
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
      
      <textarea
        id={name}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition",
          "focus:border-primary active:border-primary",
          "disabled:cursor-default disabled:bg-whiter",
          "dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
          disabled && "dark:disabled:bg-black"
        )}
        {...rest}
        onChange={(e) => {
          onChange(e);
        }}
        ref={ref}
      />
      
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default HookFormTextarea; 