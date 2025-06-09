using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Servicios.Wolker;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Enums;
using ServicioJobs.Modelos.Utilitarios;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                // 1. Verificar que el job programado existe
                var programadoExistente = await _context.Programado
                    .Consultar(p => p.IdProgramado == request.IdProgramado)
                    .Include(p => p.Parametros)
                    .FirstOrDefaultAsync(cancellationToken);

                if (programadoExistente == null)
                {
                    return RespuestaServicio<Unit>.Fallo("El job programado especificado no existe");
                }

                // 2. Verificar que el método existe
                var metodoExiste = await _context.Metodo.Consultar(m => m.IdMetodo == request.IdMetodo)
                    .AnyAsync(cancellationToken);

                if (!metodoExiste)
                {
                    return RespuestaServicio<Unit>.Fallo("El método especificado no existe");
                }

                // 3. Verificar que el nombre no esté duplicado (excluyendo el actual)
                var nombreExiste = await _context.Programado
                    .Consultar(p => p.Nombre.ToLower() == request.Nombre.ToLower() && p.IdProgramado != request.IdProgramado)
                    .AnyAsync(cancellationToken);

                if (nombreExiste)
                {
                    return RespuestaServicio<Unit>.Fallo($"Ya existe otro job programado con el nombre '{request.Nombre}'");
                }

                // 4. Validar y calcular próxima ejecución
                DateTime proximaEjecucion;
                try
                {
                    proximaEjecucion = JobScheduleService.CalcularProximaEjecucion(request.Crontab);
                }
                catch (Exception ex)
                {
                    return RespuestaServicio<Unit>.Fallo($"Error al procesar el crontab: {ex.Message}");
                }

                // 5. Actualizar el job programado
                programadoExistente.IdMetodo = request.IdMetodo;
                programadoExistente.Nombre = request.Nombre.Trim();
                programadoExistente.Descripcion = request.Descripcion?.Trim();
                programadoExistente.Url = request.Url.Trim();
                programadoExistente.Crontab = request.Crontab.Trim();
                programadoExistente.CorreoNotificar = request.CorreoNotificar?.Trim();
                programadoExistente.ReintentosPermitidos = request.ReintentosPermitidos;
                programadoExistente.PeriodoReintento = request.PeriodoReintento;
                programadoExistente.Timeout = request.Timeout;
                programadoExistente.MetodoHttp = request.MetodoHttp;
                programadoExistente.Habilitado = request.Habilitado;
                
                // Solo actualizar la próxima ejecución si cambió el crontab
                var crontabCambio = programadoExistente.Crontab != request.Crontab.Trim();
                if (crontabCambio)
                {
                    programadoExistente.FechaEjecucion = proximaEjecucion;
                }

                // 6. Eliminar parámetros existentes
                foreach (var parametroExistente in programadoExistente.Parametros.ToList())
                {
                    await _context.Parametro.EliminarAsincrono(parametroExistente);
                }

                // 7. Crear los nuevos parámetros del job
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