using ServicioJobs.Modelos;


namespace ServicioJobs.Dal.Core.Interfaces
{
    public interface IServicioJobsUoW : IDisposable
    {

        
        IRepositorioProgramado Programado { get; set; }
        IRepositorio<Parametro> Parametro { get; set; }



        void GuardarCambios();
        Task GuardarCambiosAsync();

        Task BeginAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
