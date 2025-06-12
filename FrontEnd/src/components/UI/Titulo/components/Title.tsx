import React from 'react';
import { TitleProps } from '../types';
import { normalizeProps, buildHeadingClasses, buildContainerClasses } from '../utils';
import HeadingContent from './HeadingContent';
import Separator from './Separator';
import Subtitle from './Subtitle';

/**
 * Componente Title refactorizado - Compone los componentes pequeños
 * Mantiene compatibilidad hacia atrás con el componente original
 */
const Title: React.FC<TitleProps> = (props) => {
  const {
    level,
    size,
    color,
    weight,
    alignment,
    spacing,
    icon,
    iconPosition,
    separator,
    separatorType,
    separatorColor,
    subtitle,
    className
  } = normalizeProps(props);

  const Tag = level;
  
  const headingClasses = buildHeadingClasses(
    level,
    size,
    color,
    weight,
    alignment,
    spacing,
    separator,
    className
  );

  const containerClasses = buildContainerClasses(spacing, separator);

  return (
    <div className={containerClasses}>
      <Tag className={headingClasses}>
        <HeadingContent 
          icon={icon} 
          iconPosition={iconPosition}
        >
          {props.children}
        </HeadingContent>
      </Tag>
      
      {subtitle && <Subtitle text={subtitle} />}
      
      {separator && (
        <Separator 
          type={separatorType} 
          color={separatorColor} 
        />
      )}
    </div>
  );
};

export default Title; 