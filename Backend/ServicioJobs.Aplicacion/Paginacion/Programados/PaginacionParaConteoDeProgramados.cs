
using ServicioJobs.Dal.Core.Paginacion;
using ServicioJobs.Modelos;

namespace ServicioJobs.Aplicacion.Paginacion.Programados
{
    public class PaginacionParaConteoDeProgramados : PaginacionBase<Programado>
    {
        public PaginacionParaConteoDeProgramados(PaginacionProgramadoresParametro parametro) :
            base(parametro.ConstruirFiltro())
        {
            
        }
    }
}
