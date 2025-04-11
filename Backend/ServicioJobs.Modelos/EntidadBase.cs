
namespace ServicioJobs.Modelos
{
    public class EntidadBase
    {
       

        public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;

        public required string UsuarioRegistra { get; set; }
        public string? UsuarioActualiza { get; set; } 
        public DateTime? FechaActualiza { get; set; }
    }
}
