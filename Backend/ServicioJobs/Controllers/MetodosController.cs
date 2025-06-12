using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Aplicacion.Feature.JobMetodo.Dtos;
using ServicioJobs.Aplicacion.Feature.JobMetodo.Query.PaginacionMetodos;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Feature.Programados.Query.PaginacionProgramados;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using System.Net;

namespace ServicioJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetodosController : ControllerBase
    {
        private IMediator _mediador;
        public MetodosController(IMediator mediator)
        {
            _mediador = mediator;
        }
        [HttpGet("paginacion")]
        [ProducesResponseType(typeof(PaginacionVm<MetodosDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<PaginacionVm<MetodosDto>>> ObtenerPaginacion([FromQuery] PaginacionMetodosQuery consulta)
        {
            var paginacion = await _mediador.Send(consulta);
            return Ok(paginacion);
        }
    }
}
