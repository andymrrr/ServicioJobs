
using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Aplicacion.Feature.JobMetodo.Dtos
{
    public class MetodosDto
    {
        public Guid IdMetodo { get; set; }
        public string Nombre { get; set; }
        public MetodoHttp CodigoHttp { get; set; }
    }
}
