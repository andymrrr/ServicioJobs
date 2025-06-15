# 🔍 Sistema de Debug y Desarrollo

Este directorio contiene herramientas de desarrollo y debug para la aplicación.

## 📁 Estructura

```
src/pages/Dev/
├── DebugDashboard/          # Dashboard principal de debug
│   ├── DebugDashboard.tsx   # Componente principal
│   └── index.ts             # Exportaciones
├── Logs/                    # Página de logs simplificada
│   ├── LogsPage.tsx         # Vista de logs en tiempo real
│   └── index.ts             # Exportaciones
└── README.md                # Esta documentación
```

## 🎯 Características

### **Debug Dashboard** (`/dev/debug-dashboard`)

Dashboard completo con:

- 📊 **Estadísticas en tiempo real**: Total de logs, errores, warnings, categorías
- 🔍 **Filtros avanzados**: Por categoría, nivel, texto libre
- 📤 **Exportación**: Descarga logs en formato JSON
- 🧪 **Datos de prueba**: Generadores para testing
- 📋 **Vista detallada**: Inspección completa de logs individuales
- 📈 **Distribución visual**: Gráficos por nivel de log

### **Logs Page** (`/dev/logs`)

Vista simplificada estilo terminal:

- 🖥️ **Interfaz tipo consola**: Fondo negro con texto verde
- ⚡ **Tiempo real**: Actualización automática cada segundo
- 🎯 **Filtros básicos**: Por nivel de log
- 🧹 **Controles simples**: Actualizar y limpiar

## 🧪 Generadores de Datos de Prueba

### **Logs Aleatorios** 🎲

Genera 10 logs con categorías y niveles aleatorios para testing general.

### **Errores de Prueba** 🔥

Crea una secuencia de errores típicos:

- Errores de conexión
- Tokens expirados
- Validaciones fallidas
- Errores de servidor

### **Logs de Éxito** ✅

Genera logs de operaciones exitosas:

- Jobs creados
- Autenticaciones correctas
- Sincronizaciones completadas

### **Simular Flujo** 🔄

Simula un flujo completo de formulario:

1. Inicialización
2. Validación
3. Envío al servidor
4. Respuesta exitosa

## 🎛️ Configuración

### **Visibilidad**

Las páginas de desarrollo solo aparecen en modo desarrollo:

```typescript
// Solo visible cuando import.meta.env?.DEV === true
...(import.meta.env?.DEV ? [devMenuSection] : [])
```

### **Auto-refresh**

- Dashboard: Cada 2 segundos
- Logs Page: Cada 1 segundo

### **Límites**

- Dashboard: Todos los logs disponibles
- Logs Page: Últimos 50 logs

## 🔗 Navegación

### **Menú Lateral**

```
DESARROLLO
├── 🔍 Debug Dashboard    → /dev/debug-dashboard
└── 🛠️ Herramientas Dev
    ├── 🔍 Debug Dashboard → /dev/debug-dashboard
    └── 🐛 Logs del Sistema → /dev/logs
```

### **Rutas**

- `/dev/debug-dashboard` - Dashboard completo
- `/dev/logs` - Vista de logs simplificada

## 🎨 Interfaz

### **Colores por Nivel**

- 🔍 **INFO**: Azul (`text-blue-600`)
- ⚠️ **WARNING**: Naranja (`text-orange-600`)
- ❌ **ERROR**: Rojo (`text-red-600`)
- ✅ **SUCCESS**: Verde (`text-green-600`)

### **Componentes**

- **Tarjeta**: Contenedor principal
- **Contenedor**: Layout responsive
- **Filtros**: Dropdowns y inputs
- **Botones**: Acciones y generadores

## 🔧 Uso

### **Para Desarrolladores**

1. Navegar a `/dev/debug-dashboard`
2. Usar generadores para crear datos de prueba
3. Filtrar y buscar logs específicos
4. Exportar logs para análisis

### **Para Testing**

1. Generar datos de prueba con los botones
2. Verificar que los logs se muestran correctamente
3. Probar filtros y búsquedas
4. Validar exportación de datos

### **Para Debugging**

1. Reproducir el error en la aplicación
2. Ir al dashboard de debug
3. Filtrar por categoría o nivel ERROR
4. Inspeccionar detalles del log problemático
5. Exportar logs si es necesario

## 🚀 Extensiones Futuras

- 📊 Gráficos de tendencias temporales
- 🔔 Alertas en tiempo real
- 📱 Notificaciones push
- 🔄 Integración con herramientas externas
- 📈 Métricas de performance
- 🎯 Filtros avanzados por fecha/hora
