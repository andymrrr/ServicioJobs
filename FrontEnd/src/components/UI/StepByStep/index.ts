// Componente principal
export { default as StepByStep } from './StepByStep';

// Hooks
export { useFormSteps } from './useFormSteps';

// Componentes auxiliares
export { default as PasoItem } from './PasoItem';
export { default as CirculoPaso } from './CirculoPaso';
export { default as LineaConectora } from './LineaConectora';
export { default as NavigationButtons } from './NavigationButtons';

// Utilidades
export * from './utils';

// Tipos
export type { 
  StepByStepProps, 
  PasoItemProps, 
  LineaConectoraProps, 
  CirculoPasoProps, 
  EstilosPersonalizados,
  Paso,
  EstadoPaso,
  TemaStepByStep,
  TamanoStepByStep,
  VarianteStepByStep,
  PosicionBotones
} from './types';

// Configuraciones de pasos
export type { StepConfig } from './useFormSteps';

// Export por defecto del componente principal
export { default } from './StepByStep'; 