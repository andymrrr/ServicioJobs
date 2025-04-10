using MediatR;
using ServicioJobs.Aplicacion.Funcionalidad.Libros.Vm;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using ServicioJobs.Dal.Nucleo.Paginacion;


namespace ServicioJobs.Aplicacion.Funcionalidad.Libros.Consulta.BuscarLibroPaginacion
{
    public class BuscarLibroPaginacionConsulta : PaginacionParametro, IRequest<PaginacionVm<LibroVm>>
    {
        public Guid? LibroGuid { get; set; }
        public string? titulo { get; set; }
    }
}
