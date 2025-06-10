namespace ServicioJobs.Dal.Extensions
{
    /// <summary>
    /// Extensiones para manejar DateTime con PostgreSQL
    /// </summary>
    public static class DateTimeExtensions
    {
        /// <summary>
        /// Convierte un DateTime a UTC de forma simple y directa
        /// </summary>
        /// <param name="dateTime">Fecha a convertir</param>
        /// <returns>DateTime en UTC</returns>
        public static DateTime AsegurarUtc(this DateTime dateTime)
        {
            // Método simple: si no es UTC, lo convertimos especificando como UTC
            if (dateTime.Kind != DateTimeKind.Utc)
            {
                return DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
            }
            return dateTime;
        }

        /// <summary>
        /// Convierte un DateTime nullable a UTC si no lo está ya
        /// </summary>
        /// <param name="dateTime">Fecha a convertir</param>
        /// <returns>DateTime en UTC o null</returns>
        public static DateTime? AsegurarUtc(this DateTime? dateTime)
        {
            return dateTime?.AsegurarUtc();
        }

        /// <summary>
        /// Obtiene la fecha actual en UTC (método helper)
        /// </summary>
        /// <returns>DateTime actual en UTC</returns>
        public static DateTime AhoraUtc()
        {
            return DateTime.UtcNow;
        }

        /// <summary>
        /// Convierte un DateTime UTC a hora local para mostrar
        /// </summary>
        /// <param name="utcDateTime">DateTime en UTC</param>
        /// <returns>DateTime en hora local</returns>
        public static DateTime ConvertirALocal(this DateTime utcDateTime)
        {
            if (utcDateTime.Kind == DateTimeKind.Utc)
            {
                return utcDateTime.ToLocalTime();
            }
            
            return utcDateTime;
        }

        /// <summary>
        /// Convierte un DateTime UTC nullable a hora local para mostrar
        /// </summary>
        /// <param name="utcDateTime">DateTime en UTC</param>
        /// <returns>DateTime en hora local o null</returns>
        public static DateTime? ConvertirALocal(this DateTime? utcDateTime)
        {
            return utcDateTime?.ConvertirALocal();
        }
    }
} 