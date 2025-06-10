# Guía: Manejo de DateTime con PostgreSQL

## ❌ **Problema**
```
Cannot write DateTime with Kind=Unspecified to PostgreSQL type 'timestamp with time zone', only UTC is supported.
```

## ✅ **Solución Implementada**

### 1. **Configuración Manual Directa**
Se configuró Entity Framework con ValueConverters en `OnModelCreating` para manejar DateTime de forma manual y controlada.

### 2. **Reglas a Seguir**

#### ✅ **Hacer**
```csharp
// Usar siempre el FechaHelper (método principal)
var fechaActual = FechaHelper.AhoraUtc;

// Convertir fechas problemáticas
entidad.Fecha = FechaHelper.ConvertirAUtcSeguro(fechaProblematica);

// Crear fechas específicas
var fecha = FechaHelper.CrearFechaUtc(2024, 1, 1, 12, 0, 0);
```

#### ❌ **No Hacer**
```csharp
// No usar DateTime.Now directamente
var fechaActual = DateTime.Now; // ❌

// No asignar fechas sin especificar Kind
entidad.Fecha = new DateTime(2024, 1, 1); // ❌
```

### 3. **Métodos Disponibles**

#### FechaHelper (Método Principal):
```csharp
// Obtener fecha actual (usar SIEMPRE esto)
DateTime ahora = FechaHelper.AhoraUtc;

// Convertir fechas problemáticas
DateTime fechaSegura = FechaHelper.ConvertirAUtcSeguro(fechaProblematica);
DateTime? fechaSeguraNullable = FechaHelper.ConvertirAUtcSeguro(fechaNullable);

// Crear fechas específicas
DateTime fecha = FechaHelper.CrearFechaUtc(2024, 1, 1);

// Convertir para mostrar al usuario
DateTime local = FechaHelper.ConvertirALocal(fechaUtc);
```

### 4. **Configuración del Contexto**
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Configuración automática de ValueConverters para DateTime
    ConfigurarDateTimeParaPostgreSQL(modelBuilder);
}
```

## 🔧 **Archivos Corregidos**

- ✅ `RepositorioProgramado.cs` - DateTime.Now → DateTime.UtcNow
- ✅ `JobScheduleService.cs` - DateTimeOffset.Now → DateTimeOffset.UtcNow
- ✅ `EjecutarJobProgramadoValidator.cs` - DateTime.Now → DateTime.UtcNow
- ✅ `AgregarJobProgramadoValidator.cs` - TimeZoneInfo.Local → TimeZoneInfo.Utc

## 🚀 **Mejores Prácticas**

### Para Fechas de Base de Datos:
1. **Siempre usar `DateTime.UtcNow`** para fechas actuales
2. **Convertir fechas externas** con `AsegurarUtc()`
3. **Usar TimeZoneInfo.Utc** para cálculos de zona horaria

### Para Mostrar al Usuario:
1. **Convertir a local** con `ConvertirALocal()` 
2. **Formatear apropiadamente** según la zona horaria del usuario
3. **Documentar** que la base de datos almacena en UTC

### Para Pruebas:
```csharp
// En pruebas, usar fechas UTC explícitas
var fecha = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);

// O usar el helper
var fecha = DateTimeExtensions.AhoraUtc();
```

## 🛡️ **Validación**

Los ValueConverters manejan automáticamente:
- ✅ DateTimeKind.Unspecified → UTC 
- ✅ DateTimeKind.Local → UTC
- ✅ DateTimeKind.Utc → Sin cambios
- ✅ DateTime y DateTime? automáticamente
- ✅ Solo al guardar/leer de base de datos

## 📝 **Notas Importantes**

1. **PostgreSQL siempre almacena en UTC** - no importa la zona horaria del servidor
2. **Los ValueConverters se ejecutan automáticamente** - al guardar/leer BD
3. **Usar FechaHelper.AhoraUtc** - para todas las fechas actuales
4. **Para APIs públicas** - documenta que las fechas están en UTC
5. **Para reportes** - usar FechaHelper.ConvertirALocal()

## 🔍 **Debugging**

Si aún tienes problemas:
```csharp
// Verificar el Kind de una fecha
Console.WriteLine($"DateTime Kind: {fecha.Kind}");

// Forzar UTC si es necesario
var fechaUtc = DateTime.SpecifyKind(fecha, DateTimeKind.Utc);
``` 