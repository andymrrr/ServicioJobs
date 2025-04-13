namespace ServicioJobs.Modelos.Utilitarios
{
    public class RespuestaServicio<T>
    {
        public T? Datos { get; set; }
        public bool Completado { get; set; }
        public string? Mensaje { get; set; }
        public string? ErrorTecnico { get; set; }
        public IEnumerable<string>? Errores { get; set; }

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
                ErrorTecnico = ex.ToString()
            };
        }
    }
}
