import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { FaQuestionCircle } from 'react-icons/fa';
import Tooltip from '../../UI/Tooltip';
import clsx from 'clsx';

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  tooltipMessage?: string;
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

const HookFormInput = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = 'text',
  placeholder,
  disabled = false,
  tooltipMessage,
  required,
  pattern,
  minLength,
  maxLength,
  colSpan = '6'
}: InputFieldProps<T>) => {
  const registerOptions = {
    ...(required && { required }),
    ...(pattern && { pattern }),
    ...(minLength && { minLength }),
    ...(maxLength && { maxLength }),
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
    <div className={clsx(colSpanClass)}>
      <label className="mb-2.5 block text-black dark:text-white">
        {label}
        {tooltipMessage && (
          <Tooltip message={tooltipMessage}>
            <FaQuestionCircle className="inline-block ml-1 text-gray-400" size={14} />
          </Tooltip>
        )}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition
            ${
              errors[name]
                ? 'border-danger focus:border-danger active:border-danger'
                : 'border-stroke focus:border-primary active:border-primary'
            }
            ${disabled ? 'cursor-not-allowed' : ''}
            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
          {...register(name, registerOptions)}
        />
      </div>
      {errors[name] && (
        <span className="text-sm text-danger mt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default HookFormInput;
