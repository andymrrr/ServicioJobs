namespace ServicioJobs.Dal.Helpers
{
    /// <summary>
    /// Helper simple para manejar fechas con PostgreSQL de forma manual
    /// </summary>
    public static class FechaHelper
    {
        /// <summary>
        /// Obtiene la fecha actual en UTC (método principal a usar)
        /// </summary>
        public static DateTime AhoraUtc => DateTime.UtcNow;

        /// <summary>
        /// Convierte cualquier DateTime a UTC de forma segura para PostgreSQL
        /// </summary>
        /// <param name="fecha">Fecha a convertir</param>
        /// <returns>DateTime seguro para PostgreSQL</returns>
        public static DateTime ConvertirAUtcSeguro(DateTime fecha)
        {
            // Simple: solo especificamos que es UTC
            return DateTime.SpecifyKind(fecha, DateTimeKind.Utc);
        }

        /// <summary>
        /// Convierte DateTime nullable a UTC seguro
        /// </summary>
        /// <param name="fecha">Fecha nullable a convertir</param>
        /// <returns>DateTime nullable seguro para PostgreSQL</returns>
        public static DateTime? ConvertirAUtcSeguro(DateTime? fecha)
        {
            return fecha.HasValue ? ConvertirAUtcSeguro(fecha.Value) : null;
        }

        /// <summary>
        /// Crea una fecha específica en UTC
        /// </summary>
        /// <param name="año">Año</param>
        /// <param name="mes">Mes</param>
        /// <param name="dia">Día</param>
        /// <param name="hora">Hora (opcional, por defecto 0)</param>
        /// <param name="minuto">Minuto (opcional, por defecto 0)</param>
        /// <param name="segundo">Segundo (opcional, por defecto 0)</param>
        /// <returns>DateTime en UTC</returns>
        public static DateTime CrearFechaUtc(int año, int mes, int dia, int hora = 0, int minuto = 0, int segundo = 0)
        {
            return new DateTime(año, mes, dia, hora, minuto, segundo, DateTimeKind.Utc);
        }

        /// <summary>
        /// Convierte una fecha UTC a local para mostrar al usuario
        /// </summary>
        /// <param name="fechaUtc">Fecha en UTC</param>
        /// <returns>Fecha en tiempo local</returns>
        public static DateTime ConvertirALocal(DateTime fechaUtc)
        {
            if (fechaUtc.Kind == DateTimeKind.Utc)
            {
                return fechaUtc.ToLocalTime();
            }
            return fechaUtc; // Si no es UTC, la devolvemos tal como está
        }

        /// <summary>
        /// Convierte una fecha UTC nullable a local para mostrar al usuario
        /// </summary>
        /// <param name="fechaUtc">Fecha UTC nullable</param>
        /// <returns>Fecha en tiempo local o null</returns>
        public static DateTime? ConvertirALocal(DateTime? fechaUtc)
        {
            return fechaUtc.HasValue ? ConvertirALocal(fechaUtc.Value) : null;
        }
    }
} 