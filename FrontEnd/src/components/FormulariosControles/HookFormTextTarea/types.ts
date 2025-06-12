import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

export type ColSpanType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface BaseTextareaProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export interface TextareaFieldProps<T extends FieldValues> extends BaseTextareaProps<T> {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  tooltipMessage?: string;
  colSpan?: ColSpanType;
  rows?: number;
}

export interface TextareaLabelProps {
  label: string;
  tooltipMessage?: string;
}

export interface ErrorMessageProps<T extends FieldValues> {
  name: Path<T>;
  errors: FieldErrors<T>;
}

export interface TextareaFieldOnlyProps {
  placeholder?: string;
  disabled: boolean;
  hasError: boolean;
  rows: number;
  registerProps: any;
} 