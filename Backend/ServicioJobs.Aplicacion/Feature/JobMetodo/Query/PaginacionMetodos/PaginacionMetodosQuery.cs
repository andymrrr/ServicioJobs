
using MediatR;
using ServicioJobs.Aplicacion.Feature.JobMetodo.Dtos;
using ServicioJobs.Dal.Nucleo.Paginacion;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Aplicacion.Feature.JobMetodo.Query.PaginacionMetodos
{
    public class PaginacionMetodosQuery : PaginacionParametro, IRequest<PaginacionVm<MetodosDto>>
    {
        public string? Nombre { get; set; }
        public Guid? IdMetodo { get; set; }
        public MetodoHttp? MetodoHttps { get; set; }
    }
}
