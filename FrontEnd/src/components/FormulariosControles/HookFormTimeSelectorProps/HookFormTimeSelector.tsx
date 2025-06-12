import { FieldValues } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { HookFormTimeSelectorProps } from './types';
import { getColSpanClass } from './utils';
import TimeSelectorLabel from './TimeSelectorLabel';
import TimeSelectorField from './TimeSelectorField';
import HiddenInput from './HiddenInput';
import ErrorMessage from './ErrorMessage';

const HookFormTimeSelector = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  options = [
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '45m', label: '45m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: 'D', label: 'D' },
  ],
  defaultSelected = '5m',
  colSpan = '6',
  tooltipMessage,
  variant = 'pill',
}: HookFormTimeSelectorProps<T>) => {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  const handleSelect = (value: string) => {
    setSelected(value);
    const event = {
      target: {
        name,
        value,
      },
    };
    register(name).onChange(event);
  };
  const colSpanClass = getColSpanClass(colSpan);
  
  return (
    <div className={colSpanClass}>
      <TimeSelectorLabel 
        label={label} 
        tooltipMessage={tooltipMessage} 
      />

      <TimeSelectorField
        options={options}
        selected={selected}
        onSelect={handleSelect}
        variant={variant}
      />

      <HiddenInput
        name={name}
        register={register}
        selected={selected}
        label={label}
      />

      <ErrorMessage 
        name={name} 
        errors={errors} 
      />
    </div>
  );
};

export default HookFormTimeSelector;
