using Hangfire;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Dal.Core.Interfaces;
using ServicioJobs.Modelos.Dto;

namespace ServicioJobs.Aplicacion.Servicios.Wolker
{
    public class HangfireJobService
    {
        private readonly IServicioJobsUoW _context;
        private readonly JobHttpService _httpService;

        public HangfireJobService(
            IServicioJobsUoW context,
            JobHttpService httpService)
        {
            _context = context;
            _httpService = httpService;
        }

        [Queue("default")]
        public async Task<string> EjecutarJobAsincrono(Guid idProgramado)
        {
            try
            {
                var job = await _context.Programado
                    .Consultar(p => p.IdProgramado == idProgramado)
                    .Include(p => p.Parametros)
                    .FirstOrDefaultAsync();

                if (job == null)
                {
                    throw new InvalidOperationException($"No se encontró el job programado con ID: {idProgramado}");
                }

                if (!job.Habilitado)
                {
                    throw new InvalidOperationException($"El job '{job.Nombre}' está deshabilitado");
                }

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
                    request.MensajeError = respuesta.IsSuccessStatusCode ? "Ejecución exitosa" : respuesta.StatusCode.ToString();
                }
                catch (Exception ex)
                {
                    request.EstadoHttp = -1;
                    request.Success = false;
                    request.MensajeError = ex.Message;
                }

                await _context.Programado.ConcluirEjecucionAsync(request, job);
                await _context.GuardarCambiosAsync();

                return $"Job '{job.Nombre}' ejecutado {(request.Success ? "exitosamente" : "con errores")}. Estado HTTP: {request.EstadoHttp}";
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al ejecutar el job: {ex.Message}", ex);
            }
        }

        public string ProgramarJobEjecucion(Guid idProgramado, DateTime fechaEjecucion)
        {
            var hangfireJobId = BackgroundJob.Schedule(
                () => EjecutarJobAsincrono(idProgramado),
                fechaEjecucion);

            return hangfireJobId;
        }

        public string EjecutarJobInmediatamente(Guid idProgramado)
        {
            var hangfireJobId = BackgroundJob.Enqueue(
                () => EjecutarJobAsincrono(idProgramado));

            return hangfireJobId;
        }
    }
} 