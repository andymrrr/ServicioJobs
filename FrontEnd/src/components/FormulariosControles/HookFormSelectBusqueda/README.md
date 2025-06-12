# 🔍 HookFormSelectBusqueda - Componente Avanzado

Componente de select mejorado con búsqueda integrada para React Hook Form, con múltiples variantes visuales y funcionalidades avanzadas.

## 🚀 Características Principales

### ✨ **Múltiples Variantes Visuales**
- `basic` - Estilo básico limpio
- `modern` - Diseño moderno con sombras y bordes redondeados
- `icon` - Soporte para iconos personalizados
- `compact` - Variante compacta para espacios reducidos

### 📏 **Tamaños Configurables**
- `sm` - Pequeño (32px altura)
- `md` - Mediano (40px altura) - *Por defecto*
- `lg` - Grande (48px altura)

### 🎯 **Funcionalidades Avanzadas**
- ✅ **Multi-selección** - Permite seleccionar múltiples opciones
- 🔍 **Búsqueda personalizada** - Filtros personalizables
- 👥 **Opciones agrupadas** - Organización en categorías
- 🎨 **Formato personalizado** - Opciones con colores y descripciones
- ⏳ **Estado de carga** - Soporte para carga asíncrona
- 🚫 **Opciones deshabilitadas** - Control granular de disponibilidad
- 🎭 **Tooltips informativos** - Ayuda contextual
- 📱 **Responsive** - Adaptable a diferentes tamaños de pantalla

## 📦 Estructura de Archivos

```
HookFormSelectBusqueda/
├── types.ts              # Interfaces y tipos TypeScript
├── utils.ts              # Funciones utilitarias y estilos
├── SelectLabel.tsx       # Componente del label
├── SelectField.tsx       # Componente principal del select
├── SelectController.tsx  # Wrapper para react-hook-form
├── ErrorMessage.tsx      # Componente de mensajes de error
├── HookFormSelectBusqueda.tsx # Componente principal
├── AdvancedDemo.tsx      # Demostración completa
├── index.ts             # Exportaciones
└── README.md            # Esta documentación
```

## 🛠️ Uso Básico

```tsx
import { HookFormSelectBusqueda } from './HookFormSelectBusqueda';

// Opciones básicas
const options = [
  { value: 'option1', label: 'Opción 1' },
  { value: 'option2', label: 'Opción 2' },
  { value: 'option3', label: 'Opción 3' },
];

// En tu componente
<HookFormSelectBusqueda
  label="Selecciona una opción"
  name="mySelect"
  control={control}
  errors={errors}
  options={options}
  placeholder="Elige una opción..."
  required="Este campo es obligatorio"
/>
```

## 🎨 Variantes Visuales

### Variante Básica
```tsx
<HookFormSelectBusqueda
  variant="basic"
  // ... otros props
/>
```

### Variante Moderna
```tsx
<HookFormSelectBusqueda
  variant="modern"
  size="lg"
  // ... otros props
/>
```

### Variante con Icono
```tsx
<HookFormSelectBusqueda
  variant="icon"
  icon={<UserIcon />}
  // ... otros props
/>
```

### Variante Compacta
```tsx
<HookFormSelectBusqueda
  variant="compact"
  size="sm"
  // ... otros props
/>
```

## 🔢 Multi-selección

```tsx
<HookFormSelectBusqueda
  isMulti={true}
  placeholder="Selecciona múltiples opciones..."
  // ... otros props
/>
```

## 👥 Opciones Agrupadas

```tsx
const groups = [
  {
    label: 'Frutas',
    options: [
      { value: 'apple', label: 'Manzana' },
      { value: 'banana', label: 'Plátano' },
    ]
  },
  {
    label: 'Verduras',
    options: [
      { value: 'carrot', label: 'Zanahoria' },
      { value: 'broccoli', label: 'Brócoli' },
    ]
  }
];

<HookFormSelectBusqueda
  groups={groups}
  // ... otros props
/>
```

## 🎨 Opciones con Colores y Descripciones

```tsx
const colorOptions = [
  { 
    value: 'red', 
    label: 'Rojo', 
    color: '#ef4444',
    description: 'Color cálido y vibrante'
  },
  { 
    value: 'blue', 
    label: 'Azul', 
    color: '#3b82f6',
    description: 'Color frío y tranquilo'
  },
];

<HookFormSelectBusqueda
  options={colorOptions}
  // ... otros props
/>
```

