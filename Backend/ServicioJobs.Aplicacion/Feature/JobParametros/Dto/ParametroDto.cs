

using ServicioJobs.Modelos.Enums;
using ServicioJobs.Modelos;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;

namespace ServicioJobs.Aplicacion.Feature.Parametros.Dto
{
    public class ParametroDto
    {
        public Guid IdParametroa { get; set; }
        public Guid IdProgramado { get; set; }

        public string Propiedad { get; set; } = string.Empty;

        public string Valor { get; set; } = string.Empty;
        public TipoParametro Tipo { get; set; }

    }
}
