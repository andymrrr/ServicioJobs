import React from 'react';

interface EmptyStateProps {
  pestañaActiva: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ pestañaActiva }) => {
  return (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      <p>No hay campos en {pestañaActiva}</p>
      <p className="text-sm">Utiliza los botones de abajo para agregar campos</p>
    </div>
  );
};

export default EmptyState; 