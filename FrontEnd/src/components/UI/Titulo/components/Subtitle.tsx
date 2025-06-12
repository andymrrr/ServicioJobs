import React from 'react';
import { SubtitleProps } from '../types';

/**
 * Componente especializado para subtítulos
 * Responsabilidad única: renderizar subtítulos con estilos consistentes
 */
const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  return (
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
      {text}
    </p>
  );
};

export default Subtitle; 