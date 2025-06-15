import { ReactNode } from 'react';

// Estados posibles de un paso
export type EstadoPaso = 'completado' | 'activo' | 'pendiente';

// Tema/orientación del componente
export type TemaStepByStep = 'horizontal' | 'vertical';

// Tamaño del componente
export type TamanoStepByStep = 'small' | 'medium' | 'large';

// Variante de color
export type VarianteStepByStep = 'primary' | 'success' | 'warning' | 'danger' | 'info';

// 🆕 Posición de los botones de navegación
export type PosicionBotones = 'arriba' | 'abajo' | 'izquierda' | 'derecha';

// Interfaz para un paso individual
export interface Paso {
  /** Identificador único del paso */
  id: number;
  /** Título del paso */
  titulo: string;
  /** Descripción opcional del paso */
  descripcion?: string;
  /** Icono personalizado para el paso */
  icono?: ReactNode;
  /** Si el paso está deshabilitado */
  deshabilitado?: boolean;
  /** Datos adicionales del paso */
  datos?: Record<string, any>;
}

// Configuración de estilos personalizados
export interface EstilosPersonalizados {
  /** Clases para el contenedor principal */
  contenedor?: string;
  /** Clases para el círculo del paso */
  circulo?: string;
  /** Clases para el texto del título */
  titulo?: string;
  /** Clases para el texto de descripción */
  descripcion?: string;
  /** Clases para la línea conectora */
  linea?: string;
}

// Props principales del componente StepByStep
export interface StepByStepProps {
  /** Array de pasos a mostrar */
  pasos: Paso[];
  /** Índice del paso actual (0-based) */
  pasoActual: number;
  /** Callback cuando se hace click en un paso */
  onPasoClick?: (paso: number, datosPaso: Paso) => void;
  /** Si mostrar las descripciones de los pasos */
  mostrarDescripcion?: boolean;
  /** Orientación del componente */
  tema?: TemaStepByStep;
  /** Tamaño del componente */
  tamano?: TamanoStepByStep;
  /** Variante de color */
  variante?: VarianteStepByStep;
  /** Si permitir navegación hacia atrás */
  permitirRetroceso?: boolean;
  /** Si mostrar números en lugar de iconos */
  mostrarNumeros?: boolean;
  /** Estilos personalizados */
  estilosPersonalizados?: EstilosPersonalizados;
  /** Clase CSS adicional para el contenedor */
  className?: string;
  /** Si mostrar animaciones */
  animaciones?: boolean;
  /** Callback cuando cambia el paso actual */
  onCambioPaso?: (pasoAnterior: number, pasoNuevo: number) => void;
  
  // 🆕 Props para botones de navegación integrados
  /** Si mostrar botones de navegación */
  mostrarBotones?: boolean;
  /** Posición de los botones de navegación */
  posicionBotones?: PosicionBotones;
  /** Contenido adicional a renderizar (como el contenido del formulario) */
  contenidoFormulario?: React.ReactNode;
  /** Función para ir al paso anterior */
  onAnterior?: () => void;
  /** Función para ir al siguiente paso */
  onSiguiente?: () => void;
  /** Función para cancelar/resetear */
  onCancelar?: () => void;
  /** Función para submit final */
  onSubmit?: () => void;
  /** Si está cargando/procesando */
  cargando?: boolean;
  /** Texto personalizado para botones */
  textosBotones?: {
    anterior?: string;
    siguiente?: string;
    cancelar?: string;
    finalizar?: string;
  };
  /** Si deshabilitar botones */
  deshabilitarBotones?: boolean;
}

// Props para el componente de paso individual
export interface PasoItemProps {
  /** Datos del paso */
  paso: Paso;
  /** Índice del paso */
  indice: number;
  /** Estado actual del paso */
  estado: EstadoPaso;
  /** Si es el último paso */
  esUltimo: boolean;
  /** Orientación del componente */
  tema: TemaStepByStep;
  /** Tamaño del componente */
  tamano: TamanoStepByStep;
  /** Variante de color */
  variante: VarianteStepByStep;
  /** Si mostrar descripción */
  mostrarDescripcion: boolean;
  /** Si mostrar números */
  mostrarNumeros: boolean;
  /** Si permitir click */
  clickeable: boolean;
  /** Si mostrar animaciones */
  animaciones: boolean;
  /** Estilos personalizados */
  estilosPersonalizados?: EstilosPersonalizados;
  /** Callback de click */
  onClick?: (indice: number, paso: Paso) => void;
}

// Props para la línea conectora
export interface LineaConectoraProps {
  /** Si la línea está activa (completada) */
  activa: boolean;
  /** Orientación de la línea */
  orientacion: 'horizontal' | 'vertical';
  /** Variante de color */
  variante: VarianteStepByStep;
  /** Tamaño */
  tamano: TamanoStepByStep;
  /** Estilos personalizados */
  estilosPersonalizados?: EstilosPersonalizados;
}

// Props para el círculo del paso
export interface CirculoPasoProps {
  /** Estado del paso */
  estado: EstadoPaso;
  /** Contenido del círculo */
  contenido: ReactNode;
  /** Variante de color */
  variante: VarianteStepByStep;
  /** Tamaño */
  tamano: TamanoStepByStep;
  /** Si es clickeable */
  clickeable: boolean;
  /** Si mostrar animaciones */
  animaciones: boolean;
  /** Estilos personalizados */
  estilosPersonalizados?: EstilosPersonalizados;
  /** Callback de click */
  onClick?: () => void;
} 