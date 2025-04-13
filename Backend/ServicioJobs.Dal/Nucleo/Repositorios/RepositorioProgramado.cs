using Microsoft.EntityFrameworkCore;
using ServicioJobs.Dal.Contexto;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Dto;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Dal.Nucleo.Repositorios
{
    public class RepositorioProgramado : Repositorio<Programado>, IRepositorioProgramado
    {
        public RepositorioProgramado(ContextServicioJobs context)
            : base(context) { }

        public IQueryable<Programado> BuscarPendientes()
        {
            var fechaActual = DateTime.Now;

            return Consultar(j => j.Habilitado &&
                                  (j.FechaEjecucion < fechaActual || j.FechaReintento < fechaActual) &&
                                  j.EstadoEjecucion == ValoresEstaticos.Estados.Pendiente)
                   .Include(j => j.Parametros)
                   .AsNoTracking(); 
        }

        public async Task<Guid> IniciarEjecucionAsync(Programado job)
        {
            job.EstadoEjecucion = ValoresEstaticos.Estados.Ejecutando;

            await ActualizarAsincrono(job);

            var historico = new Historico
            {
                IdHistorico = Guid.NewGuid(),
                Estado = ValoresEstaticos.Estados.Iniciada,
                FechaEjecucion = DateTime.Now,
                IdProgramado = job.IdProgramado
            };

            await _context.Historico.AddAsync(historico);
            await _context.SaveChangesAsync();

            return historico.IdHistorico;
        }

        public async Task ConcluirEjecucionAsync(ConcluirEjecucionRequest request, Programado job)
        {
            var jobHistorial = await _context.Historico.FindAsync(request.EjecucionGuid);
            if (jobHistorial is null)
                throw new InvalidOperationException("Historial no encontrado");

            var fechaActual = DateTime.Now;

            jobHistorial.Estado = ValoresEstaticos.Estados.Completada;
            jobHistorial.FechaEjecucionFin = fechaActual;
            jobHistorial.EstadoHttp = request.EstadoHttp;

            job.EstadoEjecucion = ValoresEstaticos.Estados.Pendiente;
            job.UltimaEjecucionExitosa = request.Success;

            if (request.Success)
            {
                job.Reintentos = 0;
                job.FechaReintento = null;
                job.UltimaEjecucion = fechaActual;
                job.FechaEjecucion = request.FechaEjecucion;
            }
            else
            {
                if (job.ReintentosPermitidos > 0 && job.Reintentos < job.ReintentosPermitidos)
                {
                    job.FechaReintento = fechaActual.AddMinutes(job.PeriodoReintento.GetValueOrDefault());
                }
                else
                {
                    job.FechaEjecucion = request.FechaEjecucion;
                }

                jobHistorial.MensajeError = request.MensajeError;
            }

            await ActualizarAsincrono(job);
            await _context.SaveChangesAsync();
        }
    }
}
