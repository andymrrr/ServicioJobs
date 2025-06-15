using Hangfire.Storage;
using ServicioJobs.Aplicacion.Helper;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Aplicacion.Servicios.Wolker
{
    public class JobHttpService
    {
        private readonly ApiClient _apiClient;

        public JobHttpService(ApiClient apiClient)
        {
            _apiClient = apiClient;
        }

        public async Task<HttpResponseMessage> EjecutarAsync(Programado job)
        {
            foreach (var header in job.Parametros.Where(x => x.Tipo == TipoParametro.Header))
                _apiClient.AddOrUpdateHeader(header.Propiedad, header.Valor);

            return job.MetodoHttp switch
            {
                MetodoHttp.GET => await _apiClient.GetAsync(JobProgramadoFormatter.FormarUrlGet(job)),
                MetodoHttp.POST => await _apiClient.PosAsync(job.Url, JobProgramadoFormatter.GenerarParametro(job)),
                MetodoHttp.PUT => await _apiClient.PutAsync(job.Url, JobProgramadoFormatter.GenerarParametro(job)),
                _ => throw new NotSupportedException("Método HTTP no soportado.")
            };
        }
    }

}
