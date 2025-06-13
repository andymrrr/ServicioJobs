import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

// Reutilizar tipo de colSpan del input
export type ColSpanType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

// Interfaz para opciones del select
export interface SelectOption {
  value: string | number;
  label: string;
  [key: string]: any; // Para propiedades adicionales
}

// Interfaz para respuesta de la API
export interface PaginatedResponse<T = SelectOption> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Función para obtener datos de la API
export type FetchDataFunction = (
  searchTerm?: string,
  page?: number,
  limit?: number
) => Promise<PaginatedResponse>;

// Función para transformar datos de la API a SelectOption
export type TransformDataFunction<T = any> = (item: T) => SelectOption;

// Props base para el select
export interface BaseSelectProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// Props de validación
export interface SelectValidationProps {
  required?: string;
}

// Props principales del componente
export interface PaginatedSelectProps<T extends FieldValues> extends BaseSelectProps<T>, SelectValidationProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  tooltipMessage?: string;
  colSpan?: ColSpanType;
  
  // Props específicas para paginación
  fetchData: FetchDataFunction;
  transformData?: TransformDataFunction;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  minSearchLength?: number;
  debounceDelay?: number;
  
  // Props para personalización
  noOptionsMessage?: string;
  loadingMessage?: string;
  searchingMessage?: string;
  
  // Props opcionales
  allowClear?: boolean;
  showSearch?: boolean;
}

// Props para el label (reutilizar del input)
export interface SelectLabelProps {
  label: string;
  tooltipMessage?: string;
}

// Props para el mensaje de error (reutilizar del input)
export interface ErrorMessageProps<T extends FieldValues> {
  name: Path<T>;
  errors: FieldErrors<T>;
}

// Props para el dropdown del select
export interface SelectDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClear?: () => void;
  
  // Estado de búsqueda
  searchTerm: string;
  onSearchChange: (value: string) => void;
  
  // Opciones y selección
  options: SelectOption[];
  selectedOption: SelectOption | null;
  onOptionSelect: (option: SelectOption) => void;
  
  // Estados de carga
  isLoading: boolean;
  isSearching: boolean;
  
  // Paginación
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onLoadMore: () => void;
  
  // Configuración
  placeholder?: string;
  searchPlaceholder?: string;
  disabled: boolean;
  hasError: boolean;
  allowClear: boolean;
  showSearch: boolean;
  
  // Mensajes
  noOptionsMessage: string;
  loadingMessage: string;
  searchingMessage: string;
}

// Props para el item de opción
export interface SelectOptionItemProps {
  option: SelectOption;
  isSelected: boolean;
  onSelect: (option: SelectOption) => void;
}

// Props para el indicador de carga
export interface LoadingIndicatorProps {
  message: string;
}

// Props para el botón de cargar más
export interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
} 