
using ServicioJobs.Dal.Nucleo.Paginacion;
using ServicioJobs.Modelos;

namespace ServicioJobs.Aplicacion.Paginacion.JobMetodo
{
    public class PaginacionParaConteoDeMetodo : PaginacionBase<Metodo>
    {
        public PaginacionParaConteoDeMetodo(PaginacionMetodoParametro parametro) :
            base(parametro.ConstruirFiltro())
        {
            
        }
    }
}
