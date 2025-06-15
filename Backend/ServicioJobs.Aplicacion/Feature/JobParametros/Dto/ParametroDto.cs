using ServicioJobs.Modelos.Enums;
namespace ServicioJobs.Aplicacion.Feature.Parametros.Dto
{
    public class ParametroDto
    {
       

        public string Propiedad { get; set; } = string.Empty;

        public string Valor { get; set; } = string.Empty;
        public TipoParametro Tipo { get; set; }

    }
}
