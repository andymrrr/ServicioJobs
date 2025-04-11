
namespace ServicioJobs.Modelos
{
    public class Metodo
    {
        public Metodo()
        {
            Programados = new HashSet<Programado>();
        }
        public Guid IdMetodo { get; set; }
        public string Nombre { get; set; }
        public ICollection<Programado> Programados { get; set; }
    }
}
