# Collapsible - Componente Desplegable Genérico

Un componente desplegable altamente personalizable y reutilizable para React con TypeScript.

## 🚀 Características

- ✅ **Totalmente tipado** con TypeScript
- 🎨 **Múltiples variantes** de diseño
- 🌈 **Colores personalizables**
- 📱 **Responsive** y accesible
- 🌙 **Soporte para modo oscuro**
- ⚡ **Animaciones suaves**
- 🔧 **Altamente configurable**
- 🎯 **Callbacks** para eventos

## 📦 Instalación

```tsx
import Collapsible from "../components/UI/Collapsible";
// o
import { Collapsible } from "../components/UI/Collapsible";
```

## 🎯 Uso Básico

```tsx
<Collapsible title="Configuración Básica">
  <p>Este es el contenido que se puede expandir y contraer.</p>
</Collapsible>
```

## 🎨 Variantes

### Default (Degradado)

```tsx
<Collapsible
  title="Configuración Avanzada"
  subtitle="Opciones adicionales"
  variant="default"
  headerColor="blue"
  icon="⚙️"
>
  <div>Contenido de configuración avanzada</div>
</Collapsible>
```

### Card (Tarjeta)

```tsx
<Collapsible title="Información del Usuario" variant="card" icon="👤">
  <div>Detalles del perfil de usuario</div>
</Collapsible>
```

### Minimal (Minimalista)

```tsx
<Collapsible title="FAQ" variant="minimal" expandIcon="plus">
  <div>Respuesta a la pregunta frecuente</div>
</Collapsible>
```

### Bordered (Con Borde)

```tsx
<Collapsible
  title="Términos y Condiciones"
  variant="bordered"
  headerColor="red"
>
  <div>Texto legal...</div>
</Collapsible>
```

## 🌈 Colores Disponibles

```tsx
// Colores para el header
<Collapsible headerColor="blue" title="Azul" />
<Collapsible headerColor="green" title="Verde" />
<Collapsible headerColor="purple" title="Púrpura" />
<Collapsible headerColor="orange" title="Naranja" />
<Collapsible headerColor="red" title="Rojo" />
<Collapsible headerColor="gray" title="Gris (default)" />
```

## 📏 Tamaños

```tsx
<Collapsible size="sm" title="Pequeño" />
<Collapsible size="md" title="Mediano (default)" />
<Collapsible size="lg" title="Grande" />
```

## 🔧 Iconos de Expansión

```tsx
<Collapsible expandIcon="arrow" title="Flecha (default)" />
<Collapsible expandIcon="plus" title="Plus/Cruz" />
<Collapsible expandIcon="chevron" title="Chevron" />
```

## ⚡ Ejemplos Avanzados

### Con Estado Controlado

```tsx
const [isOpen, setIsOpen] = useState(false);

<Collapsible
  title="Controlado Externamente"
  defaultOpen={isOpen}
  onToggle={(open) => {
    setIsOpen(open);
    console.log("Estado cambiado:", open);
  }}
>
  <div>Contenido controlado</div>
</Collapsible>;
```

### Con Icono Personalizado

```tsx
<Collapsible
  title="Con Icono Custom"
  icon={<CustomIcon />}
  headerColor="purple"
>
  <div>Contenido con icono personalizado</div>
</Collapsible>
```

### Deshabilitado

```tsx
<Collapsible
  title="Sección Deshabilitada"
  disabled={true}
  subtitle="No se puede expandir"
>
  <div>Este contenido no se puede ver</div>
</Collapsible>
```

### Sin Animaciones

```tsx
<Collapsible title="Sin Animaciones" animated={false}>
  <div>Aparece/desaparece instantáneamente</div>
</Collapsible>
```

## 📋 Props Completas

| Prop               | Tipo                                                           | Default     | Descripción                                |
| ------------------ | -------------------------------------------------------------- | ----------- | ------------------------------------------ |
| `title`            | `string`                                                       | -           | **Requerido.** Título del header           |
| `subtitle`         | `string`                                                       | -           | Subtítulo opcional                         |
| `children`         | `ReactNode`                                                    | -           | **Requerido.** Contenido a mostrar/ocultar |
| `defaultOpen`      | `boolean`                                                      | `false`     | Estado inicial (abierto/cerrado)           |
| `variant`          | `'default' \| 'card' \| 'minimal' \| 'bordered'`               | `'default'` | Estilo visual                              |
| `size`             | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Tamaño del componente                      |
| `headerColor`      | `'gray' \| 'blue' \| 'green' \| 'purple' \| 'orange' \| 'red'` | `'gray'`    | Color del header                           |
| `icon`             | `string \| ReactNode`                                          | -           | Icono del header                           |
| `expandIcon`       | `'arrow' \| 'plus' \| 'chevron'`                               | `'arrow'`   | Tipo de icono de expansión                 |
| `disabled`         | `boolean`                                                      | `false`     | Deshabilitar interacción                   |
| `animated`         | `boolean`                                                      | `true`      | Habilitar animaciones                      |
| `onToggle`         | `(isOpen: boolean) => void`                                    | -           | Callback al cambiar estado                 |
| `className`        | `string`                                                       | `''`        | Clases CSS adicionales                     |
| `headerClassName`  | `string`                                                       | `''`        | Clases CSS para el header                  |
| `contentClassName` | `string`                                                       | `''`        | Clases CSS para el contenido               |

## 🎨 Casos de Uso Comunes

### FAQ Section

```tsx
const faqs = [
  { q: "¿Cómo funciona?", a: "Explicación detallada..." },
  { q: "¿Es gratis?", a: "Información sobre precios..." },
];

{
  faqs.map((faq, index) => (
    <Collapsible key={index} title={faq.q} variant="minimal" expandIcon="plus">
      <p>{faq.a}</p>
    </Collapsible>
  ));
}
```

### Configuración de Formulario

```tsx
<Collapsible
  title="Configuración Avanzada"
  subtitle="Opciones adicionales para usuarios expertos"
  variant="default"
  headerColor="blue"
  icon="⚙️"
  defaultOpen={false}
>
  <div className="grid grid-cols-2 gap-4">
    <input placeholder="Timeout" />
    <input placeholder="Reintentos" />
  </div>
</Collapsible>
```

### Panel de Información

```tsx
<Collapsible
  title="Detalles del Pedido #12345"
  variant="card"
  icon="📦"
  headerColor="green"
>
  <div className="space-y-2">
    <p>
      <strong>Cliente:</strong> Juan Pérez
    </p>
    <p>
      <strong>Fecha:</strong> 2024-01-15
    </p>
    <p>
      <strong>Total:</strong> $299.99
    </p>
  </div>
</Collapsible>
```

## 🎉 Beneficios

✅ **Reutilizable**: Un componente para múltiples casos de uso  
✅ **Consistente**: Diseño uniforme en toda la aplicación  
✅ **Accesible**: Soporte para teclado y lectores de pantalla  
✅ **Performante**: Renderizado condicional eficiente  
✅ **Mantenible**: Código limpio y bien documentado

## 🔄 Migración desde Implementación Manual

**Antes:**

```tsx
const [isOpen, setIsOpen] = useState(false);

<div className="border rounded-lg">
  <button onClick={() => setIsOpen(!isOpen)}>
    Configuración Avanzada {isOpen ? "▼" : "▶"}
  </button>
  {isOpen && <div>Contenido...</div>}
</div>;
```

**Después:**

```tsx
<Collapsible title="Configuración Avanzada">
  <div>Contenido...</div>
</Collapsible>
```

¡Mucho más limpio y con más funcionalidades! 🎉
