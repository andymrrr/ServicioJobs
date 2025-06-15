import { EstadoPaso, TamanoStepByStep, VarianteStepByStep } from './types';

// Mapeo de variantes a colores
export const COLORES_VARIANTES: Record<VarianteStepByStep, {
  completado: string;
  activo: string;
  pendiente: string;
  linea: string;
}> = {
  primary: {
    completado: 'bg-blue-500 border-blue-500 text-white',
    activo: 'bg-blue-600 border-blue-600 text-white',
    pendiente: 'bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400',
    linea: 'bg-blue-500'
  },
  success: {
    completado: 'bg-green-500 border-green-500 text-white',
    activo: 'bg-green-600 border-green-600 text-white',
    pendiente: 'bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400',
    linea: 'bg-green-500'
  },
  warning: {
    completado: 'bg-yellow-500 border-yellow-500 text-white',
    activo: 'bg-yellow-600 border-yellow-600 text-white',
    pendiente: 'bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400',
    linea: 'bg-yellow-500'
  },
  danger: {
    completado: 'bg-red-500 border-red-500 text-white',
    activo: 'bg-red-600 border-red-600 text-white',
    pendiente: 'bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400',
    linea: 'bg-red-500'
  },
  info: {
    completado: 'bg-cyan-500 border-cyan-500 text-white',
    activo: 'bg-cyan-600 border-cyan-600 text-white',
    pendiente: 'bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400',
    linea: 'bg-cyan-500'
  }
};

// Mapeo de tamaños
export const TAMANOS_CIRCULO: Record<TamanoStepByStep, {
  circulo: string;
  icono: string;
  texto: string;
}> = {
  small: {
    circulo: 'w-8 h-8 text-xs',
    icono: '12',
    texto: 'text-xs'
  },
  medium: {
    circulo: 'w-10 h-10 text-sm',
    icono: '14',
    texto: 'text-sm'
  },
  large: {
    circulo: 'w-12 h-12 text-base',
    icono: '16',
    texto: 'text-base'
  }
};

// Función para determinar el estado de un paso
export function obtenerEstadoPaso(indicePaso: number, pasoActual: number): EstadoPaso {
  if (indicePaso < pasoActual) return 'completado';
  if (indicePaso === pasoActual) return 'activo';
  return 'pendiente';
}

// Función para obtener las clases del círculo
export function obtenerClasesCirculo(
  estado: EstadoPaso,
  variante: VarianteStepByStep,
  tamano: TamanoStepByStep,
  clickeable: boolean,
  animaciones: boolean
): string {
  const clasesBase = 'flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-300';
  const clasesTamano = TAMANOS_CIRCULO[tamano].circulo;
  const clasesColor = COLORES_VARIANTES[variante][estado];
  
  let clasesInteraccion = '';
  if (clickeable) {
    clasesInteraccion = 'cursor-pointer hover:scale-105 hover:shadow-lg';
  }
  
  let clasesAnimacion = '';
  if (animaciones) {
    if (estado === 'completado') {
      clasesAnimacion = 'animate-pulse shadow-lg';
    } else if (estado === 'activo') {
      clasesAnimacion = 'scale-110 shadow-lg';
    }
  }
  
  return `${clasesBase} ${clasesTamano} ${clasesColor} ${clasesInteraccion} ${clasesAnimacion}`.trim();
}

// Función para obtener las clases del texto del título
export function obtenerClasesTextoTitulo(
  estado: EstadoPaso,
  variante: VarianteStepByStep,
  tamano: TamanoStepByStep
): string {
  const tamanosTexto = TAMANOS_CIRCULO[tamano].texto;
  
  let clasesColor = '';
  switch (estado) {
    case 'completado':
      clasesColor = getColorTextByVariant(variante, 'completado');
      break;
    case 'activo':
      clasesColor = getColorTextByVariant(variante, 'activo');
      break;
    case 'pendiente':
      clasesColor = 'text-gray-500 dark:text-gray-400';
      break;
  }
  
  return `${tamanosTexto} font-medium ${clasesColor}`.trim();
}

// Función para obtener las clases del texto de descripción
export function obtenerClasesTextoDescripcion(tamano: TamanoStepByStep): string {
  const tamanosTexto = {
    small: 'text-xs',
    medium: 'text-xs',
    large: 'text-sm'
  };
  
  return `${tamanosTexto[tamano]} text-gray-500 dark:text-gray-400 mt-1`;
}

// Función para obtener las clases de la línea conectora
export function obtenerClasesLinea(
  activa: boolean,
  orientacion: 'horizontal' | 'vertical',
  variante: VarianteStepByStep,
  tamano: TamanoStepByStep
): string {
  const grosorLinea = {
    small: orientacion === 'horizontal' ? 'h-0.5' : 'w-0.5',
    medium: orientacion === 'horizontal' ? 'h-0.5' : 'w-0.5',
    large: orientacion === 'horizontal' ? 'h-1' : 'w-1'
  };
  
  const colorLinea = activa 
    ? COLORES_VARIANTES[variante].linea
    : 'bg-gray-300 dark:bg-gray-600';
  
  const dimensiones = orientacion === 'horizontal' 
    ? `${grosorLinea[tamano]} flex-1`
    : `${grosorLinea[tamano]} h-16`;
  
  return `${dimensiones} ${colorLinea} transition-colors duration-300`.trim();
}

// Función auxiliar para obtener colores de texto por variante
function getColorTextByVariant(variante: VarianteStepByStep, estado: 'completado' | 'activo'): string {
  const coloresTexto: Record<VarianteStepByStep, { completado: string; activo: string }> = {
    primary: {
      completado: 'text-blue-600 dark:text-blue-400',
      activo: 'text-blue-700 dark:text-blue-300'
    },
    success: {
      completado: 'text-green-600 dark:text-green-400',
      activo: 'text-green-700 dark:text-green-300'
    },
    warning: {
      completado: 'text-yellow-600 dark:text-yellow-400',
      activo: 'text-yellow-700 dark:text-yellow-300'
    },
    danger: {
      completado: 'text-red-600 dark:text-red-400',
      activo: 'text-red-700 dark:text-red-300'
    },
    info: {
      completado: 'text-cyan-600 dark:text-cyan-400',
      activo: 'text-cyan-700 dark:text-cyan-300'
    }
  };
  
  return coloresTexto[variante][estado];
}

// Función para validar la navegación entre pasos
export function puedeNavegarAPaso(
  pasoDestino: number,
  pasoActual: number,
  permitirRetroceso: boolean,
  pasoDeshabilitado: boolean
): boolean {
  if (pasoDeshabilitado) return false;
  
  // Siempre puede ir a pasos completados si se permite retroceso
  if (pasoDestino < pasoActual && permitirRetroceso) return true;
  
  // Puede ir al paso actual
  if (pasoDestino === pasoActual) return true;
  
  // No puede saltar pasos hacia adelante
  return false;
}

// Función para obtener el tamaño del icono según el tamaño del componente
export function obtenerTamanoIcono(tamano: TamanoStepByStep): number {
  return parseInt(TAMANOS_CIRCULO[tamano].icono);
}

// Función para generar clases personalizadas combinadas
export function combinarClasesPersonalizadas(
  clasesBase: string,
  clasesPersonalizadas?: string
): string {
  if (!clasesPersonalizadas) return clasesBase;
  return `${clasesBase} ${clasesPersonalizadas}`.trim();
} 