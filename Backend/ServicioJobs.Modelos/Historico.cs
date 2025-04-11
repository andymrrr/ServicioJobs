

namespace ServicioJobs.Modelos
{
    public class Historico
    {        
        public Guid IdHistorico { get; set; }
        public Guid IdProgramado { get; set; }
        public int Estado { get; set; }
        public DateTime FechaEjecucion { get; set; }
        public DateTime? FechaEjecucionFin { get; set; }
        public int EstadoHttp { get; set; }
        public string? MensajeError { get; set; }

        public virtual Programado Programado { get; set; }
    }
}
