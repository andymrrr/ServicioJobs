import { 
  HeadingLevel, 
  HeadingSize, 
  HeadingColor, 
  HeadingWeight, 
  HeadingAlignment, 
  HeadingSpacing,
  SeparatorType,
  SeparatorColor
} from './types';

// Configuración de tamaños por nivel y prop
export const sizeConfig: Record<HeadingLevel, Record<HeadingSize, string>> = {
  h1: {
    pequeño: 'text-2xl',
    mediano: 'text-3xl',
    grande: 'text-4xl',
    'extra-grande': 'text-5xl'
  },
  h2: {
    pequeño: 'text-xl',
    mediano: 'text-2xl',
    grande: 'text-3xl',
    'extra-grande': 'text-4xl'
  },
  h3: {
    pequeño: 'text-lg',
    mediano: 'text-xl',
    grande: 'text-2xl',
    'extra-grande': 'text-3xl'
  },
  h4: {
    pequeño: 'text-base',
    mediano: 'text-lg',
    grande: 'text-xl',
    'extra-grande': 'text-2xl'
  },
  h5: {
    pequeño: 'text-sm',
    mediano: 'text-base',
    grande: 'text-lg',
    'extra-grande': 'text-xl'
  },
  h6: {
    pequeño: 'text-xs',
    mediano: 'text-sm',
    grande: 'text-base',
    'extra-grande': 'text-lg'
  }
};

// Configuración de colores
export const colorConfig: Record<HeadingColor, string> = {
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  danger: 'text-red-600 dark:text-red-400',
  dark: 'text-black dark:text-white',
  light: 'text-gray-500 dark:text-gray-300'
};

// Configuración de peso de fuente
export const weightConfig: Record<HeadingWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

// Configuración de alineación
export const alignmentConfig: Record<HeadingAlignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

// Configuración de espacio inferior
export const spacingConfig: Record<HeadingSpacing, string> = {
  pequeño: 'mb-2',
  mediano: 'mb-4',
  grande: 'mb-6',
  'extra-grande': 'mb-8'
};

// Configuración de separadores
export const separatorConfig: Record<SeparatorType, string | Record<SeparatorColor, string>> = {
  linea: {
    primary: 'border-blue-200 dark:border-blue-800',
    secondary: 'border-gray-200 dark:border-gray-700',
    gray: 'border-gray-200 dark:border-strokedark'
  },
  puntos: {
    primary: 'border-blue-200 dark:border-blue-800 border-dotted',
    secondary: 'border-gray-200 dark:border-gray-700 border-dotted',
    gray: 'border-gray-200 dark:border-strokedark border-dotted'
  },
  degradado: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600',
  multicolor: 'bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-red-500',
  arcoiris: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500',
  'gradiente-azul': 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
  'gradiente-verde': 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
  'gradiente-rojo': 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
};

// Valores por defecto
export const defaultValues = {
  level: 'h4' as HeadingLevel,
  size: 'mediano' as HeadingSize,
  color: 'dark' as HeadingColor,
  weight: 'semibold' as HeadingWeight,
  alignment: 'left' as HeadingAlignment,
  spacing: 'mediano' as HeadingSpacing,
  separatorType: 'linea' as SeparatorType,
  separatorColor: 'gray' as SeparatorColor,
  iconPosition: 'izquierda' as const
}; 