import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

export type ColSpanType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface BaseCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export interface CheckboxFieldProps<T extends FieldValues> extends BaseCheckboxProps<T> {
  label: string;
  tooltipMessage?: string;
  colSpan?: ColSpanType;
}

export interface CheckboxLabelProps {
  label: string;
  name: string;
  tooltipMessage?: string;
}

export interface CheckboxFieldOnlyProps {
  name: string;
  registerProps: any;
} 