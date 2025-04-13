using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Aplicacion.Helper
{

    public static class JobProgramadoFormatter
    {
        /// <summary>
        /// Forma la URL con parámetros tipo Query si existen.
        /// </summary>
        /// <param name="job">El job programado con parámetros</param>
        /// <returns>El job con la URL formateada</returns>
        public static string FormarUrlGet(Programado job)
        {
            string urlFormateada = string.Empty;
            var parametrosQuery = job.Parametros
                                     .Where(x => x.Tipo == TipoParametro.Query)
                                     .ToList();

            if (parametrosQuery.Any())
            {
                var queryString = string.Join("&", parametrosQuery.Select(p => $"{p.Propiedad}={p.Valor}"));
                urlFormateada = $"{job.Url}?{queryString}";
            }
            else
            {
                urlFormateada = job.Url;
            }

            return urlFormateada;
        }

        /// <summary>
        /// Genera una lista de tuplas (clave, valor) con todos los parámetros del job.
        /// </summary>
        /// <param name="job">El job programado</param>
        /// <returns>Lista de parámetros como tuplas</returns>
        public static List<(string, string)> GenerarParametro(Programado job)
        {
            return job.Parametros
                      .Select(p => (p.Propiedad, p.Valor))
                      .ToList();
        }
    }

}
