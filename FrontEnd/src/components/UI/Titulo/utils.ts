import { 
  HeadingLevel, 
  HeadingSize, 
  HeadingColor, 
  HeadingWeight, 
  HeadingAlignment, 
  HeadingSpacing,
  TitleProps
} from './types';
import { 
  sizeConfig, 
  colorConfig, 
  weightConfig, 
  alignmentConfig, 
  spacingConfig,
  defaultValues
} from './styles';

/**
 * Construye las clases CSS para el título
 */
export const buildHeadingClasses = (
  level: HeadingLevel,
  size: HeadingSize,
  color: HeadingColor,
  weight: HeadingWeight,
  alignment: HeadingAlignment,
  spacing: HeadingSpacing,
  hasSeparator: boolean,
  className?: string
): string => {
  const classes = [
    sizeConfig[level][size],
    colorConfig[color],
    weightConfig[weight],
    alignmentConfig[alignment],
    hasSeparator ? 'pb-2' : spacingConfig[spacing],
    'leading-tight',
    className
  ].filter(Boolean);

  return classes.join(' ');
};

/**
 * Construye las clases CSS para el contenedor
 */
export const buildContainerClasses = (
  spacing: HeadingSpacing,
  hasSeparator: boolean
): string => {
  const classes = [
    hasSeparator ? spacingConfig[spacing] : '',
    'relative'
  ].filter(Boolean);

  return classes.join(' ');
};

/**
 * Normaliza las props del componente Title para mantener compatibilidad hacia atrás
 */
export const normalizeProps = (props: TitleProps) => {
  return {
    level: props.level || defaultValues.level,
    size: props.size || props.tamaño || defaultValues.size,
    color: props.color || defaultValues.color,
    weight: props.weight || props.peso || defaultValues.weight,
    alignment: props.alignment || props.alineacion || defaultValues.alignment,
    spacing: props.spacing || props.espacioInferior || defaultValues.spacing,
    
    icon: props.icon,
    iconPosition: props.iconPosition || props.posicionIcono || defaultValues.iconPosition,
    
    separator: props.separator || props.separador || false,
    separatorType: props.separatorType || props.tipoSeparador || defaultValues.separatorType,
    separatorColor: props.separatorColor || props.colorSeparador || defaultValues.separatorColor,
    
    subtitle: props.subtitle || props.subtitulo,
    
    className: props.className || ''
  };
};

/**
 * Valida si un nivel de heading es válido
 */
export const isValidHeadingLevel = (level: string): level is HeadingLevel => {
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(level);
};

/**
 * Obtiene el nivel de heading por defecto basado en el contexto
 */
export const getDefaultHeadingLevel = (context?: 'page' | 'section' | 'subsection'): HeadingLevel => {
  switch (context) {
    case 'page':
      return 'h1';
    case 'section':
      return 'h2';
    case 'subsection':
      return 'h3';
    default:
      return defaultValues.level;
  }
};

/**
 * Combina múltiples clases CSS de forma segura
 */
export const combineClasses = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
}; 