using ServicioJobs.Dal.Nucleo.Paginacion;
using ServicioJobs.Modelos;

namespace ServicioJobs.Aplicacion.Paginacion.Libros
{
    public class PaginacionParaConteoDeLibros : PaginacionBase<Libro>
    {
        public PaginacionParaConteoDeLibros(PaginacionLibroParametro parametro)
         : base(parametro.ConstruirFiltro())
        { }
    }
}
