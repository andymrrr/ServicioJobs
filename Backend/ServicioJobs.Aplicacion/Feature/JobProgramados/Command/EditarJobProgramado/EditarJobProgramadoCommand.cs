using MediatR;
using ServicioJobs.Aplicacion.Feature.Parametros.Dto;
using ServicioJobs.Modelos.Enums;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.EditarJobProgramado
{
    public class EditarJobProgramadoCommand : IRequest<RespuestaServicio<Unit>>
    {
        public Guid IdProgramado { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Url { get; set; }
        public List<ParametroDto> JobParametro { get; set; } = new();
        public string Crontab { get; set; }
        public string CorreoNotificar { get; set; }
        public int? ReintentosPermitidos { get; set; }
        public int? PeriodoReintento { get; set; }
        public int? Timeout { get; set; }
        public MetodoHttp MetodoHttp { get; set; }
        public bool Habilitado { get; set; }
    }
} 