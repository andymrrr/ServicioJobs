using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Aplicacion.Servicios.Wolker;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.EjecutarJobProgramado
{
    public class EjecutarJobProgramadoHandle : IRequestHandler<EjecutarJobProgramadoCommand, RespuestaServicio<string>>
    {
        private readonly IServicioJobsUoW _context;
        private readonly HangfireJobService _hangfireJobService;
        private readonly IMapper _mapper;

        public EjecutarJobProgramadoHandle(
            IMapper mapper, 
            IServicioJobsUoW context,
            HangfireJobService hangfireJobService)
        {
            _mapper = mapper;
            _context = context;
            _hangfireJobService = hangfireJobService;
        }

        public async Task<RespuestaServicio<string>> Handle(EjecutarJobProgramadoCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var jobExiste = await _context.Programado
                    .Consultar(p => p.IdProgramado == request.IdProgramado)
                    .Select(p => new { p.Nombre, p.Habilitado })
                    .FirstOrDefaultAsync(cancellationToken);

                if (jobExiste == null)
                {
                    return RespuestaServicio<string>.Fallo("El job programado especificado no existe");
                }

                if (!jobExiste.Habilitado)
                {
                    return RespuestaServicio<string>.Fallo($"El job '{jobExiste.Nombre}' está deshabilitado y no puede ejecutarse");
                }

                string hangfireJobId;
                string mensaje;

             
                if (request.EjecutarInmediatamente)
                {
                   
                    hangfireJobId = _hangfireJobService.EjecutarJobInmediatamente(request.IdProgramado);
                    mensaje = $"Job '{jobExiste.Nombre}' encolado para ejecución inmediata. Job ID de Hangfire: {hangfireJobId}";
                }
                else if (request.FechaEjecucionProgramada.HasValue)
                {
                    // Programar para una fecha específica
                    hangfireJobId = _hangfireJobService.ProgramarJobEjecucion(
                        request.IdProgramado, 
                        request.FechaEjecucionProgramada.Value);
                    mensaje = $"Job '{jobExiste.Nombre}' programado para ejecutarse el {request.FechaEjecucionProgramada.Value:yyyy-MM-dd HH:mm:ss}. Job ID de Hangfire: {hangfireJobId}";
                }
                else
                {
                    return RespuestaServicio<string>.Fallo("Debe especificar si ejecutar inmediatamente o proporcionar una fecha de ejecución");
                }

                return RespuestaServicio<string>.Exito(mensaje, hangfireJobId);
            }
            catch (Exception ex)
            {
                return RespuestaServicio<string>.Fallo($"Error al programar la ejecución del job: {ex.Message}");
            }
        }
    }
} 