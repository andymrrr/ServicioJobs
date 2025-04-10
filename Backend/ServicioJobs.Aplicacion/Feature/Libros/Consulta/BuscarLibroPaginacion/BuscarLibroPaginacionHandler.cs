using MediatR;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using ServicioJobs.Dal.Nucleo.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServicioJobs.Aplicacion.Funcionalidad.Libros.Vm;
using ServicioJobs.Aplicacion.Paginacion.Libros;
using ServicioJobs.Dal.Nucleo.Interfaces;
using AutoMapper;

namespace ServicioJobs.Aplicacion.Funcionalidad.Libros.Consulta.BuscarLibroPaginacion
{
    public class BuscarLibroPaginacionHandler : IRequestHandler<BuscarLibroPaginacionConsulta, PaginacionVm<LibroVm>>
    {
        private readonly IServicioJobsUoW _contex;
        private readonly IMapper _mapper;
        public BuscarLibroPaginacionHandler(IServicioJobsUoW context, IMapper mapper)
        {
            _contex = context;
            _mapper = mapper;
        }
        public async Task<PaginacionVm<LibroVm>> Handle(BuscarLibroPaginacionConsulta request, CancellationToken cancellationToken)
        {
            var libroParametro = new PaginacionLibroParametro
            {
                Pagina = request.Pagina,
                CantidadRegistroPorPagina = request.CantidadRegistroPorPagina,
                Busqueda = request.Busqueda,
                Ordenar = request.Ordenar,
                LibroGuid = request.LibroGuid,
                titulo = request.titulo
            };

            var especificaciones = new PaginacionLibro(libroParametro);
            var categorias = await _contex.Libros.BuscarTodaEspecificificaciones(especificaciones);

            var cantidadEspecificaciones = new PaginacionParaConteoDeLibros(libroParametro);
            var totalCategorias = await _contex.Libros.CantidadAsincrona(cantidadEspecificaciones);

            var categoriasVm = _mapper.Map<IReadOnlyList<LibroVm>>(categorias);

            return new PaginacionVm<LibroVm>
            {
                TotalRegistros = totalCategorias,
                PaginaActual = request.Pagina,
                CantidadRegistroPorPagina = request.CantidadRegistroPorPagina,
                Datos = categoriasVm
            };
        }
    }
}
