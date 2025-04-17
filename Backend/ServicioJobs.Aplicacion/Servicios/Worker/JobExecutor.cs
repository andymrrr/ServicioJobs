using Hangfire;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Dto;

namespace ServicioJobs.Aplicacion.Servicios.Worker
{
    public class JobExecutor
    {
        private readonly IServicioJobsUoW _context;
        private readonly JobHttpService _httpService;

        public JobExecutor(
            IServicioJobsUoW context,
            JobHttpService httpService)
        {
            _context = context;
            _httpService = httpService;
        }

        [DisableConcurrentExecution(timeoutInSeconds: 300)]
        public async Task EjecutarJobs()
        {
            var jobs = _context.Programado.BuscarPendientes();

            var tareas = new List<Task>();

            foreach (var job in jobs)
            {
                tareas.Add(EjecutarJobAsync(job));
            }

            await Task.WhenAll(tareas);
            await _context.GuardarCambiosAsync();
        }

        private async Task EjecutarJobAsync(Programado job) 
        {
            var idEjecucion = await _context.Programado.IniciarEjecucionAsync(job);

            var request = new ConcluirEjecucionRequest
            {
                JobGuid = job.IdProgramado,
                EjecucionGuid = idEjecucion,
                FechaEjecucion = JobScheduleService.CalcularProximaEjecucion(job.Crontab)
            };

            try
            {
                var respuesta = await _httpService.EjecutarAsync(job);
                request.EstadoHttp = (int)respuesta.StatusCode;
                request.Success = respuesta.IsSuccessStatusCode;
                request.MensajeError = respuesta.StatusCode.ToString();
            }
            catch (Exception ex)
            {
                request.EstadoHttp = -1;
                request.Success = false;
                request.MensajeError = ex.Message;
            }

            await _context.Programado.ConcluirEjecucionAsync(request, job);
        }
    }
}
