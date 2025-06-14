using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Aplicacion.Servicios.Wolker;
using ServicioJobs.Dal.Core.Interfaces;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.EditarJobProgramado
{
    public class EditarJobProgramadoHandle : IRequestHandler<EditarJobProgramadoCommand, RespuestaServicio<Unit>>
    {
        private readonly IServicioJobsUoW _context;
        private readonly IMapper _mapper;

        public EditarJobProgramadoHandle(IMapper mapper, IServicioJobsUoW context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<RespuestaServicio<Unit>> Handle(EditarJobProgramadoCommand request, CancellationToken cancellationToken)
        {
            try
            {
               
                var programadoExistente = await _context.Programado
                    .Consultar(p => p.IdProgramado == request.IdProgramado)
                    .Include(p => p.Parametros)
                    .FirstOrDefaultAsync(cancellationToken);

                if (programadoExistente == null)
                {
                    return RespuestaServicio<Unit>.NoEncontrado("El job programado especificado no existe");
                }
                var nombreExiste = await _context.Programado
                    .Consultar(p => p.Nombre.ToLower() == request.Nombre.ToLower() && p.IdProgramado != request.IdProgramado)
                    .AnyAsync(cancellationToken);

                if (nombreExiste)
                {
                    return RespuestaServicio<Unit>.Conflicto($"Ya existe otro job programado con el nombre '{request.Nombre}'");
                }

                DateTime proximaEjecucion;
                try
                {
                    proximaEjecucion = JobScheduleService.CalcularProximaEjecucion(request.Crontab);
                }
                catch (Exception ex)
                {
                    return RespuestaServicio<Unit>.ErrorValidacion($"Error al procesar el crontab: {ex.Message}");
                }

               
                programadoExistente.Nombre = request.Nombre.Trim();
                programadoExistente.Descripcion = request.Descripcion?.Trim();
                programadoExistente.Url = request.Url.Trim();
                programadoExistente.Crontab = request.Crontab.Trim();
                programadoExistente.CorreoNotificar = request.CorreoNotificar?.Trim();
                programadoExistente.ReintentosPermitidos = request.ReintentosPermitidos;
                programadoExistente.PeriodoReintento = request.PeriodoReintento;
                programadoExistente.Timeout = request.Timeout;
                programadoExistente.Habilitado = request.Habilitado;
                
             
                var crontabCambio = programadoExistente.Crontab != request.Crontab.Trim();
                if (crontabCambio)
                {
                    programadoExistente.FechaEjecucion = proximaEjecucion;
                }

               
                foreach (var parametroExistente in programadoExistente.Parametros.ToList())
                {
                    await _context.Parametro.EliminarAsincrono(parametroExistente);
                }

             
                var parametros = new List<Parametro>();
                foreach (var paramDto in request.JobParametro)
                {
                    var parametro = new Parametro
                    {
                        IdParametroa = Guid.NewGuid(),
                        IdProgramado = programadoExistente.IdProgramado,
                        Propiedad = paramDto.Propiedad.Trim(),
                        Valor = paramDto.Valor.Trim(),
                        Tipo = paramDto.Tipo
                    };
                    parametros.Add(parametro);
                }

                // 8. Guardar en la base de datos
                await _context.Programado.ActualizarAsincrono(programadoExistente);

                foreach (var parametro in parametros)
                {
                    await _context.Parametro.AgregarAsincrono(parametro);
                }

                await _context.GuardarCambiosAsync();

                var mensaje = crontabCambio 
                    ? $"Job programado '{request.Nombre}' actualizado exitosamente. Próxima ejecución: {proximaEjecucion:yyyy-MM-dd HH:mm:ss}"
                    : $"Job programado '{request.Nombre}' actualizado exitosamente";

                return RespuestaServicio<Unit>.Exito(mensaje);
            }
            catch (Exception ex)
            {
                return RespuestaServicio<Unit>.Fallo($"Error al actualizar el job programado: {ex.Message}");
            }
        }
    }
} 