import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { ActionButtonsProps } from './types';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  tiposCamposPermitidos,
  cantidadActual,
  cantidadMaxima,
  onAgregarCampo
}) => {
  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Agregar Campo ({cantidadActual}/{cantidadMaxima})
      </h3>
      <div className="flex flex-wrap gap-2">
        {tiposCamposPermitidos.map((configuracion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onAgregarCampo(configuracion)}
            disabled={cantidadActual >= cantidadMaxima}
            className="inline-flex items-center gap-2 rounded bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FaPlus size={12} />
            {configuracion.label}
            <span className="text-xs opacity-75">(col-{configuracion.tamaño})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons; 