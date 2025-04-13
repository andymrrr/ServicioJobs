

namespace ServicioJobs.Modelos.Dto
{
    public class ConcluirEjecucionRequest
    {
        public Guid JobGuid { get; set; }
        public Guid EjecucionGuid { get; set; }
        public int EstadoHttp { get; set; }
        public string MensajeError { get; set; }
        public DateTime FechaEjecucion { get; set; }
        public bool Success { get; set; }
    }
}
