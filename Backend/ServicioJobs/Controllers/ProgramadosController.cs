using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Aplicacion.Feature.Programados.Command.JobProgramados;
using ServicioJobs.Aplicacion.Feature.Programados.Command.EditarJobProgramado;
using ServicioJobs.Aplicacion.Feature.Programados.Command.EjecutarJobProgramado;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Feature.Programados.Query.BuscarProgramadosGuid;
using ServicioJobs.Aplicacion.Feature.Programados.Query.PaginacionProgramados;
using ServicioJobs.Dal.Core.Paginacion.Modelos;
using ServicioJobs.Modelos.Utilitarios;
using ServicioJobs.Extensions;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace ServicioJobs.Controllers
{
    [AllowAnonymous]
    [Route("api/v1/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProgramadosController : ControllerBase
    {
        private readonly IMediator _mediador;


        public ProgramadosController(IMediator mediador)
        {
            _mediador = mediador ?? throw new ArgumentNullException(nameof(mediador));
        }
     
        [HttpGet("paginacion")]
        [ProducesResponseType(typeof(PaginacionVm<ProgramadoPaginado>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<PaginacionVm<ProgramadoPaginado>>> ObtenerPaginacion([FromQuery] PaginacionProgramadosQuery consulta)
        {
            var paginacion = await _mediador.Send(consulta);
            return Ok(paginacion);
        }

        
        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(RespuestaServicio<ProgramadoDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<RespuestaServicio<ProgramadoDto>>> ObtenerJobPorId(Guid id)
        {
            var consulta = new BuscarProgramadosGuidQuery { Guid = id };
            var respuesta = await _mediador.Send(consulta);

            return this.ConvertirAResultadoAccion(respuesta);
        }

        [HttpPost("crearjob")]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.Created)]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Conflict)]
        public async Task<ActionResult<RespuestaServicio<Unit>>> CrearJobProgramado([FromBody] AgregarJobProgramadoComand comando)
        {
            var respuesta = await _mediador.Send(comando);

            return this.ConvertirAResultadoCreado(respuesta, nameof(ObtenerJobPorId), new { id = Guid.NewGuid() });
        }


        [HttpPut("{id:guid}")]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.Conflict)]
        public async Task<ActionResult<RespuestaServicio<Unit>>> ActualizarJobProgramado(Guid id, [FromBody] EditarJobProgramadoCommand comando)
        {
            comando.IdProgramado = id;
            var respuesta = await _mediador.Send(comando);

            return this.ConvertirAResultadoAccion(respuesta);
        }


        [HttpPost("{id:guid}/ejecutar")]
        [ProducesResponseType(typeof(RespuestaServicio<string>), (int)HttpStatusCode.Accepted)]
        [ProducesResponseType(typeof(RespuestaServicio<string>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<RespuestaServicio<string>>> EjecutarJobProgramado(Guid id, [FromBody] EjecutarJobProgramadoCommand comando)
        {
            comando.IdProgramado = id;
            var respuesta = await _mediador.Send(comando);

            return this.ConvertirAResultadoAceptado(respuesta);
        }
    }
}
