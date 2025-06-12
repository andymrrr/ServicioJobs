import React from 'react';
import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

export type ColSpanType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type SelectVariant = 'basic' | 'modern' | 'outlined' | 'filled' | 'minimal';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  color?: string;
  description?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface BaseSelectProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export interface SelectValidationProps {
  required?: string | boolean;
  validate?: (value: string) => string | boolean;
}

export interface HookFormSelectProps<T extends FieldValues> 
  extends BaseSelectProps<T>, SelectValidationProps {
  label: string;
  options?: SelectOption[];
  groups?: SelectGroup[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  colSpan?: ColSpanType;
  tooltipMessage?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  showSearch?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
}

export interface SelectLabelProps {
  label: string;
  tooltipMessage?: string;
  required?: boolean;
}

export interface ErrorMessageProps<T extends FieldValues> {
  name: Path<T>;
  errors: FieldErrors<T>;
}

export interface SelectFieldProps<T extends FieldValues = FieldValues> {
  name: string;
  options: SelectOption[];
  groups?: SelectGroup[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  variant: SelectVariant;
  size: SelectSize;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  showSearch?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  hasError?: boolean;
  registerProps: ReturnType<UseFormRegister<T>>;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface ClearButtonProps {
  onClear: () => void;
  disabled?: boolean;
} 