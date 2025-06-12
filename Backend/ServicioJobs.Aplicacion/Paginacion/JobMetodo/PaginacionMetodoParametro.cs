using ServicioJobs.Dal.Nucleo.Paginacion;
using ServicioJobs.Modelos;
using ServicioJobs.Modelos.Enums;
using System.Linq.Expressions;


namespace ServicioJobs.Aplicacion.Paginacion.JobMetodo
{
    public class PaginacionMetodoParametro : PaginacionParametro
    {
        public string? Nombre { get; set; }
        public Guid? IdMetodo { get; set; }
        public MetodoHttp? MetodoHttps { get; set; }


        public Expression<Func<Metodo, bool>> ConstruirFiltro()
        {
            return c =>
                (!MetodoHttps.HasValue || c.CodigoHttp == MetodoHttps) && 
                (!IdMetodo.HasValue || c.IdMetodo == IdMetodo) &&
                (string.IsNullOrEmpty(Nombre) || c.Nombre!.Contains(Nombre)) &&
                (string.IsNullOrEmpty(Busqueda) || c.Nombre!.ToLower().Contains(Busqueda.ToLower()));

        }
    }
}
