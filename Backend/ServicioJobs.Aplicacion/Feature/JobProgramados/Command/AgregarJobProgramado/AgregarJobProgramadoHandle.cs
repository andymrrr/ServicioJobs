using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Aplicacion.Servicios.Wolker;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.JobProgramados
{
    public class AgregarJobProgramadoHandle : IRequestHandler<AgregarJobProgramadoComand, RespuestaServicio<Unit>>
    {
        private readonly IServicioJobsUoW _context;
        private readonly IMapper _mapper;

        public AgregarJobProgramadoHandle(IMapper mapper, IServicioJobsUoW context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<RespuestaServicio<Unit>> Handle(AgregarJobProgramadoComand request, CancellationToken cancellationToken)
        {
            try
            {
                var nombreExiste = await _context.Programado.Consultar(p => p.Nombre.ToLower() == request.Nombre.ToLower())
                    .AnyAsync(cancellationToken);

                if (nombreExiste)
                {
                    return RespuestaServicio<Unit>.Fallo($"Ya existe un job programado con el nombre '{request.Nombre}'");
                }

                DateTime proximaEjecucion;
                try
                {
                    proximaEjecucion = JobScheduleService.CalcularProximaEjecucion(request.Crontab);
                }
                catch (Exception ex)
                {
                    return RespuestaServicio<Unit>.Fallo($"Error al procesar el crontab: {ex.Message}");
                }

                var programado = new Programado
                {
                    IdProgramado = Guid.NewGuid(),
                    Nombre = request.Nombre.Trim(),
                    Descripcion = request.Descripcion?.Trim(),
                    Url = request.Url.Trim(),
                    Crontab = request.Crontab.Trim(),
                    CorreoNotificar = request.CorreoNotificar?.Trim(),
                    FechaEjecucion = proximaEjecucion,
                    ReintentosPermitidos = request.ReintentosPermitidos,
                    PeriodoReintento = request.PeriodoReintento,
                    Timeout = request.Timeout,
                    EstadoEjecucion = ValoresEstaticos.Estados.Pendiente,
                    Reintentos = 0,
                    Habilitado = true,
                    UltimaEjecucionExitosa = null,
                    FechaReintento = null,
                    UltimaEjecucion = null
                };

                var parametros = new List<Parametro>();
                foreach (var paramDto in request.JobParametro)
                {
                    var parametro = new Parametro
                    {
                        IdParametroa = Guid.NewGuid(),
                        IdProgramado = programado.IdProgramado,
                        Propiedad = paramDto.Propiedad.Trim(),
                        Valor = paramDto.Valor.Trim(),
                        Tipo = paramDto.Tipo
                    };
                    parametros.Add(parametro);
                }

                await _context.Programado.AgregarAsincrono(programado);

                foreach (var parametro in parametros)
                {
                    await _context.Parametro.AgregarAsincrono(parametro);
                }

                await _context.GuardarCambiosAsync();

                return RespuestaServicio<Unit>.Exito($"Job programado '{request.Nombre}' creado exitosamente. Próxima ejecución: {proximaEjecucion:yyyy-MM-dd HH:mm:ss}");
            }
            catch (Exception ex)
            {
                return RespuestaServicio<Unit>.Fallo($"Error al crear el job programado: {ex.Message}");
            }
        }
    }
}
