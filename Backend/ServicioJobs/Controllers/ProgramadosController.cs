using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Aplicacion.Feature.Programados.Command.JobProgramados;
using ServicioJobs.Aplicacion.Feature.Programados.Command.EditarJobProgramado;
using ServicioJobs.Aplicacion.Feature.Programados.Command.EjecutarJobProgramado;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Aplicacion.Feature.Programados.Query.BuscarProgramadosGuid;
using ServicioJobs.Aplicacion.Feature.Programados.Query.PaginacionProgramados;
using ServicioJobs.Dal.Nucleo.Paginacion.Modelos;
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
        /// <summary>
        /// Obtiene una lista paginada de jobs programados
        /// </summary>
        /// <param name="consulta">Parámetros de paginación y filtros</param>
        /// <returns>Lista paginada de jobs programados</returns>
        [HttpGet("paginacion")]
        [ProducesResponseType(typeof(PaginacionVm<ProgramadoPaginado>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<PaginacionVm<ProgramadoPaginado>>> ObtenerPaginacion([FromQuery] PaginacionProgramadosQuery consulta)
        {
            var paginacion = await _mediador.Send(consulta);
            return Ok(paginacion);
        }

        /// <summary>
        /// Obtiene un job programado específico por su ID
        /// </summary>
        /// <param name="id">ID único del job programado</param>
        /// <returns>Información detallada del job programado</returns>
        /// <response code="200">Job programado encontrado exitosamente</response>
        /// <response code="400">Parámetros inválidos o job no encontrado</response>
        /// <response code="404">Job programado no encontrado</response>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(RespuestaServicio<ProgramadoDto>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<RespuestaServicio<ProgramadoDto>>> ObtenerJobPorId(Guid id)
        {
            var consulta = new BuscarProgramadosGuidQuery { Guid = id };
            var respuesta = await _mediador.Send(consulta);

            return this.ToActionResult(respuesta);
        }

        /// <summary>
        /// Crea un nuevo job programado
        /// </summary>
        /// <param name="comando">Datos del job programado a crear</param>
        /// <returns>Resultado de la operación de creación</returns>
        /// <response code="201">Job programado creado exitosamente</response>
        /// <response code="400">Datos inválidos o error en la validación</response>
        /// <response code="409">Ya existe un job con el mismo nombre</response>
        [HttpPost]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.Created)]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Conflict)]
        public async Task<ActionResult<RespuestaServicio<Unit>>> CrearJobProgramado([FromBody] AgregarJobProgramadoComand comando)
        {
            var respuesta = await _mediador.Send(comando);

            return this.ToCreatedResult(respuesta, nameof(ObtenerJobPorId), new { id = Guid.NewGuid() });
        }

        /// <summary>
        /// Actualiza un job programado existente
        /// </summary>
        /// <param name="id">ID del job programado a actualizar</param>
        /// <param name="comando">Datos actualizados del job programado</param>
        /// <returns>Resultado de la operación de actualización</returns>
        /// <response code="200">Job programado actualizado exitosamente</response>
        /// <response code="400">Datos inválidos o error en la validación</response>
        /// <response code="404">Job programado no encontrado</response>
        /// <response code="409">Ya existe otro job con el mismo nombre</response>
        [HttpPut("{id:guid}")]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(RespuestaServicio<Unit>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.Conflict)]
        public async Task<ActionResult<RespuestaServicio<Unit>>> ActualizarJobProgramado(Guid id, [FromBody] EditarJobProgramadoCommand comando)
        {
            comando.IdProgramado = id; 
            var respuesta = await _mediador.Send(comando);

            return this.ToActionResult(respuesta);
        }

        /// <summary>
        /// Ejecuta un job programado de forma inmediata o programa su ejecución
        /// </summary>
        /// <param name="id">ID del job programado a ejecutar</param>
        /// <param name="comando">Parámetros de ejecución del job</param>
        /// <returns>ID del job de Hangfire creado y estado de la operación</returns>
        /// <response code="202">Job encolado para ejecución exitosamente</response>
        /// <response code="400">Datos inválidos o job deshabilitado</response>
        /// <response code="404">Job programado no encontrado</response>
        [HttpPost("{id:guid}/ejecutar")]
        [ProducesResponseType(typeof(RespuestaServicio<string>), (int)HttpStatusCode.Accepted)]
        [ProducesResponseType(typeof(RespuestaServicio<string>), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<RespuestaServicio<string>>> EjecutarJobProgramado(Guid id, [FromBody] EjecutarJobProgramadoCommand comando)
        {
            comando.IdProgramado = id; 
            var respuesta = await _mediador.Send(comando);

            return this.ToAcceptedResult(respuesta);
        }
    }
}
