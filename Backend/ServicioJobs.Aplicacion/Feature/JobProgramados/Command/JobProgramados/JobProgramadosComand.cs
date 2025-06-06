using ServicioJobs.Aplicacion.Feature.Parametros.Dto;
using ServicioJobs.Modelos.Enums;
using System.ComponentModel.DataAnnotations;

namespace ServicioJobs.Aplicacion.Feature.Programados.Command.JobProgramados
{
    internal class JobProgramadosComand
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public string Url { get; set; }
        public List<ParametroDto> JobParametro { get; set; }
        public string Crontab { get; set; }
        public string CorreoNotificar { get; set; }
        public int? ReintentosPermitidos { get; set; }
        public int? PeriodoReintento { get; set; }


    }
}
