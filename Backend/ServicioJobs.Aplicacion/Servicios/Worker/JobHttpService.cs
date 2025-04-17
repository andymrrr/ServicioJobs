using ServicioJobs.Aplicacion.Helper;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Aplicacion.Servicios.Worker
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
           
            var timeout = TimeSpan.FromSeconds(job.Timeout ?? 100);
            var client = _apiClient.CreateClient(timeout);

            foreach (var header in job.Parametros.Where(x => x.Tipo == TipoParametro.Header))
                _apiClient.AddOrUpdateHeader(client, header.Propiedad, header.Valor);

          
            return job.MetodoHttp switch
            {
                MetodoHttp.GET => await _apiClient.GetAsync(client, JobProgramadoFormatter.FormarUrlGet(job)),
                MetodoHttp.POST => await _apiClient.PostAsync(client, job.Url, JobProgramadoFormatter.GenerarParametro(job)),
                MetodoHttp.PUT => await _apiClient.PutAsync(client, job.Url, JobProgramadoFormatter.GenerarParametro(job)),
                _ => throw new NotSupportedException("Método HTTP no soportado.")
            };
        }
    }
}
