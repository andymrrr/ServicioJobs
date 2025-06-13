# HookFormPaginatedSelect

Un componente de select con búsqueda y paginación integrado con React Hook Form, siguiendo el mismo patrón que `HookFormInput`.

## 🚀 Características

- ✅ **Paginación automática** - Carga datos bajo demanda
- ✅ **Búsqueda con debounce** - Búsqueda en tiempo real optimizada
- ✅ **Integración React Hook Form** - Validaciones y manejo de estado
- ✅ **Tipado fuerte** - TypeScript completo
- ✅ **Responsive** - Adaptable a cualquier grid
- ✅ **Accesible** - Soporte para teclado y lectores de pantalla
- ✅ **Personalizable** - Mensajes, placeholders y comportamiento

## 📋 Uso Básico

```tsx
import { useForm } from 'react-hook-form';
import HookFormPaginatedSelect from '@/components/FormulariosControles/HookFormPaginatedSelect';

interface FormData {
  userId: string;
}

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Función para obtener datos de la API
  const fetchUsers = async (searchTerm?: string, page = 1, limit = 20) => {
    const response = await fetch(`/api/users?search=${searchTerm}&page=${page}&limit=${limit}`);
    return await response.json();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
      <HookFormPaginatedSelect
        name="userId"
        label="Seleccionar Usuario"
        register={register}
        errors={errors}
        fetchData={fetchUsers}
        required="Este campo es requerido"
        colSpan="6"
      />
    </form>
  );
};
```

## 🔧 Props Principales

| Prop | Tipo | Descripción |
|------|------|-------------|
| `fetchData` | `FetchDataFunction` | **Requerido** - Función para obtener datos de la API |
| `transformData?` | `TransformDataFunction` | Función para transformar datos de la API |
| `searchPlaceholder?` | `string` | Placeholder del campo de búsqueda |
| `itemsPerPage?` | `number` | Elementos por página (default: 20) |
| `minSearchLength?` | `number` | Mínimo de caracteres para buscar (default: 0) |
| `debounceDelay?` | `number` | Delay para debounce en ms (default: 300) |

## 📡 Estructura de Respuesta API

Tu API debe devolver datos en este formato:

```typescript
interface PaginatedResponse {
  data: any[]; // Tus datos
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
```

## 🔄 Transformación de Datos

Si tus datos no tienen `value` y `label`, usa `transformData`:

```tsx
const transformUser = (user: User) => ({
  value: user.id,
  label: `${user.firstName} ${user.lastName}`,
  email: user.email // Datos extra se mantienen
});

<HookFormPaginatedSelect
  fetchData={fetchUsers}
  transformData={transformUser}
  // ... otras props
/>
```

## 🎨 Personalización

```tsx
<HookFormPaginatedSelect
  // Mensajes personalizados
  noOptionsMessage="No se encontraron usuarios"
  loadingMessage="Cargando usuarios..."
  searchingMessage="Buscando..."
  
  // Placeholders
  placeholder="Elegir usuario..."
  searchPlaceholder="Buscar por nombre..."
  
  // Comportamiento
  allowClear={true}
  showSearch={true}
  minSearchLength={2}
  debounceDelay={500}
  
  // Grid
  colSpan="8"
  
  // Validación
  required="Debe seleccionar un usuario"
  tooltipMessage="Selecciona el usuario responsable"
/>
```

## 🔗 Ejemplo Completo con API Real

```tsx
import { useForm } from 'react-hook-form';
import HookFormPaginatedSelect from './HookFormPaginatedSelect';
import { Api } from '@/Nucleo/api/configuracion';

interface CreateJobForm {
  responsableId: string;
  clienteId: string;
}

const CreateJobForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateJobForm>();

  // API para usuarios
  const fetchUsuarios = async (searchTerm = '', page = 1, limit = 20) => {
    const response = await Api.get('/usuarios', {
      params: { search: searchTerm, page, limit }
    });
    return response.data;
  };

  // API para clientes  
  const fetchClientes = async (searchTerm = '', page = 1, limit = 20) => {
    const response = await Api.get('/clientes', {
      params: { search: searchTerm, page, limit }
    });
    return response.data;
  };

  // Transformador para usuarios
  const transformUsuario = (usuario: any) => ({
    value: usuario.id,
    label: `${usuario.nombre} ${usuario.apellido}`,
    email: usuario.email
  });

  const onSubmit = (data: CreateJobForm) => {
    console.log('Job data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
      <HookFormPaginatedSelect
        name="responsableId"
        label="Responsable"
        register={register}
        errors={errors}
        fetchData={fetchUsuarios}
        transformData={transformUsuario}
        required="Debe seleccionar un responsable"
        searchPlaceholder="Buscar usuario..."
        tooltipMessage="Usuario responsable del job"
        colSpan="6"
      />

      <HookFormPaginatedSelect
        name="clienteId"
        label="Cliente"
        register={register}
        errors={errors}
        fetchData={fetchClientes}
        required="Debe seleccionar un cliente"
        searchPlaceholder="Buscar cliente..."
        colSpan="6"
      />

      <button type="submit" className="col-span-12 btn btn-primary">
        Crear Job
      </button>
    </form>
  );
};
```

## 📚 Utilidades Incluidas

```tsx
import { 
  defaultTransformData,
  validateApiResponse,
  filterOptions,
  findOptionByValue
} from './HookFormPaginatedSelect';

// Transformación automática para APIs comunes
const options = data.map(defaultTransformData);

// Validar estructura de respuesta
if (validateApiResponse(response)) {
  // Procesar datos
}

// Filtrar opciones localmente
const filtered = filterOptions(options, 'búsqueda');

// Encontrar opción por valor
const option = findOptionByValue(options, 'valor-a-buscar');
```

## 🎯 Casos de Uso Perfectos

1. **Selección de usuarios** con muchos registros
2. **Catálogos grandes** (países, ciudades, productos)
3. **Referencias a entidades** en formularios
4. **Búsquedas complejas** con filtros del backend
5. **Formularios dinámicos** con datos de APIs externas 