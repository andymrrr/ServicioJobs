import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

export type ColSpanType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface BaseSwitcherProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export interface SwitcherFieldProps<T extends FieldValues> extends BaseSwitcherProps<T> {
  label: string;
  tooltipMessage?: string;
  colSpan?: ColSpanType;
}

export interface SwitcherLabelProps {
  label: string;
  tooltipMessage?: string;
}

export interface SwitcherFieldOnlyProps {
  name: string;
  registerProps: any;
} 