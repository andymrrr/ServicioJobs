using ServicioJobs.Modelos.Enums;

namespace ServicioJobs.Modelos
{
    public class Programado
    {
        public Programado()
        {
            Parametros = new HashSet<Parametro>();
            Historicos = new HashSet<Historico>();
        }
        public Guid IdProgramado { get; set; }
        public Guid IdMetodo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Url { get; set; }
        public string Crontab { get; set; }
        public string CorreoNotificar { get; set; }
        public DateTime? FechaEjecucion { get; set; }
        public DateTime? FechaReintento { get; set; }
        public DateTime? UltimaEjecucion { get; set; }
        public int? Timeout { get; set; }
        public int EstadoEjecucion { get; set; }
        public bool? UltimaEjecucionExitosa { get; set; }
        public int? ReintentosPermitidos { get; set; }
        public int? PeriodoReintento { get; set; }
        public int? Reintentos { get; set; }
        public bool Habilitado { get; set; }   

        public Metodo Metodo { get; set; }
        public ICollection<Parametro> Parametros { get; set; }
        public virtual ICollection<Historico> Historicos { get; set; }

    }
}
