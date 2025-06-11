# 📊 TablaPaginada - Ejemplos de Uso

## 🚀 Funcionalidades Nuevas

### **Posiciones Disponibles para Botones**
- `arriba-izquierda`: Esquina superior izquierda
- `arriba-centro`: Centro de la parte superior  
- `arriba-derecha`: Esquina superior derecha
- `abajo-izquierda`: Esquina inferior izquierda
- `abajo-centro`: Centro de la parte inferior
- `abajo-derecha`: Esquina inferior derecha

## 💡 Ejemplos de Uso

### **1. Ejemplo Básico con Botones**
```tsx
import { Button } from 'antd';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';

const botones = [
  {
    posicion: 'arriba-izquierda' as const,
    contenido: (
      <Button type="primary" icon={<PlusOutlined />}>
        Agregar
      </Button>
    ),
  },
  {
    posicion: 'arriba-derecha' as const,
    contenido: (
      <Button icon={<DownloadOutlined />}>
        Exportar
      </Button>
    ),
  },
];

<TablaPaginada
  datos={datos}
  columnas={columnas}
  botones={botones}
  // ... otras props
/>
```

### **2. Ejemplo con Título y Múltiples Botones**
```tsx
const botonesCompletos = [
  {
    posicion: 'arriba-izquierda' as const,
    contenido: (
      <Button.Group>
        <Button type="primary" icon={<PlusOutlined />}>Agregar</Button>
        <Button icon={<EditOutlined />}>Editar Masivo</Button>
      </Button.Group>
    ),
  },
  {
    posicion: 'arriba-derecha' as const,
    contenido: (
      <Space>
        <Button icon={<ReloadOutlined />} loading={isLoading}>
          Refrescar
        </Button>
        <Button icon={<DownloadOutlined />}>Exportar</Button>
        <Button icon={<SettingOutlined />}>Configurar</Button>
      </Space>
    ),
  },
  {
    posicion: 'abajo-centro' as const,
    contenido: (
      <Button type="link" size="small">
        Ver estadísticas detalladas
      </Button>
    ),
  },
];

<TablaPaginada
  datos={datos}
  columnas={columnas}
  botones={botonesCompletos}
  tituloTabla="Gestión de Usuarios"
  subtituloTabla="Lista completa de usuarios del sistema"
  espaciadoBotones="middle"
/>
```

### **3. Ejemplo con Clases Personalizadas**
```tsx
<TablaPaginada
  datos={datos}
  columnas={columnas}
  botones={botones}
  tituloTabla="Mi Tabla"
  clasesPersonalizadas={{
    contenedor: 'bg-gradient-to-r from-blue-50 to-white',
    header: 'border-b-2 border-blue-200 pb-4',
    footer: 'border-t-2 border-blue-200 pt-4 bg-blue-50',
    tabla: 'shadow-lg'
  }}
/>
```

### **4. Ejemplo con Componentes Avanzados**
```tsx
const botonesAvanzados = [
  {
    posicion: 'arriba-izquierda' as const,
    contenido: (
      <Dropdown menu={{ items: menuItems }}>
        <Button>
          Acciones <DownOutlined />
        </Button>
      </Dropdown>
    ),
  },
  {
    posicion: 'arriba-derecha' as const,
    contenido: (
      <Input.Search
        placeholder="Búsqueda rápida"
        onSearch={onBuscarRapido}
        style={{ width: 200 }}
      />
    ),
  },
  {
    posicion: 'abajo-izquierda' as const,
    contenido: (
      <Tag color="blue">
        {selectedRows.length} elementos seleccionados
      </Tag>
    ),
  },
];
```

### **5. Ejemplo Minimalista**
```tsx
// Solo botón de agregar
const botonSimple = [
  {
    posicion: 'arriba-derecha' as const,
    contenido: <Button type="primary">Agregar</Button>,
  },
];

<TablaPaginada
  datos={datos}
  columnas={columnas}
  botones={botonSimple}
/>
```

## 🎨 Props Disponibles

### **Propiedades Básicas** (mantienen compatibilidad)
- `datos`: Array de datos
- `columnas`: Configuración de columnas
- `total`: Total de registros
- `paginaActual`: Página actual
- `tamanioPagina`: Tamaño de página
- `onPageChange`: Callback de cambio de página
- `opcionesTamanioPagina`: Opciones de tamaño
- `claveFila`: Clave única para las filas
- `acciones`: Función para generar columna de acciones

### **Nuevas Propiedades**
- `botones`: Array de configuración de botones
- `mostrarHeader`: Mostrar/ocultar header personalizado
- `tituloTabla`: Título principal de la tabla
- `subtituloTabla`: Subtítulo descriptivo
- `espaciadoBotones`: Espaciado entre botones ('small' | 'middle' | 'large')
- `clasesPersonalizadas`: Objeto con clases CSS personalizadas

## 🔧 Tipos TypeScript

```tsx
type PosicionBoton = 
  | 'arriba-izquierda' 
  | 'arriba-derecha' 
  | 'abajo-izquierda' 
  | 'abajo-derecha' 
  | 'arriba-centro' 
  | 'abajo-centro';

interface ConfiguracionBoton {
  posicion: PosicionBoton;
  contenido: ReactNode;
  key?: string;
}
```

## 📱 Layout Responsivo

La tabla mantiene su comportamiento responsivo y los botones se adaptan automáticamente:

- **Desktop**: Todos los botones se muestran en sus posiciones definidas
- **Mobile**: Los botones se reorganizan verticalmente cuando es necesario
- **Flexbox**: Uso inteligente de Flexbox para distribución uniforme

## ⚡ Rendimiento

- **Lazy Rendering**: Los componentes de botones solo se renderizan si tienen contenido
- **Memoización**: Uso de `React.memo` en componentes internos (recomendado)
- **Keys Optimizadas**: Sistema de keys automático para evitar re-renders innecesarios

## 🧪 Testing

```tsx
// Ejemplo de test unitario
import { render, screen } from '@testing-library/react';

const botonesPrueba = [
  {
    posicion: 'arriba-izquierda' as const,
    contenido: <Button data-testid="boton-agregar">Agregar</Button>,
  },
];

test('renderiza botones en la posición correcta', () => {
  render(
    <TablaPaginada
      datos={datosPrueba}
      columnas={columnasPrueba}
      botones={botonesPrueba}
    />
  );
  
  expect(screen.getByTestId('boton-agregar')).toBeInTheDocument();
});
``` 