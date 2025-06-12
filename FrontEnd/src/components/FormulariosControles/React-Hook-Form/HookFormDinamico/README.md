# HookFormDinamico - Componente Refactorizado

## 📁 Estructura de Archivos

```
HookFormDinamico/
├── index.ts                 # Exportaciones principales
├── types.ts                 # Tipos e interfaces
├── HookFormDinamico.tsx     # Componente principal (simplificado)
├── TabNavigation.tsx        # Navegación de pestañas
├── FieldRenderer.tsx        # Renderizado de campos individuales
├── ActionButtons.tsx        # Botones para agregar campos
├── StatusInfo.tsx           # Información de estado
├── EmptyState.tsx           # Estado vacío
└── README.md               # Esta documentación
```

## 🎯 Beneficios de la Refactorización

### ✅ **Antes (Monolítico)**

- 1 archivo de 399 líneas
- Múltiples responsabilidades en un solo componente
- Difícil de mantener y testear
- Código duplicado y complejo

### ✅ **Después (Modular)**

- 7 archivos especializados
- Cada componente tiene una responsabilidad específica
- Fácil de mantener, testear y reutilizar
- Código limpio y organizado

## 🧩 Componentes

### 1. **HookFormDinamico.tsx** (Principal)

- **Responsabilidad**: Orquestación y lógica de negocio
- **Líneas**: ~120 (vs 399 original)
- **Funciones**: Manejo de fieldArrays, agregar/eliminar campos

### 2. **TabNavigation.tsx**

- **Responsabilidad**: Navegación entre pestañas
- **Props**: `pestañas`, `pestañaActiva`, `onTabChange`, `fieldArrays`
- **Características**: Muestra contador de campos por pestaña

### 3. **FieldRenderer.tsx**

- **Responsabilidad**: Renderizar cada campo individual
- **Props**: `campo`, `configuracion`, `index`, `basePath`, etc.
- **Tipos soportados**: input, textarea, select, checkbox

### 4. **ActionButtons.tsx**

- **Responsabilidad**: Botones para agregar nuevos campos
- **Props**: `tiposCamposPermitidos`, `cantidadActual`, `cantidadMaxima`
- **Características**: Deshabilitación automática al llegar al límite

### 5. **StatusInfo.tsx**

- **Responsabilidad**: Mostrar información de estado
- **Props**: `pestañaActiva`, `cantidadCampos`, `errors`
- **Características**: Indicadores de validación y errores

### 6. **EmptyState.tsx**

- **Responsabilidad**: Estado cuando no hay campos
- **Props**: `pestañaActiva`
- **Características**: Mensaje informativo

### 7. **types.ts**

- **Responsabilidad**: Definiciones de tipos centralizadas
- **Contenido**: Todas las interfaces y tipos del módulo

### 8. **helpers.ts**

- **Responsabilidad**: Funciones utilitarias para procesar datos
- **Funciones**: `procesarConfiguracionAPI`, `paresAObjeto`, `validarConfiguracionAPI`, etc.
- **Beneficio**: Reutilización de lógica de procesamiento

## 🚀 Uso

### Componente Básico

```tsx
import HookFormDinamico, {
  ConfiguracionCampoHook,
  FormularioTabData,
} from "./HookFormDinamico";

// Configuración de campos permitidos
const configuracionCampos: ConfiguracionCampoHook[] = [
  {
    tipo: "input",
    label: "Par Clave-Valor",
    tamaño: "12",
    required: true,
    requiredMessage: "La clave es requerida",
  },
];

// En tu componente
<HookFormDinamico
  pestañas={["Headers", "Query Params"]}
  tiposCamposPermitidos={configuracionCampos}
  cantidadMaximaCampos={20}
  basePath="configuracionAPI"
  control={control}
  register={register}
  errors={errors}
  watch={watch}
  setValue={setValue}
  getValues={getValues}
/>;
```

### Helpers para Procesar Datos

