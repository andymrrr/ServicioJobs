import React from 'react';
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { GroupBase, Props as ReactSelectProps } from 'react-select';

export type ColSpanType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type SelectVariant = 'basic' | 'modern' | 'icon' | 'compact';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  isDisabled?: boolean;
  color?: string;
  description?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface BaseSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
}

export interface SelectValidationProps {
  required?: string | boolean;
  validate?: (value: any) => string | boolean;
}

export interface HookFormSelectBusquedaProps<T extends FieldValues> 
  extends BaseSelectProps<T>, SelectValidationProps {
  label: string;
  options?: SelectOption[];
  groups?: SelectGroup[];
  selectedValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  colSpan?: ColSpanType;
  tooltipMessage?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  noOptionsMessage?: string;
  loadingMessage?: string;
  customFilter?: (option: SelectOption, inputValue: string) => boolean;
  formatOptionLabel?: (option: SelectOption) => React.ReactNode;
  reactSelectProps?: Partial<ReactSelectProps<SelectOption, boolean, GroupBase<SelectOption>>>;
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

export interface SelectFieldProps {
  options: SelectOption[];
  groups?: SelectGroup[];
  selectedValue?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  variant: SelectVariant;
  size: SelectSize;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  noOptionsMessage?: string;
  loadingMessage?: string;
  customFilter?: (option: SelectOption, inputValue: string) => boolean;
  formatOptionLabel?: (option: SelectOption) => React.ReactNode;
  reactSelectProps?: Partial<ReactSelectProps<SelectOption, boolean, GroupBase<SelectOption>>>;
}

export interface SelectControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules: any;
  render: (props: {
    field: any;
    fieldState: any;
    formState: any;
  }) => React.ReactElement;
} 