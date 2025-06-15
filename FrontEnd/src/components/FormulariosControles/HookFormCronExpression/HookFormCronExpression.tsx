import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { getColSpanClass } from './utils';
import { HookFormCronExpressionProps, CronPreset } from './types';
import CronPresets from './CronPresets';
import CronDescription from './CronDescription';
import CronBuilder from './CronBuilder';
import CronExamples from './CronExamples';

const HookFormCronExpression = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  required = false,
  colSpan = '12',
  disabled = false,
  tooltipMessage,
}: HookFormCronExpressionProps<T>) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customValue, setCustomValue] = useState<string>('');
  const [showBuilder, setShowBuilder] = useState<boolean>(false);

  const error = errors[name];
  const spanClass = getColSpanClass(colSpan);

  const handlePresetChange = (preset: CronPreset) => {
    setSelectedPreset(preset.value);
    setCustomValue(preset.value);
    
    if (preset.name === 'Personalizado') {
      setShowBuilder(true);
    } else {
      setShowBuilder(false);
    }
  };

  return (
    <div className={spanClass}>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
        {required && <span className="text-meta-1">*</span>}
        {tooltipMessage && (
          <span className="ml-1 text-xs text-bodydark2" title={tooltipMessage}>
            ❓
          </span>
        )}
      </label>

      <CronPresets
        selectedPreset={selectedPreset}
        onPresetChange={handlePresetChange}
        disabled={disabled}
      />

      <div className="space-y-3">
        <input
          {...register(name, { required })}
          type="text"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="0 0 * * * (Formato: minuto hora día mes día-semana)"
          disabled={disabled}
          className={`w-full rounded-lg border-[1.5px] px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${
            error
              ? 'border-meta-1 focus:border-meta-1 active:border-meta-1'
              : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark'
          }`}
        />

        <CronDescription cronExpression={customValue} />
        
        <CronBuilder showBuilder={showBuilder} />
        
        <CronExamples />
      </div>

      {error && (
        <p className="mt-1 text-sm text-meta-1">
          {(error as any)?.message || 'Este campo es requerido'}
        </p>
      )}
    </div>
  );
};

export default HookFormCronExpression; 