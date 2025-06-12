import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

export type ColSpanType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface BaseInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export interface PatternValidation {
  value: RegExp;
  message: string;
}

export interface LengthValidation {
  value: number;
  message: string;
}

export interface InputValidationProps {
  required?: string;
  pattern?: PatternValidation;
  minLength?: LengthValidation;
  maxLength?: LengthValidation;
}

export interface InputFieldProps<T extends FieldValues> extends BaseInputProps<T>, InputValidationProps {
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  tooltipMessage?: string;
  colSpan?: ColSpanType;
}

export interface InputLabelProps {
  label: string;
  tooltipMessage?: string;
}

export interface ErrorMessageProps<T extends FieldValues> {
  name: Path<T>;
  errors: FieldErrors<T>;
}

export interface InputFieldOnlyProps {
  type: string;
  placeholder?: string;
  disabled: boolean;
  hasError: boolean;
  registerProps: any;
} 