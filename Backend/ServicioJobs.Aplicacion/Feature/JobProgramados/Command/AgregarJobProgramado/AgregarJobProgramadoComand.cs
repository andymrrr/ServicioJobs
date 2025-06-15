using MediatR;
using ServicioJobs.Modelos.Enums;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.JobProgramados
{
    public class AgregarJobProgramadoComand : IRequest<RespuestaServicio<Unit>>
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Url { get; set; }
        public List<JobParametroItem> JobParametro { get; set; } = new();
        public string Crontab { get; set; }
        public string CorreoNotificar { get; set; }
        public int? ReintentosPermitidos { get; set; }
        public int? PeriodoReintento { get; set; }
        public int? Timeout { get; set; }
        public MetodoHttp MetodoHttp { get; set; }
    }

    public class JobParametroItem
    {
        public string Propiedad { get; set; } = string.Empty;
        public string Valor { get; set; } = string.Empty;
        public TipoParametro Tipo { get; set; }
    }
}
