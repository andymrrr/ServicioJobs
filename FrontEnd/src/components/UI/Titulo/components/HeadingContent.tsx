import React from 'react';
import { HeadingContentProps } from '../types';
import { defaultValues } from '../styles';

/**
 * Componente para manejar el contenido del heading con iconos
 * Responsabilidad única: organizar el layout del contenido interno
 */
const HeadingContent: React.FC<HeadingContentProps> = ({
  children,
  icon,
  iconPosition = defaultValues.iconPosition
}) => {
  if (!icon) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center gap-2">
      {iconPosition === 'izquierda' && (
        <span className="inline-flex">{icon}</span>
      )}
      <span className="flex-1">{children}</span>
      {iconPosition === 'derecha' && (
        <span className="inline-flex">{icon}</span>
      )}
    </div>
  );
};

export default HeadingContent; 