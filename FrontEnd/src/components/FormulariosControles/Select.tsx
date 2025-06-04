import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface SelectProps {
  etiqueta: string;                       
  opciones: { valor: string, etiqueta: string }[];  
  valorSeleccionado: string;             
  onChange: (valor: string) => void;  
  icono?: React.ReactNode; 
}

const Select: React.FC<SelectProps> = ({
  etiqueta, 
  opciones, 
  valorSeleccionado, 
  onChange, 
  icono, 
}) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<boolean>(false);

  const cambiarColorTexto = () => {
    setOpcionSeleccionada(true);
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        {etiqueta}
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        {/* Ícono izquierdo (opcional) */}
        {icono && (
          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-[#637381] opacity-80">
            {icono}
          </span>
        )}

        <select
          value={valorSeleccionado}
          onChange={(e) => {
            onChange(e.target.value); // Llamar la función onChange
            cambiarColorTexto();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            opcionSeleccionada ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Selecciona una opción
          </option>

          {/* Generar opciones dinámicamente */}
          {opciones.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor} className="text-body dark:text-bodydark">
              {opcion.etiqueta}
            </option>
          ))}
        </select>

        {/* Ícono derecho (siempre presente) */}
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-[#637381] opacity-80 pointer-events-none">
          <FiChevronDown size={20} /> {/* Este ícono es fijo y no se puede modificar */}
        </span>
      </div>
    </div>
  );
};

export default Select;
