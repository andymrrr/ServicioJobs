import React from 'react';
import Select from 'react-select';
import { FieldErrors, FieldValues, Path, Controller } from 'react-hook-form';
import Tooltip from '../../UI/Tooltip'; // Asegúrate de que la ruta sea correcta

interface SelectProps<T extends FieldValues> {
  etiqueta: string;
  name: Path<T>;
  opciones: { valor: string; etiqueta: string }[];
  control: any;
  errors: FieldErrors<T>;
  valorSeleccionado: string;
  onChange: (valor: string) => void;
  icono?: React.ReactNode;
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  tooltipMessage?: string;
}

const SelectBusquedaFormHook = <T extends FieldValues>({
  etiqueta,
  name,
  opciones,
  control,
  errors,
  valorSeleccionado,
  onChange,
  icono,
  colSpan = '6',
  tooltipMessage 
}: SelectProps<T>) => {
  const opcionesParaReactSelect = opciones.map(({ valor, etiqueta }) => ({
    value: valor,
    label: etiqueta,
  }));

  const opcionActual = opcionesParaReactSelect.find(op => op.value === valorSeleccionado) || null;
  const colSpanClass = {
    '1': 'col-span-1',
    '2': 'col-span-2',
    '3': 'col-span-3',
    '4': 'col-span-4',
    '5': 'col-span-5',
    '6': 'col-span-6',
    '7': 'col-span-7',
    '8': 'col-span-8',
    '9': 'col-span-9',
    '10': 'col-span-10',
    '11': 'col-span-11',
    '12': 'col-span-12',
  }[colSpan] || 'col-span-6';
  
  return (
    <div className={colSpanClass}>
      <div className="flex items-center gap-1 mb-1">
        <label className="block text-black dark:text-white">{etiqueta}</label>
        {tooltipMessage && (
          <Tooltip message={tooltipMessage}>
            <span className="text-blue-500 cursor-pointer text-sm">ⓘ</span>
          </Tooltip>
        )}
      </div>

      <div className="relative z-20 bg-white dark:bg-form-input">
        {icono && (
          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-[#637381] opacity-80">
            {icono}
          </span>
        )}

        <Controller
          name={name}
          control={control}
          rules={{ required: `El ${etiqueta} es requerido` }}
          render={({ field }) => (
            <Select
              {...field}
              options={opcionesParaReactSelect}
              value={opcionActual}
              onChange={(selectedOption) => {
                field.onChange(selectedOption?.value ?? '');
                onChange(selectedOption?.value ?? '');
              }}
              placeholder={`Selecciona una opción`}
              isClearable
              isSearchable
              classNamePrefix="react-select py-0.5 px-5"
            />
          )}
        />
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default SelectBusquedaFormHook;
