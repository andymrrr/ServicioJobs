# Ejemplos de Uso - Job Programado

## Endpoint: POST /api/Programados/AgregarJobProgramado

### Ejemplo 1: Job Básico (GET sin parámetros)
```json
{
  "idMetodo": "12345678-1234-1234-1234-123456789012",
  "nombre": "Sincronización Diaria",
  "descripcion": "Sincroniza datos de usuarios diariamente",
  "url": "https://mi-api.com/sync/usuarios",
  "jobParametro": [],
  "crontab": "0 2 * * *",
  "correoNotificar": "admin@empresa.com",
  "reintentosPermitidos": 3,
  "periodoReintento": 30,
  "timeout": 300,
  "metodoHttp": 1
}
```

### Ejemplo 2: Job con Parámetros Query (GET)
```json
{
  "idMetodo": "12345678-1234-1234-1234-123456789012",
  "nombre": "Reporte Semanal",
  "descripcion": "Genera reporte semanal de ventas",
  "url": "https://mi-api.com/reportes/ventas",
  "jobParametro": [
    {
      "propiedad": "fecha_inicio",
      "valor": "2024-01-01",
      "tipo": 1
    },
    {
      "propiedad": "formato",
      "valor": "json",
      "tipo": 1
    }
  ],
  "crontab": "0 9 * * 1",
  "correoNotificar": "reportes@empresa.com",
  "reintentosPermitidos": 2,
  "periodoReintento": 60,
  "timeout": 600,
  "metodoHttp": 1
}
```

### Ejemplo 3: Job POST con Headers
```json
{
  "idMetodo": "12345678-1234-1234-1234-123456789012",
  "nombre": "Envío de Notificaciones",
  "descripcion": "Envía notificaciones push a usuarios",
  "url": "https://mi-api.com/notifications/send",
  "jobParametro": [
    {
      "propiedad": "Authorization",
      "valor": "Bearer token-aqui",
      "tipo": 2
    },
    {
      "propiedad": "Content-Type",
      "valor": "application/json",
      "tipo": 2
    }
  ],
  "crontab": "0 */4 * * *",
  "correoNotificar": "notificaciones@empresa.com",
  "reintentosPermitidos": 5,
  "periodoReintento": 15,
  "timeout": 120,
  "metodoHttp": 2
}
```

## Formatos de Crontab Válidos

### Ejemplos Comunes:
- `"0 2 * * *"` - Todos los días a las 2:00 AM
- `"0 9 * * 1-5"` - De lunes a viernes a las 9:00 AM
- `"0 */4 * * *"` - Cada 4 horas
- `"30 8 * * 1"` - Todos los lunes a las 8:30 AM
- `"0 0 1 * *"` - El primer día de cada mes a medianoche
- `"0 12 * * 0"` - Todos los domingos a mediodía

### Formato: [minuto] [hora] [día_mes] [mes] [día_semana]
- **Minuto**: 0-59
- **Hora**: 0-23
- **Día del mes**: 1-31
- **Mes**: 1-12
- **Día de la semana**: 0-7 (0 y 7 = domingo)

## Tipos de Parámetros
- **Query (1)**: Parámetros de consulta en la URL (?param=valor)
- **Header (2)**: Headers HTTP

## Métodos HTTP
- **GET (1)**: Para consultas
- **POST (2)**: Para crear recursos
- **PUT (3)**: Para actualizar recursos completos
- **DELETE (4)**: Para eliminar recursos
- **PATCH (5)**: Para actualizaciones parciales

## Respuestas del API

### Éxito (200 OK):
```json
{
  "datos": null,
  "completado": true,
  "mensaje": "Job programado 'Sincronización Diaria' creado exitosamente. Próxima ejecución: 2024-01-15 02:00:00",
  "errorTecnico": null,
  "errores": null
}
```

### Error de Validación (400 Bad Request):
```json
{
  "datos": null,
  "completado": false,
  "mensaje": "Error de validación",
  "errorTecnico": null,
  "errores": [
    "El crontab debe tener un formato válido. Ejemplo: '0 9 * * 1-5' (9 AM de lunes a viernes)",
    "La URL debe tener un formato válido"
  ]
}
```

## Notas Importantes

1. **IdMetodo**: Debe existir en la tabla de métodos
2. **Nombre**: Debe ser único en el sistema
3. **Crontab**: Se valida usando la librería Cronos
4. **Reintentos**: Si se especifican reintentos, el período de reintento es obligatorio
5. **Timeout**: Se especifica en segundos
6. **Período de Reintento**: Se especifica en minutos 