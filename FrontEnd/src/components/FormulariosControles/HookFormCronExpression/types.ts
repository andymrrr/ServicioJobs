import { FieldValues, Path, FieldErrors, UseFormRegister, Control } from 'react-hook-form';

export interface CronPreset {
  name: string;
  value: string;
  description: string;
  icon: string;
}

export interface HookFormCronExpressionProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  required?: string | boolean;
  colSpan?: string;
  disabled?: boolean;
  tooltipMessage?: string;
} 