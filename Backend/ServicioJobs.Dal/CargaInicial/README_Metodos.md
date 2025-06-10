# Sistema de Carga Inicial de Métodos HTTP

## Descripción
Este sistema permite cargar métodos HTTP iniciales en la base de datos de manera automática durante la inicialización de la aplicación. Los métodos HTTP son utilizados por los jobs programados para realizar llamadas a APIs y servicios web.

## Archivos Principales

### 1. `Metodos.json`
Archivo JSON que contiene los métodos HTTP que se cargarán automáticamente:

```json
[
  {
    "IdMetodo": "550e8400-e29b-41d4-a716-446655440001",
    "Nombre": "GET"
  },
  {
    "IdMetodo": "550e8400-e29b-41d4-a716-446655440002",
    "Nombre": "POST"
  },
  {
    "IdMetodo": "550e8400-e29b-41d4-a716-446655440003",
    "Nombre": "PUT"
  }
]
```

### 2. `MetodosSeeder.cs`
Clase estática que maneja toda la lógica de carga inicial con los siguientes métodos:

#### Métodos Principales:

- **`SembrarMetodosAsync()`**: Carga los métodos HTTP desde el archivo JSON
- **`AgregarMetodoSiNoExisteAsync()`**: Agrega un método HTTP si no existe
- **`ObtenerTodosLosMetodosAsync()`**: Obtiene todos los métodos HTTP
- **`ExisteMetodoAsync()`**: Verifica si un método HTTP existe por ID
- **`ObtenerMetodoPorNombreAsync()`**: Obtiene un método por nombre HTTP (GET, POST, etc.)
- **`CrearMetodosHttpPredeterminados()`**: Crea métodos HTTP programáticamente

## Métodos HTTP Predeterminados Incluidos

1. **GET** - Para obtener datos de APIs (consultas, lectura)
2. **POST** - Para crear nuevos recursos (insertar datos)
3. **PUT** - Para actualizar recursos existentes (modificación completa)
4. **DELETE** - Para eliminar recursos (borrado de datos)
5. **PATCH** - Para actualizaciones parciales de recursos
6. **HEAD** - Para obtener solo headers sin contenido (verificaciones)
7. **OPTIONS** - Para verificar métodos permitidos (CORS, preflight)

## Uso en el Código

### Ejemplo 1: Verificar si existe un método
```csharp
var existe = await MetodosSeeder.ExisteMetodoAsync(context, idMetodo);
if (!existe)
{
    // Lógica si no existe
}
```

### Ejemplo 2: Agregar un nuevo método HTTP
```csharp
var nuevoMetodo = await MetodosSeeder.AgregarMetodoSiNoExisteAsync(context, "CONNECT");
```

### Ejemplo 3: Obtener todos los métodos HTTP
```csharp
var todosLosMetodos = await MetodosSeeder.ObtenerTodosLosMetodosAsync(context);
```

### Ejemplo 4: Buscar método por nombre HTTP
```csharp
var metodoGet = await MetodosSeeder.ObtenerMetodoPorNombreAsync(context, "GET");
var metodoPost = await MetodosSeeder.ObtenerMetodoPorNombreAsync(context, "post"); // Case insensitive
```

## Integración con el Sistema

La carga inicial se ejecuta automáticamente en `ContextServiciosJobDatos.CargardatosAsincronos()` durante la inicialización de la aplicación.

## Personalización

Para agregar nuevos métodos HTTP:

1. **Opción 1**: Editar el archivo `Metodos.json`
2. **Opción 2**: Usar `AgregarMetodoSiNoExisteAsync()` programáticamente
3. **Opción 3**: Modificar `CrearMetodosHttpPredeterminados()` para métodos hardcodeados

### Métodos HTTP Adicionales Disponibles:
- **CONNECT** - Para conexiones de túnel (proxies)
- **TRACE** - Para diagnóstico de conexiones
- **COPY** - Para copiar recursos (WebDAV)
- **MOVE** - Para mover recursos (WebDAV)

## Logs y Monitoreo

El sistema incluye logging completo:
- ✅ Información cuando se cargan métodos HTTP correctamente
- ⚠️ Advertencias si el archivo está vacío
- ❌ Errores si no se encuentra el archivo o hay problemas de carga

## Consideraciones de Seguridad

- Los IDs de métodos HTTP son GUID fijos para mantener consistencia
- Los nombres HTTP se comparan sin distinción de mayúsculas/minúsculas
- Se valida la existencia antes de insertar para evitar duplicados
- Los métodos corresponden con los estándares HTTP RFC 7231

## Integración con Jobs Programados

Los métodos HTTP se utilizan en combinación con:
- **Tabla `Programado`**: Contiene el `IdMetodo` que referencia estos métodos
- **Enum `MetodoHttp`**: Define los tipos HTTP disponibles (GET=1, POST=2, PUT=3, DELETE=4, PATCH=5)
- **JobHttpService**: Ejecuta las llamadas HTTP según el método seleccionado 