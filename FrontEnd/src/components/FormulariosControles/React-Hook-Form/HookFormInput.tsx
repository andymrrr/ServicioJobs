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
}: InputFieldProps<T>) => {
  const registerOptions = {
    ...(required && { required }),
    ...(pattern && { pattern }),
    ...(minLength && { minLength }),
    ...(maxLength && { maxLength }),
  };

  return (
    <div>
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
