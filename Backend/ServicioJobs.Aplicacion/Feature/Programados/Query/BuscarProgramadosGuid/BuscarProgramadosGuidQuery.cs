using MediatR;
using ServicioJobs.Aplicacion.Feature.Programados.Dtos;

namespace ServicioJobs.Aplicacion.Feature.Programados.Query.BuscarProgramadosGuid
{
    public class BuscarProgramadosGuidQuery : IRequest<ProgramadoDto>
    {
        public Guid Guid { get; set; }
    }
}
