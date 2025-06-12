import React from 'react';
import { BaseHeadingProps } from '../types';
import { buildHeadingClasses } from '../utils';
import { defaultValues } from '../styles';

/**
 * Componente base para títulos - Simple y enfocado
 * Solo maneja el renderizado básico del heading sin funcionalidades adicionales
 */
const Heading: React.FC<BaseHeadingProps> = ({
  children,
  level = defaultValues.level,
  size = defaultValues.size,
  color = defaultValues.color,
  weight = defaultValues.weight,
  alignment = defaultValues.alignment,
  className = ''
}) => {
  const Tag = level;
  
  const headingClasses = buildHeadingClasses(
    level,
    size,
    color,
    weight,
    alignment,
    defaultValues.spacing,
    false, // no separator
    className
  );

  return (
    <Tag className={headingClasses}>
      {children}
    </Tag>
  );
};

export default Heading; 