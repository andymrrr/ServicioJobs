namespace ServicioJobs.Modelos.Enums
{
    /// <summary>
    /// Tipos de errores para mapear a códigos HTTP apropiados
    /// </summary>
    public enum TipoError
    {
        /// <summary>
        /// Error general o validación de datos (400 Bad Request)
        /// </summary>
        Validacion = 0,

        /// <summary>
        /// Recurso no encontrado (404 Not Found)
        /// </summary>
        NoEncontrado = 1,

        /// <summary>
        /// Conflicto - recurso ya existe (409 Conflict)
        /// </summary>
        Conflicto = 2,

        /// <summary>
        /// No autorizado (401 Unauthorized)
        /// </summary>
        NoAutorizado = 3,

        /// <summary>
        /// Prohibido (403 Forbidden)
        /// </summary>
        Prohibido = 4,

        /// <summary>
        /// Error interno del servidor (500 Internal Server Error)
        /// </summary>
        ErrorInterno = 5
    }
} 