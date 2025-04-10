using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Aplicacion.Feature.Libros.Comando.InicializarLibros;
using ServicioJobs.Aplicacion.Feature.Libros.Consulta.BuscarLibroGuid;
using ServicioJobs.Aplicacion.Funcionalidad.Libros.Consulta.BuscarLibroPaginacion;
using ServicioJobs.Aplicacion.Funcionalidad.Libros.Vm;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using System.Net;

namespace ServicioJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(FiltroRegistroSolicitudes))]
    public class LibrosController : ControllerBase
    {
        private readonly IMediator _mediador;
        public LibrosController(IMediator mediador)
        {
            _mediador = mediador;
        }
        [HttpGet("BuscarLibro/{guid}", Name = "BuscarLibro")]
        [ProducesResponseType(typeof(LibroVm), (int)(HttpStatusCode.OK))]
        public async Task<ActionResult<LibroVm>> BuscarLibro(Guid? guid)
        {
            var consulta = new BuscarLibroGuidConsulta(guid);
            return await _mediador.Send(consulta);
        }

        [HttpGet("Paginacion", Name = "Paginacion")]
        [ProducesResponseType(typeof(PaginacionVm<LibroVm>), (int)(HttpStatusCode.OK))]
        public async Task<ActionResult<PaginacionVm<LibroVm>>> Paginacion([FromQuery] BuscarLibroPaginacionConsulta consulta)
        {

            var paginacion = await _mediador.Send(consulta);
            return Ok(paginacion);
        }

        [HttpGet("InicializarLibro", Name = "InicializarLibro")]
        [ProducesResponseType(typeof(bool), (int)(HttpStatusCode.OK))]
        public async Task<ActionResult<bool>> InicializarLibro()
        {
            var consulta = new InicializarLibrosComando();
            return await _mediador.Send(consulta);
        }



    }

}
