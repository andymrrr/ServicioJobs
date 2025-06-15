import React from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';

export type PosicionBotones = 'arriba' | 'abajo' | 'izquierda' | 'derecha';

interface NavigationButtonsProps {
  // Estado
  pasoActual: number;
  totalPasos: number;
  cargando: boolean;
  deshabilitado: boolean;
  
  // Callbacks
  onAnterior: () => void;
  onSiguiente: () => void;
  onCancelar?: () => void;
  onSubmit?: () => void;
  
  // Configuración
  posicion?: PosicionBotones;
  textos: {
    anterior: string;
    siguiente: string;
    cancelar: string;
    finalizar: string;
  };
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  pasoActual,
  totalPasos,
  cargando,
  deshabilitado,
  onAnterior,
  onSiguiente,
  onCancelar,
  onSubmit,
  posicion = 'abajo',
  textos
}) => {
  const isFirstStep = pasoActual === 0;
  const isLastStep = pasoActual === totalPasos - 1;

  // Clases según la posición
  const getContainerClasses = () => {
    const baseClasses = "flex items-center gap-3";
    
    switch (posicion) {
      case 'arriba':
        return `${baseClasses} justify-between pb-6 border-b border-gray-200 dark:border-gray-700`;
      case 'abajo':
        return `${baseClasses} justify-between pt-6 border-t border-gray-200 dark:border-gray-700`;
      case 'izquierda':
        return `${baseClasses} flex-col pr-6 border-r border-gray-200 dark:border-gray-700 h-fit`;
      case 'derecha':
        return `${baseClasses} flex-col pl-6 border-l border-gray-200 dark:border-gray-700 h-fit`;
      default:
        return `${baseClasses} justify-between pt-6 border-t border-gray-200 dark:border-gray-700`;
    }
  };

  // Layout específico para posiciones laterales
  const isVerticalLayout = posicion === 'izquierda' || posicion === 'derecha';
  
  // Orden de botones para posiciones laterales
  const renderBotonesVerticales = () => (
    <div className="flex flex-col gap-3 w-full">
      {/* Botón Anterior */}
      <button
        type="button"
        onClick={onAnterior}
        disabled={isFirstStep || deshabilitado}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full"
      >
        <FaArrowLeft size={14} />
        {textos.anterior}
      </button>

      {/* Botón Cancelar (opcional) */}
      {onCancelar && (
        <button
          type="button"
          onClick={onCancelar}
          disabled={deshabilitado}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full"
        >
          <FaTimes size={14} />
          {textos.cancelar}
        </button>
      )}

      {/* Botón Siguiente/Finalizar */}
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={deshabilitado}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full"
        >
          {cargando ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Procesando...
            </>
          ) : (
            <>
              <FaCheck size={14} />
              {textos.finalizar}
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onSiguiente}
          disabled={deshabilitado}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full"
        >
          {textos.siguiente}
          <FaArrowRight size={14} />
        </button>
      )}
    </div>
  );

  // Layout horizontal original
  const renderBotonesHorizontales = () => (
    <>
      {/* Botón Anterior */}
      <button
        type="button"
        onClick={onAnterior}
        disabled={isFirstStep || deshabilitado}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <FaArrowLeft size={14} />
        {textos.anterior}
      </button>

      {/* Botones del lado derecho */}
      <div className="flex items-center gap-3">
        {/* Botón Cancelar (opcional) */}
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            disabled={deshabilitado}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FaTimes size={14} />
            {textos.cancelar}
          </button>
        )}

        {/* Botón Siguiente/Finalizar */}
        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={deshabilitado}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {cargando ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Procesando...
              </>
            ) : (
              <>
                <FaCheck size={14} />
                {textos.finalizar}
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSiguiente}
            disabled={deshabilitado}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {textos.siguiente}
            <FaArrowRight size={14} />
          </button>
        )}
      </div>
    </>
  );

  return (
    <div className={getContainerClasses()}>
      {isVerticalLayout ? renderBotonesVerticales() : renderBotonesHorizontales()}
    </div>
  );
};

export default NavigationButtons; 