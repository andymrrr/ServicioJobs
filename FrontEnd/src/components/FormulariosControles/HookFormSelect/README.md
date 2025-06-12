# HookFormSelect

Componente modular y avanzado de select para formularios con React Hook Form, que ofrece múltiples variantes visuales, estados de carga, opciones agrupadas y funcionalidades avanzadas.

## 🚀 Características Principales

- **Múltiples Variantes**: Basic, Modern, Outlined, Filled, Minimal
- **Tamaños Flexibles**: Small (sm), Medium (md), Large (lg)
- **Opciones Agrupadas**: Organización por categorías
- **Estados de Carga**: Indicadores visuales asíncronos
- **Opciones Avanzadas**: Colores, descripciones, estados deshabilitados
- **Validaciones**: Integración completa con React Hook Form
- **Funcionalidad Clear**: Botón para limpiar selección
- **Tooltips**: Información contextual
- **Modo Oscuro**: Soporte completo para dark mode
- **Accesibilidad**: Implementación ARIA completa
- **TypeScript**: Tipado estricto y completo

## 📦 Instalación

```bash
npm install react-hook-form react-icons
```

## 🎯 Uso Básico

```tsx
import { useForm } from 'react-hook-form';
import HookFormSelect, { SelectOption } from './HookFormSelect';

interface FormData {
  pais: string;
}

const MiFormulario = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const opciones: SelectOption[] = [
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' }
  ];

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <HookFormSelect
        name="pais"
        label="Seleccionar País"
        options={opciones}
        register={register}
        errors={errors}
        required="El país es obligatorio"
      />
    </form>
  );
};
```

## 🎨 Variantes Visuales

### Basic (Por defecto)
```tsx
<HookFormSelect
  variant="basic"
  // ... resto de props
/>
```

### Modern (Estilo contemporáneo)
```tsx
<HookFormSelect
  variant="modern"
  // ... resto de props
/>
```

### Outlined (Bordes definidos)
```tsx
<HookFormSelect
  variant="outlined"
  // ... resto de props
/>
```

### Filled (Fondo relleno)
```tsx
<HookFormSelect
  variant="filled"
  // ... resto de props
/>
```

### Minimal (Estilo minimalista)
```tsx
<HookFormSelect
  variant="minimal"
  // ... resto de props
/>
```

## 📏 Tamaños Disponibles

```tsx
// Pequeño
<HookFormSelect size="sm" />

// Mediano (por defecto)
<HookFormSelect size="md" />

// Grande
<HookFormSelect size="lg" />
```

## 🔗 Opciones Agrupadas

```tsx
import { SelectGroup } from './HookFormSelect';

const grupos: SelectGroup[] = [
  {
    label: 'Europa',
    options: [
      { value: 'es', label: 'España' },
      { value: 'fr', label: 'Francia' }
    ]
  },
  {
    label: 'América',
    options: [
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' }
    ]
  }
];

<HookFormSelect
  groups={grupos}
  // ... resto de props
/>
```

## 🎯 Opciones Avanzadas

```tsx
const opcionesAvanzadas: SelectOption[] = [
  { 
    value: 'premium', 
    label: 'Plan Premium', 
    description: 'Incluye todas las características',
    color: 'gold'
  },
  { 
    value: 'basic', 
    label: 'Plan Básico', 
    description: 'Características esenciales',
    disabled: true
  }
];
```

## ⚡ Estados de Carga

```tsx
const [loading, setLoading] = useState(false);

<HookFormSelect
  loading={loading}
  loadingMessage="Cargando opciones..."
  // ... resto de props
/>
```

## 🧹 Funcionalidad Clear

```tsx
<HookFormSelect
  clearable
  selectedValue={valor}
  onChange={(nuevoValor) => setValor(nuevoValor)}
  // ... resto de props
/>
```

## 🎪 Validaciones Avanzadas

```tsx
<HookFormSelect
  required="Este campo es obligatorio"
  validate={(value) => {
    if (value === 'restricted') {
      return 'Esta opción no está disponible';
    }
    return true;
  }}
  // ... resto de props
/>
```

## 🔧 Props Completas

