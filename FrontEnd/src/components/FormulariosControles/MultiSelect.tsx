import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Option {
  value: string;
  text: string;
}

interface MultiSelectProps {
  options: Option[]; // Pasamos las opciones como prop
  onChange: (selectedValues: string[]) => void; // Callback para enviar los valores seleccionados
  label?: string; // Etiqueta personalizada (opcional)
  className?: string; // Clase opcional para flexibilidad de diseño (adaptable)
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  label = 'Selecciona opciones',
  className = '', // Clase para flexibilidad
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para manejar la visibilidad de las opciones

  const toggleSelection = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {/* Contenedor para mostrar las opciones seleccionadas */}
        <div
          className="border rounded-md p-3 cursor-pointer flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-2">
            {selectedValues.length === 0 ? (
              <span className="text-gray-400">Selecciona una opción...</span>
            ) : (
              selectedValues.map((value) => (
                <span key={value} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {options.find((option) => option.value === value)?.text}
                </span>
              ))
            )}
          </div>
          {/* Icono para desplegar */}
          <FiChevronDown className="h-5 w-5 text-gray-600" />
        </div>

        {/* Opciones desplegables */}
        {isOpen && (
          <ul className="absolute top-full left-0 mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-10">
            {options.map((option) => (
              <li
                key={option.value}
                className="p-3 hover:bg-blue-50 cursor-pointer flex items-center"
                onClick={() => toggleSelection(option.value)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleSelection(option.value)}
                  className="mr-2"
                />
                <span className="text-gray-800">{option.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
