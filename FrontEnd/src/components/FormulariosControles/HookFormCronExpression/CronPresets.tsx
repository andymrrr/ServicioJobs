import React from 'react';
import { CronPreset } from './types';
import { CRON_PRESETS } from './cronUtils';

interface CronPresetsProps {
  selectedPreset: string;
  onPresetChange: (preset: CronPreset) => void;
  disabled?: boolean;
}

const CronPresets: React.FC<CronPresetsProps> = ({
  selectedPreset,
  onPresetChange,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <p className="text-xs text-bodydark2 mb-2">Selecciona una programación común:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CRON_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onPresetChange(preset)}
            className={`p-3 text-left border rounded-lg transition-all duration-200 hover:border-primary ${
              selectedPreset === preset.value
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-stroke dark:border-form-strokedark'
            }`}
            disabled={disabled}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{preset.icon}</span>
              <span className="text-sm font-medium">{preset.name}</span>
            </div>
            <p className="text-xs text-bodydark2">{preset.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CronPresets; 