## 🔍 Filtro Personalizado

```tsx
const customFilter = (option, inputValue) => {
  const searchValue = inputValue.toLowerCase();
  return (
    option.label.toLowerCase().includes(searchValue) ||
    option.description?.toLowerCase().includes(searchValue)
  );
};

<HookFormSelectBusqueda
  customFilter={customFilter}
  // ... otros props
/>
```

## 🎭 Formato Personalizado de Opciones

```tsx
const formatOptionLabel = (option) => (
  <div className="flex items-center justify-between">
    <span>{option.label}</span>
    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
      {option.value}
    </span>
  </div>
);

<HookFormSelectBusqueda
  formatOptionLabel={formatOptionLabel}
  // ... otros props
/>
```

## ⏳ Estados de Carga

```tsx
<HookFormSelectBusqueda
  isLoading={isLoadingData}
  loadingMessage="Cargando opciones..."
  // ... otros props
/>
```

## 🔧 Props Completas

```tsx
interface HookFormSelectBusquedaProps<T extends FieldValues> {
  // Obligatorios
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  
  // Opciones
  options?: SelectOption[];
  groups?: SelectGroup[];
  
  // Comportamiento
  selectedValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  
  // Validación
  required?: string | boolean;
  validate?: (value: any) => string | boolean;
  
  // Estilo
  variant?: 'basic' | 'modern' | 'icon' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  colSpan?: ColSpanType;
  
  // Mensajes
  tooltipMessage?: string;
  noOptionsMessage?: string;
  loadingMessage?: string;
  
  // Personalización
  customFilter?: (option: SelectOption, inputValue: string) => boolean;
  formatOptionLabel?: (option: SelectOption) => React.ReactNode;
  reactSelectProps?: Partial<ReactSelectProps>;
}
```

## 🎯 Validaciones

```tsx
// Validación simple
<HookFormSelectBusqueda
  required="Este campo es obligatorio"
  // ... otros props
/>

// Validación personalizada
<HookFormSelectBusqueda
  validate={(value) => {
    if (!value) return "Selecciona una opción";
    if (value === 'invalid') return "Esta opción no es válida";
    return true;
  }}
  // ... otros props
/>
```

## 🌟 Mejoras Implementadas

### 🔄 **Arquitectura Modular**
- Componentes separados y reutilizables
- Fácil mantenimiento y testing
- Separación clara de responsabilidades

### 🎨 **Diseño Mejorado**
- 4 variantes visuales distintas
- 3 tamaños configurables
- Soporte completo para modo oscuro
- Animaciones y transiciones suaves

### 🚀 **Funcionalidades Avanzadas**
- Multi-selección con tags
- Filtrado personalizable
- Opciones agrupadas
- Formato personalizado de opciones
- Estado de carga asíncrona

### 🔧 **Experiencia de Desarrollo**
- TypeScript completo
- Props bien documentadas
- Extensible y personalizable
- Compatible con react-hook-form

### 📱 **Accesibilidad y UX**
- Navegación por teclado
- Lectores de pantalla
- Indicadores visuales claros
- Mensajes de error descriptivos

## 🎪 Demostración

Ejecuta el componente `AdvancedDemo` para ver todas las funcionalidades en acción:

```tsx
import { AdvancedDemo } from './AdvancedDemo';

<AdvancedDemo />
```

## 🔧 Personalización de Estilos

El componente utiliza Tailwind CSS y permite personalización completa a través de:

1. **Variantes predefinidas**
2. **Props de react-select**
3. **Clases CSS personalizadas**
4. **Estilos en línea**

## 🐛 Solución de Problemas

### El menú se corta en contenedores con overflow
```tsx
<HookFormSelectBusqueda
  reactSelectProps={{
    menuPortalTarget: document.body,
    menuPosition: 'fixed'
  }}
/>
```

### Problemas de z-index
```tsx
<HookFormSelectBusqueda
  reactSelectProps={{
    styles: {
      menu: (provided) => ({ ...provided, zIndex: 9999 })
    }
  }}
/>
```

---

¡Disfruta del componente mejorado! 🎉 