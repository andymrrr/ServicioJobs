using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Feature.Programados.Query.BuscarProgramadosGuid;
using ServicioJobs.Aplicacion.Feature.Programados.Query.PaginacionProgramados;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using System.Net;

namespace ServicioJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramadosController : ControllerBase
    {
        private readonly IMediator _mediador;
        public ProgramadosController(IMediator mediador)
        {
            _mediador = mediador;
        }
        [HttpGet("Paginacion", Name = "Paginacion")]
        [ProducesResponseType(typeof(PaginacionVm<ProgramadoPaginado>), (int)(HttpStatusCode.OK))]
        public async Task<ActionResult<PaginacionVm<ProgramadoPaginado>>> Paginacion([FromQuery] PaginacionProgramadosQuery consulta)
        {

            var paginacion = await _mediador.Send(consulta);
            return Ok(paginacion);
        }

        [HttpGet("BuscarJobProgramado{guid}", Name = "BuscarJobProgramado")]
        [ProducesResponseType(typeof(PaginacionVm<ProgramadoPaginado>), (int)(HttpStatusCode.OK))]
        public async Task<ActionResult<PaginacionVm<ProgramadoPaginado>>> BuscarJobProgramado(Guid guid)
        {
            var consulta = new BuscarProgramadosGuidQuery { Guid = guid };
            var respuesta = await _mediador.Send(consulta);

            if (!respuesta.Completado)
            {
                return BadRequest(respuesta);
            }

            return Ok(respuesta);
        }


    }
}
