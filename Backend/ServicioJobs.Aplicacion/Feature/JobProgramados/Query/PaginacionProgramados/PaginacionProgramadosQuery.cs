
using MediatR;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Dal.Core.Paginacion;
using ServicioJobs.Dal.Core.Paginacion.Modelos;
using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Aplicacion.Feature.Programados.Query.PaginacionProgramados
{
    public class PaginacionProgramadosQuery : PaginacionParametro, IRequest<PaginacionVm<ProgramadoPaginado>>
    {
        public string? Nombre { get; set; }
        public Guid? IdMetodo { get; set; }
        public int? EstadoEjecucion { get; set; }
        public MetodoHttp? MetodoHttps { get; set; }
    }
}
