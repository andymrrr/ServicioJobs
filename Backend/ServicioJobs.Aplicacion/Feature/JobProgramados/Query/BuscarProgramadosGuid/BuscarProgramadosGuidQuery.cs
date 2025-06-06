using MediatR;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;
using ServicioJobs.Modelos.Utilitarios;

namespace ServicioJobs.Aplicacion.Feature.Programados.Query.BuscarProgramadosGuid
{
    public class BuscarProgramadosGuidQuery : IRequest<RespuestaServicio<ProgramadoDto>>
    {
        public Guid Guid { get; set; }
    }
}
