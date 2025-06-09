using MediatR;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.EjecutarJobProgramado
{
    public class EjecutarJobProgramadoCommand : IRequest<RespuestaServicio<string>>
    {
        public Guid IdProgramado { get; set; }
        public bool EjecutarInmediatamente { get; set; } = true;
        public DateTime? FechaEjecucionProgramada { get; set; }
    }
} 