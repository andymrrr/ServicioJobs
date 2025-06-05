using AutoMapper;
using MediatR;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Paginacion.Programados;
using ServicioJobs.Dal.Nucleo.Interfaces;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using ServicioJobs.Dal.Nucleo.Repositorios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Query.PaginacionProgramados
{
    public class PaginacionProgramadosHandler : IRequestHandler<PaginacionProgramadosQuery, PaginacionVm<ProgramadoPaginado>>
    {
        private readonly IServicioJobsUoW _servicioJobs;
        private readonly IMapper _mapper;
        public PaginacionProgramadosHandler( IServicioJobsUoW servicioJobs, IMapper mapper)
        {
            _servicioJobs = servicioJobs;
            _mapper = mapper;
        }
        public async Task<PaginacionVm<ProgramadoPaginado>> Handle(PaginacionProgramadosQuery request, CancellationToken cancellationToken)
        {
            
            var ProgramadoParametro = new PaginacionProgramadoresParametro
            {
                Pagina = request.Pagina,
                CantidadRegistroPorPagina = request.CantidadRegistroPorPagina,
                Busqueda = request.Busqueda,
                Ordenar = request.Ordenar,
                MetodoHttps = request.MetodoHttps,
                IdMetodo = request.IdMetodo,
                EstadoEjecucion = request.EstadoEjecucion,
                Nombre = request.Nombre,

            };

            var especificaciones = new PaginacionProgramadores(ProgramadoParametro);
            var programados = await _servicioJobs.Programado.BuscarTodaEspecificaciones(especificaciones);

            var cantidadEspecificaciones = new PaginacionParaConteoDeProgramados(ProgramadoParametro);
            var total = await _servicioJobs.Programado.CantidadAsincrona(cantidadEspecificaciones);

            var programadoVm = _mapper.Map<IReadOnlyList<ProgramadoPaginado>>(programados);

            return new PaginacionVm<ProgramadoPaginado>
            {
                TotalRegistros = total,
                PaginaActual = request.Pagina,
                CantidadRegistroPorPagina = request.CantidadRegistroPorPagina,
                Datos = programadoVm
            };
        }
    }
}
