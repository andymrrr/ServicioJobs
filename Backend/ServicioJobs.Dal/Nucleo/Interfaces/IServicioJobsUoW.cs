using ServicioJobs.Modelos;


namespace ServicioJobs.Dal.Nucleo.Interfaces
{
    public interface IServicioJobsUoW : IDisposable
    {

        
        IRepositorioProgramado Programado { get; set; }
        IRepositorio<Metodo> Metodo { get; set; }
        IRepositorio<Parametro> Parametro { get; set; }



        void GuardarCambios();
        Task GuardarCambiosAsync();

        Task BeginAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
