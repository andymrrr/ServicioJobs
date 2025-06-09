using Hangfire;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Aplicacion.Helper;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos;
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

        /// <summary>
        /// Ejecuta un job específico mediante Hangfire
        /// </summary>
        /// <param name="idProgramado">ID del job programado a ejecutar</param>
        /// <returns>ID del job de Hangfire creado</returns>
        [Queue("default")]
        public async Task<string> EjecutarJobAsincrono(Guid idProgramado)
        {
            try
            {
                // Buscar el job programado
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

                // Iniciar la ejecución
                var idEjecucion = await _context.Programado.IniciarEjecucionAsync(job);

                var request = new ConcluirEjecucionRequest
                {
                    JobGuid = job.IdProgramado,
                    EjecucionGuid = idEjecucion,
                    FechaEjecucion = JobScheduleService.CalcularProximaEjecucion(job.Crontab)
                };

                try
                {
                    // Ejecutar el job HTTP
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

                // Concluir la ejecución
                await _context.Programado.ConcluirEjecucionAsync(request, job);
                await _context.GuardarCambiosAsync();

                return $"Job '{job.Nombre}' ejecutado {(request.Success ? "exitosamente" : "con errores")}. Estado HTTP: {request.EstadoHttp}";
            }
            catch (Exception ex)
            {
                // Log del error (puedes agregar tu sistema de logging aquí)
                throw new InvalidOperationException($"Error al ejecutar el job: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Programa un job para ejecutarse en una fecha específica
        /// </summary>
        /// <param name="idProgramado">ID del job programado</param>
        /// <param name="fechaEjecucion">Fecha y hora de ejecución</param>
        /// <returns>ID del job de Hangfire programado</returns>
        public string ProgramarJobEjecucion(Guid idProgramado, DateTime fechaEjecucion)
        {
            var hangfireJobId = BackgroundJob.Schedule(
                () => EjecutarJobAsincrono(idProgramado),
                fechaEjecucion);

            return hangfireJobId;
        }

        /// <summary>
        /// Ejecuta un job inmediatamente en segundo plano
        /// </summary>
        /// <param name="idProgramado">ID del job programado</param>
        /// <returns>ID del job de Hangfire creado</returns>
        public string EjecutarJobInmediatamente(Guid idProgramado)
        {
            var hangfireJobId = BackgroundJob.Enqueue(
                () => EjecutarJobAsincrono(idProgramado));

            return hangfireJobId;
        }
    }
} 