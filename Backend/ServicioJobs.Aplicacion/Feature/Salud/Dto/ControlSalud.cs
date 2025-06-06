
namespace ServicioJobs.Aplicacion.Feature.Salud.Dto
{
    public class ControlSalud
    {
        public string Estado { get; set; } = "No saludable";
        public string BaseDeDatos { get; set; } = "Desconectada";
        public DateTime FechaHora { get; set; } = DateTime.UtcNow;
    }
}
