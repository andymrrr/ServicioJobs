// Tipos de campos permitidos
export type TipoCampoHook = 'input' | 'select' | 'checkbox' | 'textarea';

// Tamaños de campo
export type TamanoCampoHook = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

// Interfaz para definir un tipo de campo permitido
export interface ConfiguracionCampoHook {
  tipo: TipoCampoHook;
  label: string;
  tamaño: TamanoCampoHook;
  opciones?: { valor: string; etiqueta: string }[]; // Para selects
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
}

// Interfaz para un campo individual en el formulario
export interface CampoFormularioMejorado {
  nombre: string;
  valor: string;
  tipo: TipoCampoHook;
  activo?: boolean; // Para checkboxes
}

// Estructura de datos del formulario por pestaña
export interface FormularioTabData {
  [key: string]: CampoFormularioMejorado[];
}

// Props del componente principal
export interface HookFormDinamicoProps {
  pestañas?: string[];
  tiposCamposPermitidos: ConfiguracionCampoHook[];
  cantidadMaximaCampos?: number;
  onChange?: (datos: FormularioTabData) => void;
  valoresIniciales?: FormularioTabData;
  className?: string;
  basePath?: string; // Path base para los campos (ej: 'configuracionAPI', 'tabs', etc.)
  // Props para React Hook Form (pasadas desde el componente padre)
  control: any;
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  getValues: any;
}

// Props para el componente de navegación de pestañas
export interface TabNavigationProps {
  pestañas: string[];
  pestañaActiva: string;
  onTabChange: (pestaña: string) => void;
  fieldArrays: Record<string, any>;
}

// Props para el renderizador de campos
export interface FieldRendererProps {
  campo: CampoFormularioMejorado;
  configuracion: ConfiguracionCampoHook;
  index: number;
  basePath: string;
  pestañaActiva: string;
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  onDelete: (index: number) => void;
}

// Props para los botones de acción
export interface ActionButtonsProps {
  tiposCamposPermitidos: ConfiguracionCampoHook[];
  cantidadActual: number;
  cantidadMaxima: number;
  onAgregarCampo: (configuracion: ConfiguracionCampoHook) => void;
}

// Props para la información de estado
export interface StatusInfoProps {
  pestañaActiva: string;
  cantidadCampos: number;
  errors: any;
} 