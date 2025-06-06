using ServicioJobs.Modelos.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicioJobs.Aplicacion.Feature.Programados.Dtos
{
    public class ProgramadoPaginado
    {
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
        public MetodoHttp MetodoHttp { get; set; }
    }
}
