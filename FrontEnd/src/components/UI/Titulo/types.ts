import { ReactNode } from 'react';

// Tipos básicos
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'pequeño' | 'mediano' | 'grande' | 'extra-grande';
export type HeadingColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
export type HeadingWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type HeadingAlignment = 'left' | 'center' | 'right';
export type HeadingSpacing = 'pequeño' | 'mediano' | 'grande' | 'extra-grande';

// Tipos para separadores
export type SeparatorType = 
  | 'linea' 
  | 'puntos' 
  | 'degradado' 
  | 'multicolor' 
  | 'arcoiris' 
  | 'gradiente-azul' 
  | 'gradiente-verde' 
  | 'gradiente-rojo';

export type SeparatorColor = 'primary' | 'secondary' | 'gray';

export type IconPosition = 'izquierda' | 'derecha';

// Props base para todos los componentes de heading
export interface BaseHeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  color?: HeadingColor;
  weight?: HeadingWeight;
  alignment?: HeadingAlignment;
  className?: string;
}

// Props para el componente con icono
export interface HeadingWithIconProps extends BaseHeadingProps {
  icon?: ReactNode;
  iconPosition?: IconPosition;
}

// Props para el componente con separador
export interface HeadingWithSeparatorProps extends BaseHeadingProps {
  separator?: boolean;
  separatorType?: SeparatorType;
  separatorColor?: SeparatorColor;
}

// Props para el componente con subtítulo
export interface HeadingWithSubtitleProps extends BaseHeadingProps {
  subtitle?: string;
}

// Props completas para el componente Title (compatibilidad hacia atrás)
export interface TitleProps extends BaseHeadingProps {
  // Propiedades heredadas renombradas para compatibilidad
  tamaño?: HeadingSize; // alias para size
  peso?: HeadingWeight; // alias para weight
  alineacion?: HeadingAlignment; // alias para alignment
  
  // Funcionalidades adicionales
  icon?: ReactNode;
  iconPosition?: IconPosition;
  posicionIcono?: IconPosition; // alias para iconPosition
  
  separator?: boolean;
  separatorType?: SeparatorType;
  separatorColor?: SeparatorColor;
  tipoSeparador?: SeparatorType; // alias para separatorType
  colorSeparador?: SeparatorColor; // alias para separatorColor
  
  subtitle?: string;
  subtitulo?: string; // alias para subtitle
  
  spacing?: HeadingSpacing;
  espacioInferior?: HeadingSpacing; // alias para spacing
  
  // Props legacy (mantener compatibilidad)
  separador?: boolean; // alias para separator
}

// Props para componentes internos
export interface HeadingContentProps {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
}

export interface SeparatorProps {
  type: SeparatorType;
  color?: SeparatorColor;
}

export interface SubtitleProps {
  text: string;
} 