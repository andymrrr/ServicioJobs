using ServicioJobs.Modelos;


namespace ServicioJobs.Dal.Nucleo.Interfaces
{
    public interface IServicioJobsUoW : IDisposable
    {

        IRepositorio<Libro> Libros { get; set; }
        IRepositorioProgramado Programado { get; set; }
       


        void GuardarCambios();
        Task GuardarCambiosAsync();

        Task BeginAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
