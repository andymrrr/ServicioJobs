import React from 'react';
import { SeparatorProps } from '../types';
import { separatorConfig, defaultValues } from '../styles';

/**
 * Componente especializado para separadores
 * Responsabilidad única: renderizar diferentes tipos de separadores
 */
const Separator: React.FC<SeparatorProps> = ({
  type = defaultValues.separatorType,
  color = defaultValues.separatorColor
}) => {
  const config = separatorConfig[type];

  // Separadores con gradientes (no usan color)
  if (typeof config === 'string') {
    return (
      <div className={`h-1 mt-2 rounded-full ${config}`} />
    );
  }

  // Separadores tradicionales (usan color)
  if (typeof config === 'object' && config[color]) {
    return (
      <div className={`border-b mt-2 ${config[color]}`} />
    );
  }

  // Fallback
  return (
    <div className="border-b mt-2 border-gray-200 dark:border-gray-700" />
  );
};

export default Separator; 