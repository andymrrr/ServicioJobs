
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Dto;

namespace ServicioJobs.Dal.Core.Interfaces
{
    public interface IRepositorioProgramado : IRepositorio<Programado>
    {
        IQueryable<Programado> BuscarPendientes();
        Task<Guid> IniciarEjecucionAsync(Programado job);
        Task ConcluirEjecucionAsync(ConcluirEjecucionRequest request, Programado job);
    }
}
