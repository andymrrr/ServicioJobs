

using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Modelos
{
    public class Parametro
    {
        public Guid IdParametroa { get; set; }
        public Guid IdProgramado { get; set; }

        public string Propiedad { get; set; } = string.Empty;

        public string Valor { get; set; } = string.Empty;
        public TipoParametro Tipo { get; set; }

        public Programado? Programado { get; set; } 
       
    }
}
