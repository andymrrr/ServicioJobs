using ServicioJobs.Modelos;


namespace ServicioJobs.Dal.Nucleo.Interfaces
{
    public interface IServicioJobsUoW : IDisposable
    {

        
        IRepositorioProgramado Programado { get; set; }
       


        void GuardarCambios();
        Task GuardarCambiosAsync();

        Task BeginAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
