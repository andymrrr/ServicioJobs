using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Modelos.Utilitarios
{
    public class RespuestaServicio<T>
    {
        public T? Datos { get; set; }
        public bool Completado { get; set; }
        public string? Mensaje { get; set; }
        public string? ErrorTecnico { get; set; }
        public IEnumerable<string>? Errores { get; set; }
        public TipoError? TipoError { get; set; }

        public static RespuestaServicio<T> Exito()
        {
            return new RespuestaServicio<T>
            {
                Completado = true
            };
        }
        public static RespuestaServicio<T> Exito(T datos)
        {
            return new RespuestaServicio<T>
            {
                Datos = datos,
                Completado = true
            };
        }

        public static RespuestaServicio<T> Exito(string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Completado = true,
                Mensaje = mensaje
            };
        }

        public static RespuestaServicio<T> Exito(T datos, string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Datos = datos,
                Completado = true,
                Mensaje = mensaje
            };
        }

        public static RespuestaServicio<T> Fallo(string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = mensaje
            };
        }

        public static RespuestaServicio<T> Fallo(string mensaje, string errorTecnico)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = mensaje,
                ErrorTecnico = errorTecnico
            };
        }
        public static RespuestaServicio<T> Fallo(Exception ex)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = "Ocurrió un error al procesar la solicitud",
                ErrorTecnico = ex.ToString(),
                TipoError = Enums.TipoError.ErrorInterno
            };
        }

        // Métodos específicos para diferentes tipos de errores
        public static RespuestaServicio<T> NoEncontrado(string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = mensaje,
                TipoError = Enums.TipoError.NoEncontrado
            };
        }

        public static RespuestaServicio<T> Conflicto(string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = mensaje,
                TipoError = Enums.TipoError.Conflicto
            };
        }

        public static RespuestaServicio<T> ErrorValidacion(string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = mensaje,
                TipoError = Enums.TipoError.Validacion
            };
        }

        public static RespuestaServicio<T> NoAutorizado(string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = mensaje,
                TipoError = Enums.TipoError.NoAutorizado
            };
        }

        public static RespuestaServicio<T> Prohibido(string mensaje)
        {
            return new RespuestaServicio<T>
            {
                Completado = false,
                Mensaje = mensaje,
                TipoError = Enums.TipoError.Prohibido
            };
        }
    }
}
