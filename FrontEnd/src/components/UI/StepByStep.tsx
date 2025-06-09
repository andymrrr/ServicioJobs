import React from 'react';
import { FaCheck, FaChevronRight } from 'react-icons/fa';

interface Paso {
  id: number;
  titulo: string;
  descripcion?: string;
  icono?: React.ReactNode;
}

interface StepByStepProps {
  pasos: Paso[];
  pasoActual: number;
  onPasoClick?: (paso: number) => void;
  mostrarDescripcion?: boolean;
  tema?: 'horizontal' | 'vertical';
  className?: string;
}

const StepByStep: React.FC<StepByStepProps> = ({
  pasos,
  pasoActual,
  onPasoClick,
  mostrarDescripcion = true,
  tema = 'horizontal',
  className = ''
}) => {
  const esHorizontal = tema === 'horizontal';

  const obtenerEstadoPaso = (indicePaso: number) => {
    if (indicePaso < pasoActual) return 'completado';
    if (indicePaso === pasoActual) return 'activo';
    return 'pendiente';
  };

  const obtenerClasesPaso = (estado: string) => {
    const clasesBase = 'flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm transition-all duration-300 transform';
    
    switch (estado) {
      case 'completado':
        return `${clasesBase} bg-green-500 border-green-500 text-white shadow-lg animate-pulse`;
      case 'activo':
        return `${clasesBase} bg-primary border-primary text-white shadow-lg scale-110`;
      case 'pendiente':
        return `${clasesBase} bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400`;
      default:
        return clasesBase;
    }
  };

  const obtenerClasesTexto = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'text-green-600 dark:text-green-400';
      case 'activo':
        return 'text-primary dark:text-white';
      case 'pendiente':
        return 'text-gray-500 dark:text-gray-400';
      default:
        return '';
    }
  };

  if (esHorizontal) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between">
          {pasos.map((paso, indice) => {
            const estado = obtenerEstadoPaso(indice);
            const esUltimo = indice === pasos.length - 1;

            return (
              <div key={paso.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  {/* Círculo del paso */}
                  <div
                    className={`${obtenerClasesPaso(estado)} ${
                      onPasoClick ? 'cursor-pointer hover:scale-105' : ''
                    }`}
                    onClick={() => onPasoClick && onPasoClick(indice)}
                  >
                    {estado === 'completado' ? (
                      <FaCheck size={14} />
                    ) : paso.icono ? (
                      paso.icono
                    ) : (
                      paso.id
                    )}
                  </div>

                  {/* Texto del paso */}
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${obtenerClasesTexto(estado)}`}>
                      {paso.titulo}
                    </p>
                    {mostrarDescripcion && paso.descripcion && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {paso.descripcion}
                      </p>
                    )}
                  </div>
                </div>

                {/* Línea conectora */}
                {!esUltimo && (
                  <div className="flex-1 mx-4 mb-8">
                    <div className={`h-0.5 ${
                      indice < pasoActual ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Versión vertical
  return (
    <div className={`${className}`}>
      {pasos.map((paso, indice) => {
        const estado = obtenerEstadoPaso(indice);
        const esUltimo = indice === pasos.length - 1;

        return (
          <div key={paso.id} className="flex">
            <div className="flex flex-col items-center mr-4">
              {/* Círculo del paso */}
              <div
                className={`${obtenerClasesPaso(estado)} ${
                  onPasoClick ? 'cursor-pointer hover:scale-105' : ''
                }`}
                onClick={() => onPasoClick && onPasoClick(indice)}
              >
                {estado === 'completado' ? (
                  <FaCheck size={14} />
                ) : paso.icono ? (
                  paso.icono
                ) : (
                  paso.id
                )}
              </div>

              {/* Línea vertical conectora */}
              {!esUltimo && (
                <div className={`w-0.5 h-16 mt-2 ${
                  indice < pasoActual ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              )}
            </div>

            <div className="flex flex-col pb-8">
              <h3 className={`text-lg font-semibold ${obtenerClasesTexto(estado)}`}>
                {paso.titulo}
              </h3>
              {mostrarDescripcion && paso.descripcion && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {paso.descripcion}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepByStep; 