import React from 'react';
import { StatusInfoProps } from './types';

const StatusInfo: React.FC<StatusInfoProps> = ({
  pestañaActiva,
  cantidadCampos,
  errors
}) => {
  if (cantidadCampos === 0) return null;

  return (
    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <p className="text-sm text-blue-700 dark:text-blue-300">
        <strong>Campos en {pestañaActiva}:</strong> {cantidadCampos}
      </p>
      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
        Los cambios se validan automáticamente con React Hook Form
      </p>
      {Object.keys(errors).length > 0 && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
          ⚠️ Hay errores de validación en el formulario
        </p>
      )}
    </div>
  );
};

export default StatusInfo; 