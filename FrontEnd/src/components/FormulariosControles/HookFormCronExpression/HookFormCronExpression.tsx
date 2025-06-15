import React, { useState, useEffect } from 'react';
import { FieldValues, Path, FieldErrors, UseFormRegister } from 'react-hook-form';
import { getColSpanClass } from './utils';

interface CronPreset {
  name: string;
  value: string;
  description: string;
  icon: string;
}

interface HookFormCronExpressionProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: string | boolean;
  colSpan?: string;
  disabled?: boolean;
  tooltipMessage?: string;
}

const CRON_PRESETS: CronPreset[] = [
  { name: 'Cada minuto', value: '* * * * *', description: 'Se ejecuta cada minuto', icon: '⚡' },
  { name: 'Cada 5 minutos', value: '*/5 * * * *', description: 'Se ejecuta cada 5 minutos', icon: '🔄' },
  { name: 'Cada hora', value: '0 * * * *', description: 'Se ejecuta al inicio de cada hora', icon: '⏰' },
  { name: 'Diario (medianoche)', value: '0 0 * * *', description: 'Se ejecuta diariamente a las 00:00', icon: '🌙' },
  { name: 'Diario (9 AM)', value: '0 9 * * *', description: 'Se ejecuta diariamente a las 09:00', icon: '☀️' },
  { name: 'Semanal (Lunes)', value: '0 0 * * 1', description: 'Se ejecuta los lunes a medianoche', icon: '📅' },
  { name: 'Mensual (día 1)', value: '0 0 1 * *', description: 'Se ejecuta el primer día de cada mes', icon: '📆' },
  { name: 'Personalizado', value: '', description: 'Crear expresión personalizada', icon: '⚙️' },
];

function parseCronDescription(cronExpression: string): string {
  if (!cronExpression) return '';
  
  const parts = cronExpression.split(' ');
  if (parts.length !== 5) return 'Expresión cron inválida';
  
  const [minute, hour, day, month, dayOfWeek] = parts;
  
  // Casos comunes
  if (cronExpression === '* * * * *') return 'Cada minuto';
  if (cronExpression === '0 * * * *') return 'Cada hora';
  if (cronExpression === '0 0 * * *') return 'Diariamente a medianoche';
  if (cronExpression === '0 9 * * *') return 'Diariamente a las 9:00 AM';
  if (cronExpression === '0 0 * * 1') return 'Semanalmente los lunes';
  if (cronExpression === '0 0 1 * *') return 'Mensualmente el día 1';
  if (cronExpression.startsWith('*/')) return `Cada ${cronExpression.split('/')[1]} minutos`;
  
  return `Minuto: ${minute}, Hora: ${hour}, Día: ${day}, Mes: ${month}, Día semana: ${dayOfWeek}`;
}

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

  const cronDescription = parseCronDescription(customValue);

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

      {/* Presets Rápidos */}
      <div className="mb-4">
        <p className="text-xs text-bodydark2 mb-2">Selecciona una programación común:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {CRON_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handlePresetChange(preset)}
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

      {/* Input Manual / Builder */}
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

        {/* Descripción en tiempo real */}
        {customValue && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-stroke dark:border-form-strokedark">
            <p className="text-sm">
              <span className="font-medium text-primary">📝 Descripción:</span>{' '}
              <span className="text-bodydark2">{cronDescription}</span>
            </p>
          </div>
        )}

        {/* Builder Visual (futuro) */}
        {showBuilder && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-stroke dark:border-form-strokedark">
            <p className="text-sm text-bodydark2 mb-2">🚧 Constructor visual próximamente...</p>
            <div className="grid grid-cols-5 gap-2 text-xs">
              <div className="text-center">
                <p className="font-medium">Minuto</p>
                <p className="text-bodydark2">0-59</p>
              </div>
              <div className="text-center">
                <p className="font-medium">Hora</p>
                <p className="text-bodydark2">0-23</p>
              </div>
              <div className="text-center">
                <p className="font-medium">Día</p>
                <p className="text-bodydark2">1-31</p>
              </div>
              <div className="text-center">
                <p className="font-medium">Mes</p>
                <p className="text-bodydark2">1-12</p>
              </div>
              <div className="text-center">
                <p className="font-medium">Día Sem.</p>
                <p className="text-bodydark2">0-7</p>
              </div>
            </div>
          </div>
        )}

        {/* Ejemplos comunes */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-primary hover:text-primary/80 font-medium">
            📚 Ver ejemplos de expresiones cron
          </summary>
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs space-y-1">
            <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 0 * * *</code> - Diario a medianoche</p>
            <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 */6 * * *</code> - Cada 6 horas</p>
            <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 9 * * 1-5</code> - Días laborables a las 9 AM</p>
            <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">0 0 1 */3 *</code> - Cada 3 meses</p>
          </div>
        </details>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-1 text-sm text-meta-1">
          {(error as any)?.message || 'Este campo es requerido'}
        </p>
      )}
    </div>
  );
};

export default HookFormCronExpression; 