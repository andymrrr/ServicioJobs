# MenuConfig - Iconos Opcionales en Links

## Uso de Iconos en Links de Accordions

Los links en los accordions del menú lateral ahora soportan iconos opcionales.

### Interfaz MenuLink Actualizada

```typescript
export interface MenuLink {
  to: string;
  label: string;
  icon?: React.ElementType; // ⭐ Icono opcional
}
```

### Ejemplos de Uso

#### 1. Links con Iconos

```typescript
{
  id: "forms",
  icon: FaWpforms,
  label: "Forms",
  type: "accordion",
  links: [
    { to: "/forms/form-elements", label: "Form Elements", icon: FaEdit },
    { to: "/forms/form-layout", label: "Form Layout", icon: FaLayerGroup },
    { to: "/forms/form-step-by-step", label: "Step by Step", icon: FaStepForward },
    { to: "/forms/dynamic-form", label: "Dynamic Fields", icon: FaPlus },
    { to: "/forms/dynamic-form-hook", label: "Dynamic Hook Form", icon: FaCode },
  ],
}
```

#### 2. Links sin Iconos (Compatibilidad hacia atrás)

```typescript
{
  id: "other-section",
  icon: FaCube,
  label: "Other Section",
  type: "accordion",
  links: [
    { to: "/other/page1", label: "Page 1" }, // Sin icono
    { to: "/other/page2", label: "Page 2" }, // Sin icono
    { to: "/other/page3", label: "Page 3", icon: FaStar }, // Con icono
  ],
}
```

#### 3. Mezcla de Links con y sin Iconos

```typescript
{
  id: "mixed-example",
  icon: FaCog,
  label: "Mixed Example",
  type: "accordion",
  links: [
    { to: "/mixed/config", label: "Configuration", icon: FaCog },
    { to: "/mixed/settings", label: "Settings" }, // Sin icono
    { to: "/mixed/advanced", label: "Advanced", icon: FaCode },
    { to: "/mixed/help", label: "Help" }, // Sin icono
  ],
}
```

### Iconos Disponibles

Los iconos se importan de `react-icons/fa`:

```typescript
import {
  FaEdit, // ✏️ Editar/Formularios
  FaLayerGroup, // 📋 Layouts/Capas
  FaStepForward, // ➡️ Pasos/Wizard
  FaPlus, // ➕ Agregar/Dinámico
  FaCode, // 💻 Código/Hook Form
  FaExclamationTriangle, // ⚠️ Alertas
  FaPlay, // ▶️ Botones/Acciones
  FaKey, // 🔑 Login/Autenticación
  FaUserPlus, // 👤+ Registro
  // ... más iconos según necesidad
} from "react-icons/fa";
```

### Características

✅ **Retrocompatible**: Los links existentes sin iconos siguen funcionando
✅ **Opcional**: Cada link puede decidir si usar icono o no
✅ **Flexible**: Cualquier icono de react-icons/fa
✅ **Consistente**: Mismo tamaño y estilo (h-4 w-4, opacity-75)
✅ **Responsive**: Se adapta al tema claro/oscuro

### Estilo de los Iconos

Los iconos en los links tienen las siguientes características:

- **Tamaño**: 16x16px (h-4 w-4)
- **Opacidad**: 75% para mejor legibilidad
- **Color**: Hereda el color del texto del link
- **Posición**: A la izquierda del texto con gap de 2.5
