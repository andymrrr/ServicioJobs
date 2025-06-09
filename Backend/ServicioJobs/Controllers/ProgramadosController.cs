using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Aplicacion.Feature.Programados.Command.JobProgramados;
using ServicioJobs.Aplicacion.Feature.Programados.Command.EditarJobProgramado;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Feature.Programados.Query.BuscarProgramadosGuid;
using ServicioJobs.Aplicacion.Feature.Programados.Query.PaginacionProgramados;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
using ServicioJobs.Modelos.Utilitarios;
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
        [ProducesResponseType(typeof(RespuestaServicio<ProgramadoDto>), (int)(HttpStatusCode.OK))]
        public async Task<ActionResult<RespuestaServicio<ProgramadoDto>>> BuscarJobProgramado(Guid guid)
        {
            var consulta = new BuscarProgramadosGuidQuery { Guid = guid };
            var respuesta = await _mediador.Send(consulta);

            if (!respuesta.Completado)
            {
                return BadRequest(respuesta);
            }

            return Ok(respuesta);
        }

        [HttpPost("AgregarJobProgramado", Name = "AgregarJobProgramado")]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)(HttpStatusCode.OK))]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)(HttpStatusCode.BadRequest))]
        public async Task<ActionResult<RespuestaServicio<Unit>>> AgregarJobProgramado([FromBody] AgregarJobProgramadoComand comando)
        {
            var respuesta = await _mediador.Send(comando);

            if (!respuesta.Completado)
            {
                return BadRequest(respuesta);
            }

            return Ok(respuesta);
        }

        [HttpPut("EditarJobProgramado", Name = "EditarJobProgramado")]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)(HttpStatusCode.OK))]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)(HttpStatusCode.BadRequest))]
        public async Task<ActionResult<RespuestaServicio<Unit>>> EditarJobProgramado([FromBody] EditarJobProgramadoCommand comando)
        {
            var respuesta = await _mediador.Send(comando);

            if (!respuesta.Completado)
            {
                return BadRequest(respuesta);
            }

            return Ok(respuesta);
        }
    }
}
