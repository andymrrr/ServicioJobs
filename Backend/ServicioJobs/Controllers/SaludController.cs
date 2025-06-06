using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicioJobs.Aplicacion.Feature.Salud.Query.VerificarEstado;

namespace ServicioJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaludController : ControllerBase
    {
        private IMediator _mediador;
        public SaludController(IMediator mediator)
        {
            _mediador = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> VerificarEstado()
        {
            var resultado = await _mediador.Send(new VerificarEstadoQuery());
            return resultado.Estado == "Saludable" ? Ok(resultado) : StatusCode(500, resultado);
        }
    }
}