```tsx
interface HookFormSelectProps<T extends FieldValues> {
  // Props básicas
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  
  // Opciones de datos
  options?: SelectOption[];
  groups?: SelectGroup[];
  
  // Configuración visual
  variant?: 'basic' | 'modern' | 'outlined' | 'filled' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  
  // Estado y comportamiento
  selectedValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  
  // Mensajes y textos
  placeholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  tooltipMessage?: string;
  
  // Validaciones
  required?: string | boolean;
  validate?: (value: string) => string | boolean;
  
  // Elementos visuales
  icon?: React.ReactNode;
}
```

## 🎭 Ejemplos de Uso

### Con Iconos
```tsx
import { FiMapPin } from 'react-icons/fi';

<HookFormSelect
  icon={<FiMapPin />}
  // ... resto de props
/>
```

### Con Tooltip
```tsx
<HookFormSelect
  tooltipMessage="Selecciona tu país de residencia"
  // ... resto de props
/>
```

### Formulario Completo
```tsx
const FormularioCompleto = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const valores = watch();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <div className="grid grid-cols-12 gap-4">
        <HookFormSelect
          name="categoria"
          label="Categoría"
          options={categorias}
          register={register}
          errors={errors}
          selectedValue={valores.categoria}
          onChange={(value) => setValue('categoria', value)}
          variant="modern"
          size="lg"
          colSpan="6"
          clearable
          required
        />
        
        <HookFormSelect
          name="subcategoria"
          label="Subcategoría"
          options={subcategorias}
          register={register}
          errors={errors}
          selectedValue={valores.subcategoria}
          onChange={(value) => setValue('subcategoria', value)}
          variant="outlined"
          colSpan="6"
          disabled={!valores.categoria}
        />
      </div>
    </form>
  );
};
```

## 🎨 Personalización de Estilos

El componente utiliza Tailwind CSS y admite modo oscuro automáticamente:

```tsx
// Modo claro
<HookFormSelect className="custom-select" />

// Modo oscuro (automático)
<div className="dark">
  <HookFormSelect />
</div>
```

## 🔍 Componentes Internos

- **SelectLabel**: Etiqueta con tooltip opcional
- **SelectField**: Campo select principal con múltiples variantes
- **ErrorMessage**: Mensaje de error con icono
- **LoadingSpinner**: Indicador de carga
- **ClearButton**: Botón para limpiar selección

## 📱 Responsive Design

```tsx
<HookFormSelect
  colSpan="12"     // Móvil: ancho completo
  // En desktop se puede ajustar con CSS Grid
/>
```

## 🌐 Accesibilidad

- Labels asociados correctamente
- Estados ARIA apropiados
- Navegación por teclado
- Contraste de colores WCAG 2.1
- Tooltips accesibles

## 🔧 Desarrollo

```bash
# Estructura de archivos
HookFormSelect/
├── types.ts           # Definiciones de tipos
├── utils.ts           # Funciones utilitarias
├── SelectLabel.tsx    # Componente de etiqueta
├── SelectField.tsx    # Campo select principal
├── ErrorMessage.tsx   # Mensaje de error
├── LoadingSpinner.tsx # Indicador de carga
├── ClearButton.tsx    # Botón de limpieza
├── HookFormSelect.tsx # Componente principal
├── index.ts          # Exportaciones
├── SimpleDemo.tsx    # Demo simple
├── AdvancedDemo.tsx  # Demo avanzado
└── README.md         # Esta documentación
```

## 🐛 Solución de Problemas

### El select no muestra opciones
- Verifica que `options` o `groups` tengan datos válidos
- Revisa que el formato de los datos sea correcto

### Los estilos no se aplican
- Asegúrate de que Tailwind CSS esté configurado
- Verifica que las clases no estén siendo sobrescritas

### Las validaciones no funcionan
- Confirma que `register` esté configurado correctamente
- Verifica que `errors` se esté pasando al componente

## 📈 Rendimiento

- Memoización interna para evitar re-renders innecesarios
- Lazy loading de opciones grandes
- Optimizaciones de CSS para animaciones fluidas

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama de feature
3. Commits descriptivos
4. Tests actualizados
5. Pull request con descripción clara

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles. 