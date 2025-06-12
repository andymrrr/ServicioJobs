using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using ServicioJobs.Aplicacion.Feature.JobMetodo.Dtos;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Paginacion.JobMetodo;
using ServicioJobs.Aplicacion.Paginacion.Programados;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;

namespace ServicioJobs.Aplicacion.Feature.JobMetodo.Query.PaginacionMetodos
{
    public class PaginacionMetodosHandler : IRequestHandler<PaginacionMetodosQuery, PaginacionVm<MetodosDto>>
    {
        private readonly IServicioJobsUoW _servicioJobs;
        private readonly IMapper _mapper;
        private readonly ILogger<PaginacionMetodosHandler> _logger;
        
        public PaginacionMetodosHandler(IServicioJobsUoW servicioJobs, IMapper mapper, ILogger<PaginacionMetodosHandler> logger)
        {
            _servicioJobs = servicioJobs;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<PaginacionVm<MetodosDto>> Handle(PaginacionMetodosQuery request, CancellationToken cancellationToken)
        {
            
            var Parametro = new PaginacionMetodoParametro
            {
                Pagina = request.Pagina,
                CantidadRegistroPorPagina = request.CantidadRegistroPorPagina,
                Busqueda = request.Busqueda,
                Ordenar = request.Ordenar,
                MetodoHttps = request.MetodoHttps,
                IdMetodo = request.IdMetodo,
                Nombre = request.Nombre,
            };

            var especificaciones = new PaginacionMetodo(Parametro);
            var metodo = await _servicioJobs.Metodo.BuscarTodaEspecificaciones(especificaciones);

            var cantidadEspecificaciones = new PaginacionParaConteoDeMetodo(Parametro);
            var total = await _servicioJobs.Metodo.CantidadAsincrona(cantidadEspecificaciones);

            var programadoVm = _mapper.Map<IReadOnlyList<MetodosDto>>(metodo);


            return new PaginacionVm<MetodosDto>
            {
                TotalRegistros = total,
                PaginaActual = request.Pagina,
                CantidadRegistroPorPagina = request.CantidadRegistroPorPagina,
                Datos = programadoVm
            };
        }
    }
}
