// Componente principal
export { default as StepByStep } from './StepByStep';

// Componentes individuales (por si se necesitan usar por separado)
export { default as PasoItem } from './PasoItem';
export { default as CirculoPaso } from './CirculoPaso';
export { default as LineaConectora } from './LineaConectora';

// Tipos
export type {
  Paso,
  EstadoPaso,
  TemaStepByStep,
  TamanoStepByStep,
  VarianteStepByStep,
  EstilosPersonalizados,
  StepByStepProps,
  PasoItemProps,
  CirculoPasoProps,
  LineaConectoraProps
} from './types';

// Utilidades (por si se necesitan usar externamente)
export {
  obtenerEstadoPaso,
  obtenerClasesCirculo,
  obtenerClasesTextoTitulo,
  obtenerClasesTextoDescripcion,
  obtenerClasesLinea,
  puedeNavegarAPaso,
  obtenerTamanoIcono,
  combinarClasesPersonalizadas,
  COLORES_VARIANTES,
  TAMANOS_CIRCULO
} from './utils';

// Export por defecto del componente principal
export { default } from './StepByStep'; 