// Componentes principales
export { default as Title } from './components/Title';
export { default as Heading } from './components/Heading';
export { default as HeadingContent } from './components/HeadingContent';
export { default as Separator } from './components/Separator';
export { default as Subtitle } from './components/Subtitle';

// Exportación por defecto (compatibilidad hacia atrás)
export { default } from './components/Title';

// Tipos
export type {
  HeadingLevel,
  HeadingSize,
  HeadingColor,
  HeadingWeight,
  HeadingAlignment,
  HeadingSpacing,
  SeparatorType,
  SeparatorColor,
  IconPosition,
  BaseHeadingProps,
  HeadingWithIconProps,
  HeadingWithSeparatorProps,
  HeadingWithSubtitleProps,
  TitleProps,
  HeadingContentProps,
  SeparatorProps,
  SubtitleProps
} from './types';

// Utilidades
export {
  buildHeadingClasses,
  buildContainerClasses,
  normalizeProps,
  isValidHeadingLevel,
  getDefaultHeadingLevel,
  combineClasses
} from './utils';

// Configuraciones
export {
  sizeConfig,
  colorConfig,
  weightConfig,
  alignmentConfig,
  spacingConfig,
  separatorConfig,
  defaultValues
} from './styles'; 