```tsx
import {
  procesarConfiguracionAPI,
  paresAObjeto,
  obtenerEstadisticasConfiguracion,
  validarConfiguracionAPI,
  obtenerSoloClaves,
} from "./HookFormDinamico";

// En tu función onSubmit
const onSubmit = (data) => {
  // 🚀 Procesar configuración completa
  const configuracion = procesarConfiguracionAPI(data.configuracionAPI);

  // 📊 Obtener estadísticas
  const stats = obtenerEstadisticasConfiguracion(data.configuracionAPI);

  // 🔄 Convertir a objetos (para APIs que esperan objetos)
  const headersObj = paresAObjeto(configuracion.headers);
  const queryParamsObj = paresAObjeto(configuracion.queryParams);

  // ✅ Validar campos requeridos
  const errores = validarConfiguracionAPI(data.configuracionAPI, {
    Headers: ["Authorization", "Content-Type"],
    "Query Params": ["api_key"],
  });

  // 🔑 Obtener solo las claves
  const soloHeaders = obtenerSoloClaves(data.configuracionAPI, "Headers");

  console.log("Configuración:", configuracion);
  console.log("Estadísticas:", stats);
  console.log("Headers como objeto:", headersObj);
  console.log("Errores de validación:", errores);
  console.log("Solo nombres de headers:", soloHeaders);
};
```

## 🛠️ Helpers Disponibles

### `procesarConfiguracionAPI(configuracionAPI, pestañasIncluidas?)`

Convierte los datos del formulario en pares clave-valor limpios.

- **Entrada**: Datos del formulario dinámico
- **Salida**: Objeto con `headers`, `queryParams`, `body`

### `paresAObjeto(pares)`

Convierte un array de pares clave-valor en un objeto JavaScript.

- **Entrada**: `[{nombre: 'key', valor: 'value'}]`
- **Salida**: `{key: 'value'}`

### `obtenerSoloClaves(configuracionAPI, pestaña)`

Extrae solo los nombres (claves) de una pestaña específica.

- **Entrada**: Datos del formulario y nombre de pestaña
- **Salida**: Array de strings con las claves

### `obtenerSoloValores(configuracionAPI, pestaña)`

Extrae solo los valores de una pestaña específica.

- **Entrada**: Datos del formulario y nombre de pestaña
- **Salida**: Array de strings con los valores

### `validarConfiguracionAPI(configuracionAPI, camposRequeridos)`

Valida que existan campos requeridos en la configuración.

- **Entrada**: Datos del formulario y campos requeridos por pestaña
- **Salida**: Objeto con errores de validación

### `obtenerEstadisticasConfiguracion(configuracionAPI)`

Obtiene estadísticas sobre la cantidad de campos por pestaña.

- **Entrada**: Datos del formulario
- **Salida**: Objeto con contadores por pestaña y total

## 🔧 Extensibilidad

### Agregar Nuevo Tipo de Campo

1. Actualizar `TipoCampoHook` en `types.ts`
2. Agregar caso en `FieldRenderer.tsx`
3. Listo! 🎉

### Agregar Nueva Funcionalidad

1. Crear nuevo componente en la carpeta
2. Exportar en `index.ts`
3. Usar en `HookFormDinamico.tsx`

## 🧪 Testing

Cada componente puede ser testeado independientemente:

```tsx
// Ejemplo: Test de TabNavigation
import { render, fireEvent } from "@testing-library/react";
import TabNavigation from "./TabNavigation";

test("cambia de pestaña al hacer click", () => {
  const mockOnTabChange = jest.fn();
  const { getByText } = render(
    <TabNavigation
      pestañas={["Headers", "Query Params"]}
      pestañaActiva="Headers"
      onTabChange={mockOnTabChange}
      fieldArrays={{}}
    />
  );

  fireEvent.click(getByText("Query Params"));
  expect(mockOnTabChange).toHaveBeenCalledWith("Query Params");
});
```

## 📈 Métricas de Mejora

| Métrica            | Antes    | Después | Mejora                             |
| ------------------ | -------- | ------- | ---------------------------------- |
| Líneas por archivo | 399      | ~50-120 | 70% reducción                      |
| Responsabilidades  | 6+       | 1       | Principio de responsabilidad única |
| Testabilidad       | Difícil  | Fácil   | Componentes aislados               |
| Reutilización      | Baja     | Alta    | Componentes independientes         |
| Mantenibilidad     | Compleja | Simple  | Código organizado                  |

## 🎉 Resultado

Un componente dinámico más:

- **Mantenible**: Cada archivo tiene una responsabilidad clara
- **Testeable**: Componentes pequeños e independientes
- **Reutilizable**: Componentes pueden usarse por separado
- **Escalable**: Fácil agregar nuevas funcionalidades
- **Legible**: Código organizado y bien documentado
