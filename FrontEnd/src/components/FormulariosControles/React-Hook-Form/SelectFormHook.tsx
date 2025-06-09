import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { FiChevronDown } from 'react-icons/fi';

interface SelectProps<T extends FieldValues> {
  etiqueta: string;
  name: Path<T>;  
  opciones: { valor: string; etiqueta: string }[];
  register: UseFormRegister<T>;  
  errors: FieldErrors<T>;
  valorSeleccionado: string;
  onChange: (valor: string) => void;
  icono?: React.ReactNode;
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
}

const SelectFormHook = <T extends FieldValues>({
  etiqueta,
  name,
  opciones,
  register,
  errors,
  valorSeleccionado,
  onChange,
  icono,
  colSpan = '6',
}: SelectProps<T>) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<boolean>(false);

  const cambiarColorTexto = () => {
    setOpcionSeleccionada(true);
  };

  return (
    <div className={`col-span-${colSpan}`}>
      <label className="mb-1 block text-black dark:text-white">{etiqueta}</label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        {icono && (
          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-[#637381] opacity-80">
            {icono}
          </span>
        )}

        <select
          {...register(name, { required: `El ${etiqueta} es requerido` })}
          value={valorSeleccionado}
          onChange={(e) => {
            onChange(e.target.value);
            cambiarColorTexto();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${opcionSeleccionada ? 'text-black dark:text-white' : ''}`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Selecciona una opción
          </option>
          {opciones.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor} className="text-body dark:text-bodydark">
              {opcion.etiqueta}
            </option>
          ))}
        </select>

 
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-[#637381] opacity-80 pointer-events-none">
          <FiChevronDown size={20} /> 
        </span>
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectFormHook;
