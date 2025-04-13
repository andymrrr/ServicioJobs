

using Cronos;
using Microsoft.Extensions.Configuration;
using ServicioJobs.Aplicacion.Helper;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos.Dto;
using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Aplicacion.Servicios.Implementacion
{

    public class JobExecutor
    {
        private readonly IServicioJobsUoW _context;
        private readonly ApiClient _apiClient;

        public JobExecutor(
            IServicioJobsUoW context,  
            IConfiguration configuration)
        {
            _context = context;
            _apiClient = new ApiClient();
        }

        public async Task EjecutarJobs()
        {
            var respuesta = new HttpResponseMessage();
            var jobs = _context.Programado.BuscarPendientes();

            foreach (var job in jobs)
            {
                var idEjecucion = await _context.Programado.IniciarEjecucionAsync(job);

                var schedule = CronExpression.Parse(job.Crontab);
                var fechaEjecucion = schedule.GetNextOccurrence(DateTimeOffset.Now, TimeZoneInfo.Local).GetValueOrDefault();

                var concluirRequest = new ConcluirEjecucionRequest
                {
                    JobGuid = job.IdProgramado,
                    EjecucionGuid = idEjecucion,
                    FechaEjecucion = fechaEjecucion.DateTime,
                };

                try
                {
                    foreach (var header in job.Parametros.Where(x => x.Tipo == TipoParametro.Header))
                        _apiClient.AddOrUpdateHeader(header.Propiedad, header.Valor);

                    if (job.MetodoHttp == MetodoHttp.GET)
                    {
                        var urlFormateada = JobProgramadoFormatter.FormarUrlGet(job);
                        respuesta = await _apiClient.GetAsync(urlFormateada);
                    }
                    else if (job.MetodoHttp == MetodoHttp.POST)
                    {
                        var parametro = JobProgramadoFormatter.GenerarParametro(job);
                        respuesta = await _apiClient.PosAsync(job.Url, parametro);
                    }
                    else if (job.MetodoHttp == MetodoHttp.PUT)
                    {
                        var parametro = JobProgramadoFormatter.GenerarParametro(job);
                        respuesta = await _apiClient.PutAsync(job.Url, parametro);
                    }

                    concluirRequest.EstadoHttp = (int)respuesta.StatusCode;
                    concluirRequest.Success = respuesta.IsSuccessStatusCode;
                    concluirRequest.MensajeError = respuesta.StatusCode.ToString();

                    await _context.Programado.ConcluirEjecucionAsync(concluirRequest, job);

                }
                catch (Exception ex)
                {
                    concluirRequest.Success = false;
                    concluirRequest.MensajeError = ex.Message;
                    concluirRequest.EstadoHttp = -1;
                   
                   await _context.Programado.ConcluirEjecucionAsync(concluirRequest, job);
                   
                }
            }

            await _context.GuardarCambiosAsync();
        }
    }

}
