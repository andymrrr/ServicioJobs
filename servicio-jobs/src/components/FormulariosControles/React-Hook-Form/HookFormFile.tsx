import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import Tooltip from '../../UI/Tooltip';
import clsx from 'clsx';
import React from 'react';

interface FileFieldProps<T extends FieldValues> {
  label: string | React.ReactNode;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  tooltipMessage?: string;
  accept?: string;
  multiple?: boolean;
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  className?: string;
}

const HookFormFile = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  tooltipMessage,
  accept,
  multiple = false,
  colSpan = '6',
  className = ''
}: FileFieldProps<T>) => {
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
    <div className={clsx(colSpanClass, className)}>
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
      
      <label className="hidden">
        <input
          type="file"
          id={name}
          accept={accept}
          multiple={multiple}
          className="hidden"
          {...register(name)}
        />
      </label>
      
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default HookFormFile; 